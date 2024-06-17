const { getClient } = require("../connect.js");

exports.getHello = (req, res) => {
  const client = getClient();

  getClient()
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
  res.send("Hello!😎");
};
