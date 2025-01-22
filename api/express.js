const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);

module.exports = app; // Export the Express app
