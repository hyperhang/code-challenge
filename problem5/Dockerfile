# Build stage
FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:16-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist


# Create directory for SQLite database
RUN mkdir -p /app/data
RUN npm install --only=production
EXPOSE 3000


CMD ["node", "dist/app.js"]