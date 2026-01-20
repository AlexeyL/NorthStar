import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
	console.log('Starting database seed...');

	// Create default roles
	const roles = [
		{ name: 'admin', description: 'Administrator with full access' },
		{ name: 'user', description: 'Regular user with basic access' },
		{ name: 'moderator', description: 'Moderator with content management access' },
	];

	for (const role of roles) {
		await prisma.role.upsert({
			where: { name: role.name },
			update: {},
			create: role,
		});
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
		await prisma.permission.upsert({
			where: { name: permission.name },
			update: {},
			create: permission,
		});
	}

	// Get roles and permissions for assignment
	const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
	const userRole = await prisma.role.findUnique({ where: { name: 'user' } });
	const moderatorRole = await prisma.role.findUnique({ where: { name: 'moderator' } });

	const allPermissions = await prisma.permission.findMany();
	const userPermissions = await prisma.permission.findMany({
		where: {
			name: {
				in: ['users:read', 'posts:read', 'posts:create', 'posts:update'],
			},
		},
	});
	const moderatorPermissions = await prisma.permission.findMany({
		where: {
			name: {
				in: ['users:read', 'posts:read', 'posts:create', 'posts:update', 'posts:delete'],
			},
		},
	});

	// Assign permissions to roles
	if (adminRole && allPermissions.length > 0) {
		for (const permission of allPermissions) {
			await prisma.rolePermission.upsert({
				where: {
					roleId_permissionId: {
						roleId: adminRole.id,
						permissionId: permission.id,
					},
				},
				update: {},
				create: {
					roleId: adminRole.id,
					permissionId: permission.id,
				},
			});
		}
	}

	if (userRole && userPermissions.length > 0) {
		for (const permission of userPermissions) {
			await prisma.rolePermission.upsert({
				where: {
					roleId_permissionId: {
						roleId: userRole.id,
						permissionId: permission.id,
					},
				},
				update: {},
				create: {
					roleId: userRole.id,
					permissionId: permission.id,
				},
			});
		}
	}

	if (moderatorRole && moderatorPermissions.length > 0) {
		for (const permission of moderatorPermissions) {
			await prisma.rolePermission.upsert({
				where: {
					roleId_permissionId: {
						roleId: moderatorRole.id,
						permissionId: permission.id,
					},
				},
				update: {},
				create: {
					roleId: moderatorRole.id,
					permissionId: permission.id,
				},
			});
		}
	}

	// Create default admin user
	const hashedPassword = await bcrypt.hash('admin123', 12);
	const adminUser = await prisma.user.upsert({
		where: { email: 'admin@example.com' },
		update: {},
		create: {
			email: 'admin@example.com',
			name: 'Admin User',
			password: hashedPassword,
		},
	});

	// Assign admin role to admin user
	if (adminRole) {
		await prisma.userRole.upsert({
			where: {
				userId_roleId: {
					userId: adminUser.id,
					roleId: adminRole.id,
				},
			},
			update: {},
			create: {
				userId: adminUser.id,
				roleId: adminRole.id,
			},
		});
	}

	// Create sample users with passwords
	const user1Password = await bcrypt.hash('password123', 12);
	const user1 = await prisma.user.upsert({
		where: { email: 'alice@example.com' },
		update: {},
		create: {
			email: 'alice@example.com',
			name: 'Alice Johnson',
			password: user1Password,
			posts: {
				create: [
					{
						title: 'Getting Started with NestJS',
						content: 'NestJS is a progressive Node.js framework for building efficient and scalable server-side applications.',
						published: true,
					},
					{
						title: 'Understanding Prisma ORM',
						content: 'Prisma is a next-generation ORM that helps developers build faster and make fewer errors.',
						published: false,
					},
				],
			},
		},
	});

	const user2Password = await bcrypt.hash('password123', 12);
	const user2 = await prisma.user.upsert({
		where: { email: 'bob@example.com' },
		update: {},
		create: {
			email: 'bob@example.com',
			name: 'Bob Smith',
			password: user2Password,
			posts: {
				create: [
					{
						title: 'React Best Practices',
						content: 'Learn the best practices for building React applications.',
						published: true,
					},
				],
			},
		},
	});

	// Assign user role to sample users
	if (userRole) {
		await prisma.userRole.upsert({
			where: {
				userId_roleId: {
					userId: user1.id,
					roleId: userRole.id,
				},
			},
			update: {},
			create: {
				userId: user1.id,
				roleId: userRole.id,
			},
		});

		await prisma.userRole.upsert({
			where: {
				userId_roleId: {
					userId: user2.id,
					roleId: userRole.id,
				},
			},
			update: {},
			create: {
				userId: user2.id,
				roleId: userRole.id,
			},
		});
	}

	console.log('Database seed completed successfully!');
	console.log('Admin user created: admin@example.com / admin123');
	console.log('Sample users created: alice@example.com / password123, bob@example.com / password123');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
