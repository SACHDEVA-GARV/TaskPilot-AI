# ================================
# Stage 1: Dependencies
# ================================
FROM node:18-alpine AS dependencies

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev && \
    npm cache clean --force

# ================================
# Stage 2: Production
# ================================
FROM node:18-alpine AS production

# Add metadata
LABEL maintainer="your-email@example.com"
LABEL description="Todo Backend API - Production Build"

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

WORKDIR /app

# Copy dependencies from stage 1
COPY --from=dependencies --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copy application source
COPY --chown=nodejs:nodejs . .

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3001

# Set environment
ENV NODE_ENV=production

# Start command
CMD ["node", "app.js"]