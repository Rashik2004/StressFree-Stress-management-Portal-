# Deployment Guide

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Local or Atlas URI)

## 1. Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - Create a `.env` file in the `backend` root.
   - Add the following:
     ```env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/stress-management-portal
     JWT_SECRET=your_super_secret_key
     NODE_ENV=development
     ```
4. Start the server:
   ```bash
   npm run dev
   ```

## 2. Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the application at `http://localhost:5173`.

## 3. Free Cloud Deployment Guide

### Phase 1: Database (MongoDB Atlas)

1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up.
2. **Create Cluster**: Create a free "Shared" cluster (M0 Sandbox).
3. **Network Access**: whitelist `0.0.0.0/0` (Allow Access from Anywhere) in Network Access to let Render connect.
4. **Database Access**: Create a database user via **Database Access** tab.
5. **Get Connection String**:
   - Go to **Database** > **Connect** > **Drivers**.
   - Copy the string (e.g., `mongodb+srv://<user>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority`).
   - Replace `<user>` and `<password>` with your credentials.

### Phase 2: Backend (Render)

1. **Sign Up**: Go to [Render](https://render.com) and login with GitHub.
2. **New Web Service**: Click "New +" and select "Web Service".
3. **Connect Repo**: Select your GitHub repository.
4. **Configure Settings**:
   - **Name**: `stress-portal-backend` (or similar)
   - **Root Directory**: `backend` (IMPORTANT)
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free
5. **Environment Variables**:
   Add the following variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string.
   - `NODE_ENV`: `production`
6. **Deploy**: Click "Create Web Service".
7. **Copy URL**: Once live, copy the backend URL (e.g., `https://stress-portal-backend.onrender.com`).

### Phase 3: Frontend (Vercel)

1. **Sign Up**: Go to [Vercel](https://vercel.com) and login with GitHub.
2. **Add New Project**: Import your GitHub repository.
3. **Configure Settings**:
   - **Root Directory**: Edit and select `frontend`.
   - **Framework Preset**: Vite (should detect automatically).
   - **Build Command**: `npm run build` (default).
   - **Output Directory**: `dist` (default).
4. **Environment Variables**:
   Add the backend URL you copied from Render:
   - Key: `VITE_API_URL`
   - Value: `https://stress-portal-backend.onrender.com/api` (Remember to include `/api` if your backend routes start with it)
5. **Deploy**: Click "Deploy".

### Phase 4: Final Verification

- Open your Vercel URL.
- Try to Login/Register.
- If it fails, check the "Console" in Developer Tools (F12) for errors.
- Ensure the Backend on Render is "Live".

> **Note**: The Free tier on Render spins down after inactivity. The first request might take 50+ seconds. Be patient!
