# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev                    # Start both frontend and backend
npm run docker:db:up           # Start PostgreSQL + pgAdmin via Docker
```

### Backend (packages/backend)
```bash
npm run db:migrate             # Run Prisma migrations
npm run db:push                # Push schema changes without migration
npm run db:seed                # Seed database with default users/roles
npm run db:studio              # Open Prisma Studio (localhost:5555)
npm run db:generate            # Regenerate Prisma client
npm run build -w packages/backend
npm run test -w packages/backend
npm run test:e2e -w packages/backend
```

### Frontend (packages/frontend)
```bash
npm run build -w packages/frontend
npm run lint -w packages/frontend
```

### Initial Setup
```bash
npm install
cd packages/backend && cp .env.local .env  # Use Docker PostgreSQL config
npm run db:generate && npm run db:push && npm run db:seed
```

## Architecture

### Monorepo
- `packages/backend` — NestJS 10, Prisma 5, PostgreSQL, JWT auth
- `packages/frontend` — React 19, Vite 7, Redux Toolkit, RTK Query, Mantine 8

### Backend
NestJS modules: **AuthModule**, **UsersModule**, **PostsModule**, **RolesModule**, **PrismaModule** (global).

- API prefix: `/api`, Swagger at `/api/docs` (non-production)
- JWT access + refresh token pattern. Refresh token stored hashed in DB.
- RBAC via `@Roles()` and `@Permissions()` decorators, enforced by `RolesGuard`.
- Permission format: `{resource}:{action}` (e.g. `posts:delete`).
- `AuthService.validateUser()` loads user with all roles and permissions on each login.

### Frontend
Feature-based structure under `src/features/`. Path aliases: `@features`, `@pages`, `@api`, `@store`, `@utils`, `@assets`, `@constants`.

- **Global state**: Redux slice at `src/features/auth/slices/authSlice.ts` — stores user, tokens (also persisted to localStorage).
- **Server state**: RTK Query via `src/api/apiSlice.ts`. Custom `appBaseQuery` at `src/api/appBaseQuery.ts` handles automatic token refresh on 401, then retries the original request.
- **Routing**: `src/features/routes/` — `ProtectedRoute` checks `isPublic`, `requiredRoles`, and `requiredPermissions` before rendering; redirects to `/unauthorized` otherwise.
- **Auth tokens**: Managed by `src/features/auth/services/auth.service.ts` (localStorage read/write) and `authSlice` (Redux state).
- Vite dev server proxies `/api` → `http://localhost:3001`.

### Database (Prisma)
Models: `User`, `Post`, `Role`, `Permission`, `UserRole`, `RolePermission`.
Default seed users: `admin@example.com / admin123`, `alice@example.com / password123`, `bob@example.com / password123`.

## Code Style
- Prettier: tabs, single quotes, printWidth 140
- Frontend ESLint: max 0 warnings
