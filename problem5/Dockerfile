# Build stage
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
# Copy package files and install production dependencies
COPY --from=builder /app/package*.json ./
# Copy config files needed at runtime
COPY --from=builder /app/ormconfig.json ./
# Copy compiled JavaScript
COPY --from=builder /app/dist ./dist

# Create directory for SQLite database
RUN mkdir -p /app/data
# Use newer npm syntax for production dependencies
RUN npm install --omit=dev

# Expose API port
EXPOSE 3000

# Set NODE_ENV
ENV NODE_ENV=production

# Run the application
CMD ["node", "dist/app.js"]