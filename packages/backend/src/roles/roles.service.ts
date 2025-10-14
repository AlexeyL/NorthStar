import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async createRole(name: string, description?: string) {
    try {
      return await this.prisma.role.create({
        data: {
          name,
          description,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Role with this name already exists');
      }
      throw error;
    }
  }

  async createPermission(name: string, resource: string, action: string, description?: string) {
    try {
      return await this.prisma.permission.create({
        data: {
          name,
          resource,
          action,
          description,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Permission with this name already exists');
      }
      throw error;
    }
  }

  async assignRoleToUser(userId: string, roleName: string) {
    const role = await this.prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      throw new NotFoundException(`Role '${roleName}' not found`);
    }

    try {
      return await this.prisma.userRole.create({
        data: {
          userId,
          roleId: role.id,
        },
        include: {
          role: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User already has this role');
      }
      throw error;
    }
  }

  async removeRoleFromUser(userId: string, roleName: string) {
    const role = await this.prisma.role.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      throw new NotFoundException(`Role '${roleName}' not found`);
    }

    return await this.prisma.userRole.deleteMany({
      where: {
        userId,
        roleId: role.id,
      },
    });
  }

  async assignPermissionToRole(roleName: string, permissionName: string) {
    const [role, permission] = await Promise.all([
      this.prisma.role.findUnique({ where: { name: roleName } }),
      this.prisma.permission.findUnique({ where: { name: permissionName } }),
    ]);

    if (!role) {
      throw new NotFoundException(`Role '${roleName}' not found`);
    }
    if (!permission) {
      throw new NotFoundException(`Permission '${permissionName}' not found`);
    }

    try {
      return await this.prisma.rolePermission.create({
        data: {
          roleId: role.id,
          permissionId: permission.id,
        },
        include: {
          role: true,
          permission: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Role already has this permission');
      }
      throw error;
    }
  }

  async removePermissionFromRole(roleName: string, permissionName: string) {
    const [role, permission] = await Promise.all([
      this.prisma.role.findUnique({ where: { name: roleName } }),
      this.prisma.permission.findUnique({ where: { name: permissionName } }),
    ]);

    if (!role) {
      throw new NotFoundException(`Role '${roleName}' not found`);
    }
    if (!permission) {
      throw new NotFoundException(`Permission '${permissionName}' not found`);
    }

    return await this.prisma.rolePermission.deleteMany({
      where: {
        roleId: role.id,
        permissionId: permission.id,
      },
    });
  }

  async getUserRoles(userId: string) {
    return await this.prisma.userRole.findMany({
      where: { userId },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    const userRoles = await this.getUserRoles(userId);
    const permissions = new Set<string>();

    userRoles.forEach((userRole) => {
      userRole.role.rolePermissions.forEach((rolePermission) => {
        permissions.add(`${rolePermission.permission.resource}:${rolePermission.permission.action}`);
      });
    });

    return Array.from(permissions);
  }

  async hasPermission(userId: string, resource: string, action: string): Promise<boolean> {
    const permissions = await this.getUserPermissions(userId);
    return permissions.includes(`${resource}:${action}`);
  }

  async hasRole(userId: string, roleName: string): Promise<boolean> {
    const userRole = await this.prisma.userRole.findFirst({
      where: {
        userId,
        role: {
          name: roleName,
        },
      },
    });
    return !!userRole;
  }

  async initializeDefaultRolesAndPermissions() {
    // Create default roles
    const roles = [
      { name: 'admin', description: 'Administrator with full access' },
      { name: 'user', description: 'Regular user with basic access' },
      { name: 'moderator', description: 'Moderator with content management access' },
    ];

    for (const role of roles) {
      try {
        await this.createRole(role.name, role.description);
      } catch (error) {
        // Role already exists, continue
      }
    }

    // Create default permissions
    const permissions = [
      // User permissions
      { name: 'users:read', resource: 'users', action: 'read', description: 'Read user information' },
      { name: 'users:update', resource: 'users', action: 'update', description: 'Update user information' },
      { name: 'users:delete', resource: 'users', action: 'delete', description: 'Delete users' },
      { name: 'users:create', resource: 'users', action: 'create', description: 'Create new users' },
      
      // Post permissions
      { name: 'posts:read', resource: 'posts', action: 'read', description: 'Read posts' },
      { name: 'posts:create', resource: 'posts', action: 'create', description: 'Create posts' },
      { name: 'posts:update', resource: 'posts', action: 'update', description: 'Update posts' },
      { name: 'posts:delete', resource: 'posts', action: 'delete', description: 'Delete posts' },
      
      // Admin permissions
      { name: 'admin:access', resource: 'admin', action: 'access', description: 'Access admin panel' },
      { name: 'admin:manage_roles', resource: 'admin', action: 'manage_roles', description: 'Manage user roles' },
      { name: 'admin:manage_permissions', resource: 'admin', action: 'manage_permissions', description: 'Manage permissions' },
    ];

    for (const permission of permissions) {
      try {
        await this.createPermission(permission.name, permission.resource, permission.action, permission.description);
      } catch (error) {
        // Permission already exists, continue
      }
    }

    // Assign permissions to roles
    const rolePermissions = [
      // User role permissions
      { role: 'user', permissions: ['users:read', 'posts:read', 'posts:create', 'posts:update'] },
      
      // Moderator role permissions
      { role: 'moderator', permissions: ['users:read', 'posts:read', 'posts:create', 'posts:update', 'posts:delete'] },
      
      // Admin role permissions (all permissions)
      { role: 'admin', permissions: permissions.map(p => p.name) },
    ];

    for (const rolePermission of rolePermissions) {
      for (const permissionName of rolePermission.permissions) {
        try {
          await this.assignPermissionToRole(rolePermission.role, permissionName);
        } catch (error) {
          // Permission already assigned, continue
        }
      }
    }
  }
}
