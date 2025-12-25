# Stress Management Portal - Frontend 🎨

The user interface for the Stress Management Portal, built with React, Vite, and Tailwind CSS. Focuses on providing a calm, immersive, and responsive user experience.

## ✨ Features

- **Immersive Design**: Uses glassmorphism, soft gradients, and smooth transitions.
- **Interactive Animations**: Powered by `framer-motion` for fluid page loads and micro-interactions.
- **Global Components**:
  - **Chatbot**: Floating AI widget available on all pages.
  - **ReminderManager**: Background service for handling schedule notifications.
  - **MusicPlayer**: Persistent meditation audio player.
- **Responsive**: Fully optimized for Desktop, Tablet, and Mobile.

## 🚀 Getting Started

### 1. Installation

Navigate to the frontend directory:

```bash
cd frontend
npm install
```

### 2. Running Locally

```bash
npm run dev
```

The app will start at `http://localhost:5173`.

### 3. Build for Production

```bash
npm run build
```

Previews the production build:

```bash
npm run preview
```

## 🧩 Key Components

- **`src/context/AuthContext`**: Handles user authentication state and JWT storage.
- **`src/features/aiService`**: API layer for communicating with the AI backend (Assessment & Chat).
- **`src/pages/Dashboard.jsx`**: The command center for the user, aggregating stats, schedule, and mood.
- **`src/components/Common/Chatbot.jsx`**: The AI companion widget logic.

## 🎨 Styling

- **Tailwind CSS**: Utility-first styling.
- **ThemeContext**: Handles Dark/Light mode preferences and automatic theme switching based on mood.

## 📦 Dependencies

- `react-router-dom`: Client-side routing.
- `axios`: HTTP requests.
- `lucide-react`: Iconography.
- `chart.js` / `react-chartjs-2`: Data visualization for mood insights.
