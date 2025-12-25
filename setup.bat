@echo off
setlocal
echo 🚀 Setting up Stress Management Portal...

:: Check for npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Error: 'npm' is not installed. Please install Node.js first.
    pause
    exit /b 1
)

:: Backend Setup
if exist backend (
    echo 📦 Installing Backend Dependencies...
    cd backend
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Error: Backend installation failed.
        pause
        exit /b 1
    )
    cd ..
) else (
    echo ❌ Error: 'backend' directory not found!
    pause
    exit /b 1
)

:: Frontend Setup
if exist frontend (
    echo ✨ Installing Frontend Dependencies...
    cd frontend
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Error: Frontend installation failed.
        pause
        exit /b 1
    )
    cd ..
) else (
    echo ❌ Error: 'frontend' directory not found!
    pause
    exit /b 1
)

echo ✅ Setup Complete!
echo ------------------------------------------------
echo To start the application:
echo 1. Terminal 1: cd backend ^&^& npm run dev
echo 2. Terminal 2: cd frontend ^&^& npm run dev
echo ------------------------------------------------
pause
