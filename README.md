# Groupomania App

This documentation provides instructions on how to set up and run the "Groupomania" application locally. The application is built using React and Express, with a MySQL database. Additionally, a SQL dump file is included to help you populate your database with initial data.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

Node.js (v14.x or later)  
npm (Node Package Manager)  
MySQL (v8.x or later)

## Getting Started

1. Clone the Repository: Clone the repository from GitHub to your local machine using the following command:  
   `git clone https://github.com/ilovemaltesers/groupomania.git`
2. Install Dependencies: Navigate to the project directory and install the project dependencies for both the frontend and backend:  
   `cd Groupomania`  
   `cd client` (front-end)
   `npm install`  
   `cd server` (back-end)
   `npm install`
3. Database Setup:  
    .Create a MySQL database for your project.  
    .Import the SQL dump file located in the project's root directory:  
    `mysql -u your-username -p your-database-name < GroupomaniaBackup.sql`

   Alternatively you can just copy and paste the dumpfile into your IDE (e.g., pgAdmin) and run the query. This will populate and create all the schemas.

4. Configuration:  
   Please see my environment file .env in the server project to access the configuration credentials for the database etc.
