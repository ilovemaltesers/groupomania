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

// routes
//test response
app.get("/", (req, res) => {
  res.send("Working! 🌸");
});

// hiding for now
// app.use("/api/hello", userRoutes);

const userRoutes = require("./routes/userRoutes");

app.use("/api/user", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`✨Server is running on http://localhost:${port}✨`);
});

//export app
module.exports = app;
