# Stress Management Portal 🌿

> A comprehensive, AI-powered platform designed to help users manage stress through personalized meditation, mood tracking, and intelligent insights.

![Project Banner](https://via.placeholder.com/1200x400?text=Stress+Management+Portal)

## 🚀 Overview

The **Stress Management Portal** is a full-stack web application built to provide a holistic approach to mental well-being. It combines traditional mindfulness techniques with modern technology to offer a personalized experience for every user.

### Key Features

- **🧠 AI-Powered Assessment**:

  - Interactive questionnaire to gauge stress levels.
  - Generates unique "Stress Archetypes" (e.g., _The Overthinker_, _The Burnout Warrior_).
  - Automatically creates a personalized weekly meditation schedule based on results.

- **💬 AI Mindfulness Chatbot**:

  - Always-available floating chat widget.
  - Detects emotional keywords (anxiety, fatigue, loneliness) and responds with empathetic guidance.
  - Suggests specific meditation sessions based on real-time conversation.

- **🧘‍♀️ Meditation Library**:

  - Curated audio sessions for Sleep, Focus, Anxiety, and more.
  - Built-in audio player with immersive UI.
  - 'Schedule Routine' feature to set reminders for specific recurring sessions.

- **📊 Smart Dashboard**:

  - **Mood Tracking**: Log daily mood and see trends over time.
  - **Weekly Planner**: visual schedule of upcoming sessions.
  - **Progress Analytics**: Track streak days and total mindfulness minutes.
  - **Dynamic Greetings**: Time-aware personalized welcome messages.

- **🔔 Smart Reminders**:
  - Browser notifications to remind users of scheduled sessions.

## 🛠️ Tech Stack

This project is built using the **MERN** stack with modern frontend libraries.

- **Frontend**:

  - [React.js](https://reactjs.org/) (Vite)
  - [Tailwind CSS](https://tailwindcss.com/) (Styling)
  - [Framer Motion](https://www.framer.com/motion/) (Animations)
  - [Redux / Context API](https://reactjs.org/docs/context.html) (State Management)
  - [Lucide React](https://lucide.dev/) (Icons)

- **Backend**:
  - [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/) (Database)
  - [Mongoose](https://mongoosejs.com/) (ODM)
  - [JWT](https://jwt.io/) (Authentication)

## 📦 Installation & Setup

Follow these steps to get the project running locally.

### Prerequisites

- Node.js (v16+)
- MongoDB (Running locally or MongoDB Atlas URI)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/stress-management-portal.git
cd stress-management-portal
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/stress-management-portal
JWT_SECRET=your_super_secret_key_123
NODE_ENV=development
```

**Seed the Database (Important):**
To get initial meditation content and categories:

```bash
node seeder.js
```

Start the server:

```bash
npm run dev
```

_Server runs on http://localhost:5000_

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
```

Start the client:

```bash
npm run dev
```

_App runs on http://localhost:5173_

## � Project Structure

```
stress-management-portal/
├── backend/                # Express API
│   ├── config/             # DB Connectivity
│   ├── controllers/        # Route Logic (AI, Auth, Dashboard)
│   ├── models/             # Mongoose Schemas (User, Meditation)
│   ├── routes/             # API Routes
│   └── seeder.js           # Data Import Script
│
└── frontend/               # React Client
    ├── src/
    │   ├── components/     # Reusable Components (Chatbot, Player)
    │   ├── context/        # Auth & Theme Context
    │   ├── features/       # API Service Layers
    │   ├── pages/          # Full Page Views
    │   └── assets/         # Images & Styles
```

## 🔐 API Documentation

| Method   | Endpoint                  | Description                 |
| :------- | :------------------------ | :-------------------------- |
| **POST** | `/api/auth/register`      | Register new user           |
| **POST** | `/api/auth/login`         | Login user                  |
| **POST** | `/api/ai/assess`          | Submit stress assessment    |
| **POST** | `/api/ai/chat`            | Send message to AI Chatbot  |
| **GET**  | `/api/dashboard`          | Fetch user stats & schedule |
| **POST** | `/api/dashboard/schedule` | Schedule a meditation       |

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## 📄 License

This project is licensed under the MIT License.
