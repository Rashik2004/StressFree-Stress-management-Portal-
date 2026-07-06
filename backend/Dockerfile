FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

FROM base AS development

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]

FROM base AS production

ENV NODE_ENV=production

RUN npm ci --omit=dev \
  && npm cache clean --force

COPY . .

RUN addgroup -S nodeapp \
  && adduser -S nodeapp -G nodeapp \
  && chown -R nodeapp:nodeapp /app

USER nodeapp

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:5000/health').then((res) => process.exit(res.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "server.js"]
