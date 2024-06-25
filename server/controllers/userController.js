const { db } = require("../connect.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "blablabla";

const { Client } = require("pg");

const signup = async (req, res) => {
  const { familyName, givenName, email, password, confirmPassword } = req.body;

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new client instance and connect
    const client = new Client();
    await client.connect();

    try {
      // Check if user already exists
      const userExists = await client.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (userExists.rows.length > 0) {
        return res.status(400).send("User already exists");
      }

      // Insert user into database
      const result = await client.query(
        "INSERT INTO users (family_name, given_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [familyName, givenName, email, hashedPassword]
      );

      const userId = result.rows[0].id;

      // Generate JWT token
      const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });

      res.status(201).json({ token });
    } finally {
      // Ensure the client is closed
      await client.end();
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send(`Error during signup: ${error.message}`);
  }
};

module.exports = {
  signup,
  // login,
};
