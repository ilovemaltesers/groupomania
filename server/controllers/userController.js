const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../connect.js");

const JWT_SECRET = "blablabla";

const signup = async (req, res) => {
  const { familyName, givenName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await db();
    console.log("Connected to the database.");

    try {
      // Check if user already exists
      const userExists = await client.query(
        "SELECT * FROM public.users WHERE email = $1",
        [email]
      );
      console.log("User exists query executed.", userExists.rows);

      if (userExists.rows.length > 0) {
        return res.status(400).send("User already exists");
      }

      // Insert user into database
      const result = await client.query(
        "INSERT INTO public.users (family_name, given_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [familyName, givenName, email, hashedPassword]
      );
      console.log("User insertion query executed.", result.rows);

      const userId = result.rows[0].id;

      // Generate JWT token
      const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });

      res.status(201).json({ token });
    } finally {
      await client.end();
      console.log("Database connection closed.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send(`Error during signup: ${error.message}`);
  }
};

module.exports = {
  signup,
};
