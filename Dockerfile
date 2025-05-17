# Dockerfile for yt-chat fullstack app

# --- Backend build ---
FROM node:20-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend ./

# --- Frontend build ---
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --production
COPY frontend ./
RUN npm run build

# --- Production image ---
FROM node:20-alpine
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/backend /app/backend

# Copy frontend build
COPY --from=frontend-build /app/frontend/build /app/frontend/build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose backend port
EXPOSE 8080

# Healthcheck endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

# Start backend (serves API and static frontend)
CMD ["node", "backend/server.js"]