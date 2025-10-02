# Backend Dockerfile for alternative deployment
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/backend/package*.json ./packages/backend/

# Install dependencies
RUN npm ci --only=production

# Copy backend source
COPY packages/backend ./packages/backend

# Generate Prisma client
WORKDIR /app/packages/backend
RUN npx prisma generate

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start:prod"]
