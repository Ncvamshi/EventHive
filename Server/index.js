import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import apiRoutes from "./routes/api.js";
import homeRoutes from "./routes/home.js";
import profileRoutes from "./routes/profile.js";
import cors from "cors";
import eventRoutes from "./routes/events.js";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);
app.use("/api/home", cors(), homeRoutes);
app.use("/api/profile", cors(), profileRoutes);
app.use("/api/events", eventRoutes); // Register event routes

// Serve React's build files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, "../build");
app.use(express.static(buildPath));

// Catch-all route to serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

// Connect to MongoDB
mongoose
mongoose
.connect("mongodb://localhost:27017/EventHive/", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Start the server
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
