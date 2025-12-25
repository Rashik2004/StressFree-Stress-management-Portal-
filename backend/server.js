const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

// Load env vars
dotenv.config();

const authRoutes = require("./routes/auth");
const contentRoutes = require("./routes/contentRoutes");
const meditationRoutes = require("./routes/meditationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/meditations", require("./routes/meditationRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Stress Management API" });
});

const PORT = process.env.PORT || 5000;

// Connect to database then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
});
