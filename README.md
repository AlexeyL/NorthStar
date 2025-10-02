# NorthStar Monorepo

A modern full-stack application built with NestJS backend and React frontend, designed for deployment on Render.

## 🏗️ Architecture

This monorepo contains two main packages:

- **Backend** (`packages/backend`): NestJS API with PostgreSQL and Prisma ORM
- **Frontend** (`packages/frontend`): React SPA with TypeScript, Mantine UI, and RTK Query

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL database (local, Docker, or remote)
- Docker and Docker Compose (optional, for local PostgreSQL)

### Local Development Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd NorthStar
   npm install
   ```

2. **Set up PostgreSQL:**
   
   **Option A: Using Docker (Recommended for local development)**
   ```bash
   # Start PostgreSQL in Docker
   npm run docker:db:up
   
   # Copy the pre-configured Docker environment
   cd packages/backend
   cp .env.local .env
   ```
   
   **Option B: Using existing PostgreSQL**
   ```bash
   cd packages/backend
   cp .env.example .env
   # Edit .env with your database connection string
   ```

3. **Set up the database:**
   ```bash
   # From the root directory
   npm run db:generate  # Generate Prisma client
   npm run db:push      # Push schema to database
   npm run db:seed      # Seed with sample data (optional)
   ```

4. **Start development servers:**
   ```bash
   # From the root directory
   npm run dev  # Starts both backend and frontend
   ```

   Or start them separately:
   ```bash
   npm run dev:backend   # Backend on http://localhost:3001
   npm run dev:frontend  # Frontend on http://localhost:5173
   ```

5. **Access the applications:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001/api
   - API Documentation: http://localhost:3001/api/docs

## 📦 Available Scripts

### Root Level Scripts

- `npm run dev` - Start both backend and frontend in development mode
- `npm run build` - Build both applications for production
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run lint` - Lint frontend code

### Docker Scripts (for local PostgreSQL)

- `npm run docker:db:up` - Start PostgreSQL container
- `npm run docker:db:down` - Stop PostgreSQL container  
- `npm run docker:setup` - Start PostgreSQL and setup database
- `npm run docker:pgadmin` - Start pgAdmin (database management UI)

### Backend Scripts

- `npm run dev --workspace=packages/backend` - Start backend in development
- `npm run build --workspace=packages/backend` - Build backend
- `npm run start:prod --workspace=packages/backend` - Start production backend

### Frontend Scripts

- `npm run dev --workspace=packages/frontend` - Start frontend in development
- `npm run build --workspace=packages/frontend` - Build frontend
- `npm run lint --workspace=packages/frontend` - Lint frontend code

## 🗄️ Database Setup

### Local Development with Docker

For local development without installing PostgreSQL:

1. **Start PostgreSQL container:**
   ```bash
   npm run docker:db:up
   ```

2. **Use the pre-configured environment:**
   ```bash
   cd packages/backend
   cp .env.local .env
   ```

3. **Setup database:**
   ```bash
   npm run db:generate && npm run db:push
   ```

See [docker-setup.md](./docker-setup.md) for detailed Docker setup instructions.

### Database Schema

The application includes a simple blog-like schema:

- **Users**: Store user information (email, name)
- **Posts**: Blog posts with title, content, published status, and author relationship

## 🌐 Deployment on Render

This project is configured for easy deployment on Render using the included `render.yaml` file.

### Automatic Deployment

1. **Connect your repository to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect the `render.yaml` file

2. **The blueprint will create:**
   - PostgreSQL database
   - Backend web service
   - Frontend static site

3. **Environment variables are automatically configured:**
   - Database connection string
   - CORS settings
   - Production environment

### Manual Deployment

If you prefer manual deployment:

#### Backend Deployment
1. Create a new Web Service on Render
2. Connect your repository
3. Set build command: `cd packages/backend && npm install && npm run build && npx prisma generate && npx prisma db push`
4. Set start command: `cd packages/backend && npm run start:prod`
5. Add environment variables:
   - `NODE_ENV=production`
   - `DATABASE_URL` (from your PostgreSQL service)
   - `CORS_ORIGIN` (your frontend URL)

#### Frontend Deployment
1. Create a new Static Site on Render
2. Connect your repository
3. Set build command: `cd packages/frontend && npm install && npm run build`
4. Set publish directory: `packages/frontend/dist`

#### Database Setup
1. Create a PostgreSQL service on Render
2. Note the connection string for your backend environment variables

## 🛠️ Technology Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database
- **Swagger** - API documentation
- **TypeScript** - Type safety

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Mantine** - Modern React components library
- **RTK Query** - Data fetching and caching
- **React Router** - Client-side routing

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Concurrently** - Run multiple commands

## 📁 Project Structure

```
NorthStar/
├── packages/
│   ├── backend/                 # NestJS API
│   │   ├── src/
│   │   │   ├── app.module.ts
│   │   │   ├── main.ts
│   │   │   ├── prisma/          # Prisma service
│   │   │   ├── users/           # Users module
│   │   │   └── posts/           # Posts module
│   │   ├── prisma/
│   │   │   ├── schema.prisma    # Database schema
│   │   │   └── seed.ts          # Database seeding
│   │   └── package.json
│   └── frontend/                # React SPA
│       ├── src/
│       │   ├── components/      # Reusable components
│       │   ├── pages/           # Page components
│       │   ├── store/           # Redux store
│       │   ├── api/             # RTK Query API
│       │   └── types/           # TypeScript types
│       └── package.json
├── render.yaml                  # Render deployment config
├── package.json                 # Root package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/northstar_db?schema=public"
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

#### Frontend
The frontend automatically proxies API requests to the backend during development via Vite configuration.

## 🧪 Development Tips

1. **Database Management:**
   - Use `npm run db:studio` to open Prisma Studio for database management
   - Run `npm run db:push` after schema changes during development
   - Use `npm run db:migrate` for production-ready migrations

2. **API Documentation:**
   - Swagger docs are available at `/api/docs` in development
   - All endpoints are documented with proper DTOs and responses

3. **Type Safety:**
   - Backend uses Prisma-generated types
   - Frontend uses shared TypeScript interfaces
   - RTK Query provides automatic type inference

4. **Hot Reload:**
   - Both backend and frontend support hot reload during development
   - Changes are reflected immediately without manual restarts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and type checks
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
