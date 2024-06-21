const { Client } = require("pg");
require("dotenv").config();

module.exports.db = () => {
  return new Promise((resolve, reject) => {
    const client = new Client({
      user: "postgres",
      password: "",
      host: "localhost",
      port: "5432",
      database: "postgres",
    });
    client
      .connect()
      .then(() => {
        console.log("Successfully connected to PostgreSQL database");
        resolve(client);
      })
      .catch((error) => {
        console.error("Error connecting to PostgreSQL database:", error);
        reject(error);
      });
  });
};
