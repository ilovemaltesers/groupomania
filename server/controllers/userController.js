const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../connect.js");

const JWT_SECRET = "blablabla";

// Signup function
const signup = async (req, res) => {
  const { familyName, givenName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  let client;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    client = await db();
    console.log("Connected to the database.");

    // Check if user already exists
    const userExists = await client.query(
      "SELECT * FROM public.users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).send("User already exists");
    }

    // Insert user into the database
    await client.query(
      "INSERT INTO public.users (family_name, given_name, email, password) VALUES ($1, $2, $3, $4)",
      [familyName, givenName, email, hashedPassword]
    );

    res.status(201).send("User successfully registered");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Error during signup");
  } finally {
    if (client) await client.end();
    console.log("Database connection closed.");
  }
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  let client;
  try {
    client = await db();
    console.log("Connected to the database.");

    // Retrieve user details including familyName and givenName
    const userResult = await client.query(
      "SELECT _id, family_name, given_name, password FROM public.users WHERE email = $1",
      [email]
    );

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
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    // Return userId, token, familyName, and givenName
    res.status(200).json({
      token,
      userId: user._id,
      familyName: user.family_name,
      givenName: user.given_name,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login");
  } finally {
    if (client) await client.end();
    console.log("Database connection closed.");
  }
};

module.exports = {
  signup,
  login,
};
