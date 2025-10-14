# JWT Authentication & Authorization Setup

This document describes the JWT authentication and role-based authorization system implemented in the NorthStar application.

## Features Implemented

### Backend (NestJS)
- ✅ JWT authentication with access and refresh tokens
- ✅ Role-based access control (RBAC) system
- ✅ Permission-based authorization
- ✅ Password hashing with bcrypt
- ✅ Token refresh mechanism
- ✅ Protected routes with guards and decorators
- ✅ User registration and login endpoints
- ✅ Role and permission management

### Frontend (React + Redux)
- ✅ Authentication state management with Redux
- ✅ Automatic token refresh
- ✅ Protected routes with role-based access
- ✅ Login and registration forms
- ✅ User profile management
- ✅ Logout functionality

## Database Schema

The system includes the following models:
- `User` - User accounts with authentication fields
- `Role` - User roles (admin, user, moderator)
- `Permission` - Granular permissions (resource:action format)
- `UserRole` - Many-to-many relationship between users and roles
- `RolePermission` - Many-to-many relationship between roles and permissions

## Default Roles and Permissions

### Roles
- **admin**: Full access to all features
- **user**: Basic access to read/create/update posts
- **moderator**: Can delete posts and moderate content

### Permissions
- `users:read`, `users:create`, `users:update`, `users:delete`
- `posts:read`, `posts:create`, `posts:update`, `posts:delete`
- `admin:access`, `admin:manage_roles`, `admin:manage_permissions`

## Setup Instructions

### Backend Setup

1. Install dependencies:
```bash
cd packages/backend
npm install
```

2. Set up environment variables:
```bash
# Create .env file in packages/backend/
DATABASE_URL="postgresql://username:password@localhost:5432/northstar"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRATION_TIME="15m"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
JWT_REFRESH_EXPIRATION_TIME="7d"
```

3. Generate Prisma client and run migrations:
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

4. Start the backend:
```bash
npm run dev
```

### Frontend Setup

1. Install dependencies:
```bash
cd packages/frontend
npm install
```

2. Set up environment variables:
```bash
# Create .env file in packages/frontend/
VITE_API_URL=http://localhost:3001
```

3. Start the frontend:
```bash
npm run dev
```

## Default Users

After running the seed script, you'll have these default users:

- **Admin**: admin@example.com / admin123
- **User 1**: alice@example.com / password123
- **User 2**: bob@example.com / password123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/profile` - Get user profile

### Roles & Permissions
- `POST /api/roles` - Create new role (admin only)
- `POST /api/roles/permissions` - Create new permission (admin only)
- `POST /api/roles/assign-role` - Assign role to user (admin only)
- `POST /api/roles/assign-permission` - Assign permission to role (admin only)

### Protected Endpoints
All posts endpoints now require authentication:
- `GET /api/posts` - Get all posts (requires posts:read permission)
- `POST /api/posts` - Create post (requires posts:create permission)
- `PATCH /api/posts/:id` - Update post (requires posts:update permission)
- `DELETE /api/posts/:id` - Delete post (requires posts:delete permission)

## Security Features

1. **JWT Tokens**: Short-lived access tokens (15 minutes) with longer-lived refresh tokens (7 days)
2. **Automatic Refresh**: Frontend automatically refreshes tokens when they expire
3. **Role-based Access**: Different access levels based on user roles
4. **Permission-based Authorization**: Granular permissions for specific actions
5. **Password Hashing**: Secure password storage with bcrypt
6. **Token Storage**: Secure token storage in localStorage with automatic cleanup

## Usage Examples

### Protecting Routes
```tsx
<ProtectedRoute requiredRoles={['admin']}>
  <AdminPanel />
</ProtectedRoute>
```

### Using Guards in Controllers
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'moderator')
@Permissions('posts:delete')
@Delete(':id')
async deletePost(@Param('id') id: string) {
  // Delete post logic
}
```

### Checking User Roles in Frontend
```tsx
const { user } = useSelector((state: RootState) => state.auth);
const isAdmin = user?.userRoles.some(ur => ur.role.name === 'admin');
```

## Best Practices Implemented

1. **Token Expiration**: Short-lived access tokens for security
2. **Refresh Token Rotation**: New refresh token issued on each refresh
3. **Automatic Logout**: Clear tokens and redirect on refresh failure
4. **Role Hierarchy**: Admin > Moderator > User
5. **Permission Granularity**: Resource:action format for fine-grained control
6. **Error Handling**: Proper error messages and fallbacks
7. **Type Safety**: Full TypeScript support throughout
