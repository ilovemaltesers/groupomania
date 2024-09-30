const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  password: "", // Ensure your password is set if you use one
  host: "localhost",
  port: "5432",
  database: "postgres",
});

const db = async (query, params) => {
  const client = await pool.connect(); // Get a client from the pool
  try {
    const result = await client.query(query, params); // Run the query
    return result; // Return the query result
  } catch (error) {
    console.error("Error executing query:", error);
    throw error; // Rethrow the error for handling elsewhere
  } finally {
    client.release(); // Release the client back to the pool
  }
};

module.exports = { db };
