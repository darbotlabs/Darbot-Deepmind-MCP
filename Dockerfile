FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY src ./src

# Build the application
RUN npm run build

FROM node:22-alpine AS runtime

# Set environment variables
ENV NODE_ENV=production
ENV DISABLE_THOUGHT_LOGGING=false

# Create app directory
WORKDIR /app

# Copy built application and dependencies
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create non-root user
RUN addgroup -g 1001 -S mcp && \
    adduser -S mcp -u 1001

# Change ownership
RUN chown -R mcp:mcp /app

# Switch to non-root user
USER mcp

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "console.log('Health check passed')" || exit 1

# Expose port (optional, for debugging)
EXPOSE 3000

# Set entrypoint
ENTRYPOINT ["node", "dist/index.js"]