FROM node:22-slim AS base

FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# ENV LD_LIBRARY_PATH=/lib:/usr/glibc-compat/lib
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

ARG TARGETARCH

RUN echo "Building for architecture: $TARGETARCH" && \
    if [ "$TARGETARCH" = "amd64" ]; then \
    npm install @tailwindcss/oxide-linux-x64-gnu lightningcss-linux-x64-gnu; \
    elif [ "$TARGETARCH" = "arm64" ] || [ "$TARGETARCH" = "arm" ]; then \
    npm install @tailwindcss/oxide-linux-arm64-gnu; \
    else \
    echo "Unsupported architecture: $TARGETARCH"; exit 1; \
    fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
