const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../connect.js");
const path = require("path");

const JWT_SECRET = "blablabla"; // Consider using a more secure way to manage secrets

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
    if (client) {
      await client.end();
      console.log("Database connection closed.");
    }
  }
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  let client;
  try {
    client = await db();
    console.log("Connected to the database.");

    // Retrieve user details including email and profile picture
    const userResult = await client.query(
      "SELECT _id, family_name, given_name, email, profile_picture, password FROM public.users WHERE email = $1",
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

    // Return user details including email and profile picture
    res.status(200).json({
      token,
      userId: user._id,
      familyName: user.family_name,
      givenName: user.given_name,
      email: user.email, // Include email in the response
      profilePicture: user.profile_picture, // Include profile picture in the response
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login");
  } finally {
    if (client) {
      await client.end();
      console.log("Database connection closed.");
    }
  }
};

// Upload profile picture function
const uploadProfilePicture = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const userId = req.userId; // Ensure req.userId is set by verifyToken

  if (!userId) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  let client;
  try {
    const filePath = path.join("images", req.file.filename);

    client = await db(); // Initialize client here
    await client.query(
      "UPDATE public.users SET profile_picture = $1 WHERE _id = $2",
      [filePath, userId]
    );

    res.status(200).json({
      message: "Profile picture uploaded successfully!",
      file: {
        filename: req.file.filename,
        path: filePath,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).send("Error uploading profile picture");
  } finally {
    if (client) {
      await client.end();
      console.log("Database connection closed.");
    }
  }
};

// Get profile picture function for profile page
const getProfilePicture = async (req, res) => {
  const userId = req.userId; // Ensure req.userId is set by verifyToken

  if (!userId) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  let client;
  try {
    client = await db(); // Initialize client here
    const user = await client.query(
      "SELECT profile_picture FROM public.users WHERE _id = $1",
      [userId]
    );

    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    const profilePicture = user.rows[0].profile_picture;

    if (!profilePicture) {
      return res.status(404).send("Profile picture not found");
    }

    res.status(200).json({
      imageUrl: profilePicture,
    });
  } catch (error) {
    console.error("Error getting profile picture:", error);
    res.status(500).send("Error getting profile picture");
  } finally {
    if (client) {
      await client.end();
      console.log("Database connection closed.");
    }
  }
};

module.exports = {
  signup,
  login,
  uploadProfilePicture,
  getProfilePicture,
};
