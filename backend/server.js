const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Load env vars
dotenv.config();

const authRoutes = require("./routes/auth");
const contentRoutes = require("./routes/contentRoutes");
const meditationRoutes = require("./routes/meditationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/meditations", require("./routes/meditationRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Stress Management API" });
});

app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  const isDatabaseConnected = dbState === 1;

  res.status(isDatabaseConnected ? 200 : 503).json({
    status: isDatabaseConnected ? "ok" : "degraded",
    service: "stress-management-api",
    database: isDatabaseConnected ? "connected" : "disconnected",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to database then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
      );
    });
  })
  .catch((error) => {
    console.error(`Server startup failed: ${error.message}`);
    process.exit(1);
  });
