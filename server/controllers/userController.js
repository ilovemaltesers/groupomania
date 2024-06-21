const { db } = require("../connect.js");

const signup = (req, res) => {
  db()
    .then((client) => {
      console.log("Connected to PostgreSQL database!");
      console.log("Client:", client);
      client.query("SELECT * FROM users", (err, result) => {
        if (err) {
          console.error("Error executing query", err);
        } else {
          console.log("Query result:", result.rows);
        }
      });
    })
    .catch((error) => {
      console.error("Error connecting to database:", error);
    });

  const { familyname, givenname, email, createdPassword, confirmPassword } =
    req.body;

  // Placeholder logic for now
  console.log(
    `Received signup request for familyname: ${familyname}, givenname: ${givenname}, email: ${email}, 
    password: ${createdPassword}, confirmpassword: ${confirmPassword}`
  );

  res.status(201).json({ message: "You have signed up successfully!👍" });
};

const login = (req, res) => {
  const { email, password } = req.body;

  // Placeholder logic for now
  console.log(
    `Received login request for email: ${email}, password: ${password}`
  );

  res.status(200).json({ message: "You have logged in successfully!👏" });
};

module.exports = { signup, login };
