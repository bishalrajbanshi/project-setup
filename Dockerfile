# BASE IMAGE
FROM node:20-alpine AS base



# Install pnpm
RUN npm install -g pnpm


WORKDIR /app


# FORM DEPENDENCY LAYER
FROM base AS deps


COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile



# ---------- Build Layer ----------
FROM base AS builder


COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV DATABASE_URL="postgresql://hp:root@db:5432/test"

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN pnpm run build

EXPOSE 6060

CMD ["node", "dist/server.js"]