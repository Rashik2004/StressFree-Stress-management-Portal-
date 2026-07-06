FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

FROM base AS development

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]

FROM base AS build

ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.27-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1
