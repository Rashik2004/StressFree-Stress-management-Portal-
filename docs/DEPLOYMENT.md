# Deployment Guide

This project supports two Docker flows:

- Local development with hot reload: `docker-compose.yml`
- Production-style deployment: `docker-compose.prod.yml`

## Required Tools

- Docker and Docker Compose v2
- Node.js 20+ for local non-Docker checks
- Jenkins, if you want automated deployment

## Environment Setup

Create local environment files from the examples:

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

Update the secrets before deploying:

```env
MONGO_USERNAME=replace_with_mongodb_username
MONGO_PASSWORD=replace_with_strong_mongodb_password
JWT_SECRET=replace_with_a_long_random_secret
```

Never commit real `.env` files. They are intentionally ignored by Git.

## Local Development

Run the full stack with live reload:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- Backend health: `http://localhost:5000/health`
- MongoDB: `localhost:27017`

Stop the stack:

```bash
docker compose down
```

## Production-Style Docker Deployment

Build and start the production stack:

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

The production frontend is built with Vite and served by Nginx. Nginx proxies `/api` requests to the backend container, so the frontend can use:

```env
VITE_API_URL=/api
```

Default production URL:

```text
http://localhost
```

Production health URL:

```text
http://localhost/health
```

Use another host port by setting:

```env
FRONTEND_PORT=8080
```

Then redeploy:

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

## Health Checks

Backend:

```bash
curl http://localhost:5000/health
```

Production through Nginx:

```bash
curl http://localhost/health
```

Production container status:

```bash
docker compose -f docker-compose.prod.yml ps
```

Recent logs:

```bash
docker compose -f docker-compose.prod.yml logs --tail=100
```

## Jenkins Pipeline

The `Jenkinsfile` performs:

1. Checkout
2. Backend dependency install with `npm ci`
3. Frontend dependency install
4. Frontend lint as a non-blocking quality signal
5. Frontend production build as a required gate
6. Production Compose config validation
7. Production Docker image build
8. Deployment on `main` or `master`
9. Backend health verification

Before running the Jenkins job, create a `.env` file on the deployment machine or inject these values through Jenkins credentials:

```env
MONGO_DB_NAME=stress-management-portal
MONGO_USERNAME=your_database_user
MONGO_PASSWORD=your_database_password
JWT_SECRET=your_long_random_jwt_secret
VITE_API_URL=/api
FRONTEND_PORT=80
```

The Jenkins agent must have permission to run Docker commands.

## Production Notes

- Do not expose MongoDB publicly in production.
- Rotate any credentials that were previously committed.
- Put the app behind HTTPS for public access.
- Use MongoDB Atlas or a managed MongoDB instance for serious production use.
- Add image registry push/pull later if deployment happens on a different server from Jenkins.
