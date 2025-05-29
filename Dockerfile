# Use Node.js 22 LTS as base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy TypeScript configuration and source code
COPY tsconfig.json ./
COPY src/ ./src/
COPY migrations/ ./migrations/
COPY migrations.json ./

# Install dev dependencies for building
RUN npm ci

# Build the TypeScript application
RUN npx tsc

# Remove dev dependencies to reduce image size
RUN npm ci --only=production && npm cache clean --force

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S mentoring -u 1001

# Change ownership of the app directory
RUN chown -R mentoring:nodejs /app
USER mentoring

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["node", "build/index.js"] 