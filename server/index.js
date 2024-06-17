const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const userRoutes = require("./routes/userRoutes");

// import userRoutes from "./routes/users.js";

app.listen(port, () => {
  console.log(`✨Server is running on http://localhost:${port}✨`);
});

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/hello", userRoutes);

//export app
module.exports = app;
