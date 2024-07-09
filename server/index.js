require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
const userRoutes = require("./routes/userRoutes");

// Test response
app.get("/", (req, res) => {
  res.send("Working! 🌸");
});

// Use routes
app.use("/api/user", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`✨Server is running on http://localhost:${port}✨`);
});

module.exports = app;
