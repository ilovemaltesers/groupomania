const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../connect.js");
const path = require("path");
const fs = require("fs");

const JWT_SECRET = "blablabla"; // Consider using a more secure way to manage secrets

// Signup function
const signup = async (req, res) => {
  const { familyName, givenName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords do not match");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const userExistsResult = await db(
      "SELECT * FROM public.users WHERE email = $1",
      [email]
    );

    if (userExistsResult.rows.length > 0) {
      return res.status(400).send("User already exists");
    }

    // Insert user into the database
    await db(
      "INSERT INTO public.users (family_name, given_name, email, password) VALUES ($1, $2, $3, $4)",
      [familyName, givenName, email, hashedPassword]
    );

    res.status(201).send("User successfully registered");
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Error during signup");
  }
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve user details including email and profile picture
    const userResult = await db(
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
      email: user.email,
      profilePicture: user.profile_picture,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login");
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

  try {
    const filePath = path.join("images", req.file.filename);

    await db("UPDATE public.users SET profile_picture = $1 WHERE _id = $2", [
      filePath,
      userId,
    ]);

    res.status(200).json({
      message: "Profile picture uploaded successfully!",
      imageUrl: filePath,
      // file: {
      //   filename: req.file.filename,
      //   path: filePath,
      //   mimetype: req.file.mimetype,
      //   size: req.file.size,
      // },
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).send("Error uploading profile picture");
  }
};

// Get profile picture function for profile page
const getProfilePicture = async (req, res) => {
  const userId = req.userId; // Ensure req.userId is set by verifyToken

  if (!userId) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  try {
    const user = await db(
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
  }
};

// Post role about me function
const postRoleAboutMe = async (req, res) => {
  const { roleTitle, aboutMe } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  try {
    await db(
      "UPDATE public.users SET title_role = $1, about_me = $2 WHERE _id = $3",
      [roleTitle, aboutMe, userId]
    );

    res.status(200).send("Role and about me updated successfully!");
  } catch (error) {
    console.error("Error updating role and about me:", error);
    res.status(500).send("Error updating role and about me");
  }
};

// Get role about me function
const getRoleAboutMe = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  try {
    const user = await db(
      "SELECT title_role, about_me FROM public.users WHERE _id = $1",
      [userId]
    );

    if (user.rows.length === 0) {
      return res.status(404).send("User not found");
    }

    const roleAboutMe = user.rows[0];

    res.status(200).json({
      roleTitle: roleAboutMe.title_role,
      aboutMe: roleAboutMe.about_me,
    });
  } catch (error) {
    console.error("Error getting role and about me:", error);
    res.status(500).send("Error getting role and about me");
  }
};

// Delete account function

const deleteAccount = async (req, res) => {
  const userId = req.userId;

  // Check if the user is authenticated
  if (!userId) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  try {
    // 1. Get the user's profile picture path
    const userResult = await db(
      "SELECT profile_picture FROM public.users WHERE _id = $1",
      [userId]
    );

    const currentPicture = userResult.rows[0]?.profile_picture;

    // If a profile picture exists, delete it from the server
    if (currentPicture) {
      const picturePath = path.join(__dirname, "..", currentPicture);
      fs.unlink(picturePath, (err) => {
        if (err) {
          console.error("Failed to delete profile picture:", err);
        } else {
          console.log("Profile picture deleted successfully");
        }
      });
    }

    // 2. Get the paths of all media uploads (images) from the user's posts
    const postImagesResult = await db(
      "SELECT media_upload FROM public.posts WHERE user_id = $1",
      [userId]
    );

    const postImages = postImagesResult.rows;

    // 3. Delete each post's image from the server if it exists
    postImages.forEach((post) => {
      const postImagePath = post.media_upload; // Assuming media_upload stores the image path
      if (postImagePath) {
        const fullPostImagePath = path.join(
          __dirname,
          "..",
          "images", // Assuming the images are stored in an 'images' directory
          path.basename(postImagePath)
        );
        fs.unlink(fullPostImagePath, (err) => {
          if (err) {
            console.error("Failed to delete post image:", err);
          } else {
            console.log("Post image deleted successfully:", fullPostImagePath);
          }
        });
      }
    });

    // 4. Delete the user's comments from the database
    await db("DELETE FROM public.comments WHERE user_id = $1", [userId]);

    // 5. Delete the user's posts from the database
    await db("DELETE FROM public.posts WHERE user_id = $1", [userId]);

    // 6. Delete the user's likes from the database
    await db("DELETE FROM public.likes WHERE user_id = $1", [userId]);

    // 7. Delete the user from the database
    const deleteResult = await db("DELETE FROM public.users WHERE _id = $1", [
      userId,
    ]);

    // Check if any rows were deleted
    if (deleteResult.rowCount === 0) {
      return res.status(404).send({ message: "User not found" });
    }

    // Successful deletion response
    res
      .status(200)
      .send(
        "Account and associated posts, comments, likes, and profile picture deleted successfully!"
      );
  } catch (error) {
    console.error("Error in deleteAccount:", error);
    res.status(500).send("Error deleting account");
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).send({ message: "User not authenticated" });
  }

  try {
    const userResult = await db(
      "SELECT password FROM public.users WHERE _id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).send("User does not exist");
    }

    const userPassword = userResult.rows[0].password;

    // Verify the current password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      userPassword
    );

    if (!isPasswordCorrect) {
      return res.status(400).send("Incorrect password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db("UPDATE public.users SET password = $1 WHERE _id = $2", [
      hashedPassword,
      userId,
    ]);

    res.status(200).send("Password updated successfully!");
  } catch (error) {
    console.error("Error during password change:", error);
    res.status(500).send("Error during password change");
  }
};

module.exports = {
  signup,
  login,
  uploadProfilePicture,
  getProfilePicture,
  postRoleAboutMe,
  getRoleAboutMe,
  deleteAccount,
  changePassword,
};
