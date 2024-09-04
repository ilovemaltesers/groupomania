require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static("images")); // Serve static files from the images directory

// middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");

// Test response
app.get("/", (req, res) => {
  res.send("Working! 🌸");
});

// Use routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/like", likeRoutes);

// Start the server
app.listen(port, () => {
  console.log(`✨Server is running on http://localhost:${port}✨`);
});

module.exports = app;
