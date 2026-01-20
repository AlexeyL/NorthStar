# Docker PostgreSQL Setup for Local Development

This guide shows you how to run PostgreSQL locally using Docker instead of installing it directly on your machine.

## Prerequisites

- Docker and Docker Compose installed on your machine
- Node.js 18+ and npm 9+

## Quick Start with Docker

### 1. Start PostgreSQL with Docker

```bash
# Start only the PostgreSQL database
npm run docker:db:up

# Or start both PostgreSQL and pgAdmin (optional database management UI)
npm run docker:setup
```

### 2. Set up your environment

```bash
# Copy the local Docker environment file
cd packages/backend
cp .env.local .env
```

The `.env.local` file is already configured with the correct Docker PostgreSQL connection:

```env
DATABASE_URL="postgresql://northstar_user:northstar_password@localhost:5432/northstar_db?schema=public"
```

### 3. Initialize the database

```bash
# From the root directory
npm run db:generate  # Generate Prisma client
npm run db:push      # Create database tables
```

### 4. Start the application

```bash
npm run dev  # Starts both backend and frontend
```

## Docker Commands

| Command                  | Description                         |
| ------------------------ | ----------------------------------- |
| `npm run docker:db:up`   | Start PostgreSQL container          |
| `npm run docker:db:down` | Stop and remove containers          |
| `npm run docker:db:logs` | View PostgreSQL logs                |
| `npm run docker:pgadmin` | Start pgAdmin (database UI)         |
| `npm run docker:setup`   | Start everything and setup database |

## Database Management

### Using Prisma Studio (Recommended)

```bash
npm run db:studio
```

Opens at: http://localhost:5555

### Using pgAdmin (Optional)

If you started pgAdmin with `npm run docker:pgadmin`:

- URL: http://localhost:5050
- Email: admin@northstar.local
- Password: admin123

To connect to the database in pgAdmin:

- Host: postgres (or localhost if connecting from outside Docker)
- Port: 5432
- Database: northstar_db
- Username: northstar_user
- Password: northstar_password

## Database Configuration

The Docker setup creates:

- **Database**: northstar_db
- **User**: northstar_user
- **Password**: northstar_password
- **Port**: 5432 (mapped to your local machine)

## Troubleshooting

### Port 5432 already in use

If you have PostgreSQL installed locally, stop it first:

```bash
# macOS with Homebrew
brew services stop postgresql

# Or change the port in docker-compose.yml
ports:
  - "5433:5432"  # Use port 5433 instead
```

### Database connection issues

1. Make sure Docker containers are running:

    ```bash
    docker-compose ps
    ```

2. Check container logs:

    ```bash
    npm run docker:db:logs
    ```

3. Verify your `.env` file has the correct DATABASE_URL

### Reset database

```bash
npm run docker:db:down  # Stop containers
docker volume rm northstar_postgres_data  # Remove data
npm run docker:setup  # Start fresh
```

## Production vs Development

- **Development**: Uses Docker PostgreSQL (this setup)
- **Production**: Uses Render's managed PostgreSQL service
- The same Prisma schema works for both environments
