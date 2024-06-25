const { db } = require("../connect.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Client } = require("pg");

const JWT_SECRET = "blablabla";

const signup = async (req, res) => {
  const { familyName, givenName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const result = await Client.query(
      "INSERT INTO users (family_name, given_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
      [familyName, givenName, email, hashedPassword]
    );

    const userId = result.rows[0].id;

    // Generate JWT token
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).send("Error during signup");
  }
};

module.exports = {
  signup,
};

// const signup = (req, res) => {
//   db()
//     .then((client) => {
//       console.log("Connected to PostgreSQL database!");
//       console.log("Client:", client);
//       client.query("SELECT * FROM users", (err, result) => {
//         if (err) {
//           console.error("Error executing query", err);
//         } else {
//           console.log("Query result:", result.rows);
//         }
//       });
//     })
//     .catch((error) => {
//       console.error("Error connecting to database:", error);
//     });

//   const { familyname, givenname, email, createdPassword, confirmPassword } =
//     req.body;

//   // Placeholder logic for now
//   console.log(
//     `Received signup request for familyname: ${familyname}, givenname: ${givenname}, email: ${email},
//     password: ${createdPassword}, confirmpassword: ${confirmPassword}`
//   );

//   res.status(201).json({ message: "You have signed up successfully!👍" });
// };

// const login = (req, res) => {
//   const { email, password } = req.body;

//   // Placeholder logic for now
//   console.log(
//     `Received login request for email: ${email}, password: ${password}`
//   );

//   res.status(200).json({ message: "You have logged in successfully!👏" });
// };

// module.exports = { signup, login };
