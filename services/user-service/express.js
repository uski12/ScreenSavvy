const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const tmdbRoutes = require("./routes/TmdbRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/tmdb", tmdbRoutes);

module.exports = app; // Export the Express app
