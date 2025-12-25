# Stress Management Portal - Backend ⚙️

The robust API server powering the Stress Management Portal. Handles data persistence, authentication, AI logic, and business rules.

## 🔧 Features

- **RESTful API**: Structured endpoints for resources.
- **JWT Authentication**: Secure stateless authentication using JSON Web Tokens.
- **AI Logic Controller**:
  - Rule-based chat engine (`aiController.js`).
  - Stress assessment scoring & archetype generation.
- **Database**: MongoDB with Mongoose schemas for data modeling.
- **Seeder**: Script to populate the database with initial meditation content.

## 🚀 Getting Started

### 1. Installation

Navigate to the backend directory:

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in this directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### 3. Data Seeding

**Crucial Step**: Before running the app, populate the database with categories and meditations.

```bash
node seeder.js
```

_Note: This will clear existing content collections and re-import defaults._

### 4. Running Locally

```bash
npm run dev
```

Server runs on `http://localhost:5000`.

## 📂 Key Directories

- **`controllers/`**: Logic for handling requests.
  - `aiController.js`: Chatbot and Assessment logic.
  - `dashboardController.js`: Analytics and Scheduling.
  - `meditationController.js`: Content serving.
- **`models/`**: Mongoose Schemas.
  - `User.js`: Stores profile, schedule, and assessment history.
  - `MeditationSession.js`: Content metadata.
- **`middleware/`**:
  - `authMiddleware.js`: Protects routes requiring login.
- **`routes/`**: Route definitions mapped to controllers.

## 🔗 API Endpoints

### Authentication

- `POST /api/auth/register`
- `POST /api/auth/login`

### AI & Chat

- `POST /api/ai/assess` - Submit questionnaire.
- `POST /api/ai/chat` - Send message to bot (Protected).

### Dashboard

- `GET /api/dashboard` - Get full user dashboard data.
- `POST /api/dashboard/schedule` - Add session to schedule.
- `DELETE /api/dashboard/schedule/:id` - Remove session.

### Content

- `GET /api/meditations` - List all sessions.
- `GET /api/meditations/category/:id` - Get sessions by category.
