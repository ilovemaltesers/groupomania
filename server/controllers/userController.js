const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../connect.js");

const JWT_SECRET = "blablabla";

// signup function
const signup = async (req, res) => {
  const { familyName, givenName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await db();
    console.log("Connected to the database.");

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
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send(`Error during signup: ${error.message}`);
  } finally {
    if (client) await client.end();
    console.log("Database connection closed.");
  }
};

// login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await db();
    console.log("Connected to the database.");

    // Check if user exists
    const userResult = await client.query(
      "SELECT id, password FROM public.users WHERE email = $1",
      [email]
    );
    console.log("User lookup query executed.", userResult.rows);

    if (userResult.rows.length === 0) {
      return res.status(400).send("User does not exist");
    }

    const user = userResult.rows[0];

    // Verify password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).send("Incorrect password");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send(`Error during login: ${error.message}`);
  } finally {
    if (client) await client.end();
    console.log("Database connection closed.");
  }
};

module.exports = {
  login,
  signup,
};
