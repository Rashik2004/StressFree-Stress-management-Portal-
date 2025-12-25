#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status

echo "🚀 Setting up Stress Management Portal..."

# Check requirements
if ! command -v npm &> /dev/null; then
    echo "❌ Error: 'npm' is not installed. Please install Node.js first."
    exit 1
fi

# Backend Setup
echo "📦 Installing Backend Dependencies..."
if [ -d "backend" ]; then
    cd backend
    npm install
    cd ..
else
    echo "❌ Error: 'backend' directory not found!"
    exit 1
fi

# Frontend Setup
echo "✨ Installing Frontend Dependencies..."
if [ -d "frontend" ]; then
    cd frontend
    npm install
    cd ..
else
    echo "❌ Error: 'frontend' directory not found!"
    exit 1
fi

echo "✅ Setup Complete!"
echo "------------------------------------------------"
echo "To start the application:"
echo "1. Terminal 1: cd backend && npm run dev"
echo "2. Terminal 2: cd frontend && npm run dev"
echo "------------------------------------------------"
