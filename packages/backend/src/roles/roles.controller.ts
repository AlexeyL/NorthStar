import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Permissions } from '../auth/decorators/permissions.decorator';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { AssignPermissionDto } from './dto/assign-permission.dto';

@ApiTags('roles')
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles('admin')
  @Permissions('admin:manage_roles')
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: 201, description: 'Role created successfully' })
  @ApiResponse({ status: 409, description: 'Role already exists' })
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto.name, createRoleDto.description);
  }

  @Post('permissions')
  @Roles('admin')
  @Permissions('admin:manage_permissions')
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiResponse({ status: 201, description: 'Permission created successfully' })
  @ApiResponse({ status: 409, description: 'Permission already exists' })
  async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.rolesService.createPermission(
      createPermissionDto.name,
      createPermissionDto.resource,
      createPermissionDto.action,
      createPermissionDto.description,
    );
  }

  @Post('assign-role')
  @Roles('admin')
  @Permissions('admin:manage_roles')
  @ApiOperation({ summary: 'Assign role to user' })
  @ApiResponse({ status: 201, description: 'Role assigned successfully' })
  @ApiResponse({ status: 404, description: 'User or role not found' })
  @ApiResponse({ status: 409, description: 'User already has this role' })
  async assignRoleToUser(@Body() assignRoleDto: AssignRoleDto) {
    return this.rolesService.assignRoleToUser(assignRoleDto.userId, assignRoleDto.roleName);
  }

  @Delete('assign-role')
  @Roles('admin')
  @Permissions('admin:manage_roles')
  @ApiOperation({ summary: 'Remove role from user' })
  @ApiResponse({ status: 200, description: 'Role removed successfully' })
  @ApiResponse({ status: 404, description: 'User or role not found' })
  async removeRoleFromUser(@Body() assignRoleDto: AssignRoleDto) {
    return this.rolesService.removeRoleFromUser(assignRoleDto.userId, assignRoleDto.roleName);
  }

  @Post('assign-permission')
  @Roles('admin')
  @Permissions('admin:manage_permissions')
  @ApiOperation({ summary: 'Assign permission to role' })
  @ApiResponse({ status: 201, description: 'Permission assigned successfully' })
  @ApiResponse({ status: 404, description: 'Role or permission not found' })
  @ApiResponse({ status: 409, description: 'Role already has this permission' })
  async assignPermissionToRole(@Body() assignPermissionDto: AssignPermissionDto) {
    return this.rolesService.assignPermissionToRole(assignPermissionDto.roleName, assignPermissionDto.permissionName);
  }

  @Delete('assign-permission')
  @Roles('admin')
  @Permissions('admin:manage_permissions')
  @ApiOperation({ summary: 'Remove permission from role' })
  @ApiResponse({ status: 200, description: 'Permission removed successfully' })
  @ApiResponse({ status: 404, description: 'Role or permission not found' })
  async removePermissionFromRole(@Body() assignPermissionDto: AssignPermissionDto) {
    return this.rolesService.removePermissionFromRole(assignPermissionDto.roleName, assignPermissionDto.permissionName);
  }

  @Get('user/:userId')
  @Roles('admin')
  @Permissions('users:read')
  @ApiOperation({ summary: 'Get user roles and permissions' })
  @ApiResponse({ status: 200, description: 'User roles retrieved successfully' })
  async getUserRoles(@Param('userId') userId: string) {
    return this.rolesService.getUserRoles(userId);
  }

  @Get('user/:userId/permissions')
  @Roles('admin')
  @Permissions('users:read')
  @ApiOperation({ summary: 'Get user permissions' })
  @ApiResponse({ status: 200, description: 'User permissions retrieved successfully' })
  async getUserPermissions(@Param('userId') userId: string) {
    return this.rolesService.getUserPermissions(userId);
  }

  @Post('initialize')
  @Roles('admin')
  @Permissions('admin:access')
  @ApiOperation({ summary: 'Initialize default roles and permissions' })
  @ApiResponse({ status: 201, description: 'Default roles and permissions initialized' })
  async initializeDefaultRolesAndPermissions() {
    return this.rolesService.initializeDefaultRolesAndPermissions();
  }
}
