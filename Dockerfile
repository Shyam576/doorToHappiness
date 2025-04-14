# client/Dockerfile

# ---- Base Stage ----
    FROM node:18-alpine AS base
    WORKDIR /app
    RUN npm install -g pnpm
    
    # ---- Dependencies Stage ----
    FROM base AS deps
    WORKDIR /app
    # Copy package manager files FROM THE CONTEXT ROOT (client dir)
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --frozen-lockfile --prod=false
    
    # ---- Development Stage ----
    FROM deps AS dev
    WORKDIR /app
    COPY --from=deps /app/node_modules ./node_modules
    # Copy all source code FROM THE CONTEXT ROOT (client dir)
    COPY . ./
    EXPOSE 3000
    CMD ["pnpm", "dev"]
    
    # ---- Builder Stage ----
    FROM deps AS builder
    WORKDIR /app
    COPY --from=deps /app/node_modules ./node_modules
    # Copy all source code FROM THE CONTEXT ROOT (client dir)
    COPY . ./
    # ARG NEXT_PUBLIC_API_URL
    # ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
    RUN pnpm build
    
    # ---- Runner Stage (Production) ----
    FROM base AS runner
    WORKDIR /app
    ENV NODE_ENV production
    # USER node
    # Copy necessary files FROM THE CONTEXT ROOT (client dir)
    COPY package.json ./package.json
    COPY pnpm-lock.yaml ./pnpm-lock.yaml
    RUN pnpm install --frozen-lockfile --prod=true
    # Copy build artifacts
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/next.config.js ./next.config.js 
    
    EXPOSE 3000
    CMD ["pnpm", "start"]
    
    # ---- Standalone Runner Alternative ----
    # FROM node:18-alpine AS runner-standalone
    # WORKDIR /app
    # ENV NODE_ENV=production
    # USER node
    # COPY --from=builder /app/.next/standalone ./
    # COPY --from=builder /app/.next/static ./.next/static
    # COPY --from=builder /app/public ./public
    # EXPOSE 3000
    # CMD ["node", "server.js"]