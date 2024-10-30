# Groupomania App

This documentation provides step-by-step instructions to set up and run the "Groupomania" application locally. The application is built using React (frontend) and Express (backend) and uses PostgreSQL as its database. A SQL dump file is provided to help you initialize your database with default data.

## Prerequisites

Before you start, ensure the following software is installed on your machine:

- **Node.js** (v14.x or later)
- **npm** (Node Package Manager)
- **PostgreSQL** (database)

## Getting Started

### 1. Clone the Repository

First, clone the Groupomania repository to your local machine using the command below:

git clone https://github.com/ilovemaltesers/groupomania.git

2. Install Dependencies
   Navigate to the project directory and install the necessary dependencies for both the frontend and backend.

# Go to the project directory

cd Groupomania

# Install client dependencies

cd client
npm install

# Go back to the root and install server dependencies

cd server
npm install

3. Set Up the PostgreSQL Database
   Create a New Database:
   Open PostgreSQL and create a new database to store the application's data.
   Restore the Database from Backup:
   In the root of the project, there is an SQL folder containing a SQL dump file. Use this file to populate your database with initial data:
   Open PostgreSQL.
   Restore the newly created database by selecting the SQL file from the SQL folder in the project.
4. Configure Environment Variables
   To connect the application to your database and specify other configurations, create .env files in both the server and client directories.

Server .env File
Navigate to the server folder and create a new .env file with the following details:

# Server port configuration

PORT=3000 # Change to your preferred port, e.g., 3000

# Database configuration

DB_USER=your_db_user # Replace with your PostgreSQL username
DB_PASSWORD=your_db_password # Replace with your PostgreSQL password
DB_HOST=localhost # Keep as 'localhost' if running locally
DB_PORT=5432 # PostgreSQL default port
DB_DATABASE=your_db_name # Name of the database you created

Client .env File
Navigate to the client folder and create a .env file to configure the server’s API URL for the frontend.

If the backend server runs on localhost port 3000, configure the client to point to that address:

REACT_APP_API_URL=http://localhost:3000/

If using a different port, adjust the URL accordingly.

5. Start the Application

Start the Backend Server
In the server directory, run the following command:

npm start

Start the Frontend Client
In a separate terminal window, navigate to the client directory and run:

npm start
This will start the React development server, typically on port 3001 if 3000 is already in use.

Accessing the Application
Once both the client and server are running:

Open your browser and navigate to http://localhost:3001 (or the port React provides) to view the application interface.

```

```
