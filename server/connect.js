const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

const db = async (query, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params); // Run the query
    return result; // Return the query result
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

module.exports = { db };
