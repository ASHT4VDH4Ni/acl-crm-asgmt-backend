CRM Application - Backend
The backend part of the CRM application handles the logic, database management, and API requests. It's built using Node.js, Express, and MySQL.

Technologies Used

Node.js: This allows us to run JavaScript on the server, outside the browser.
Express.js: A simple framework that makes it easier to build a server and handle API requests.
MySQL: A database that stores all the customer and interaction data.
dotenv: This helps keep sensitive information (like database credentials) safe in environment variables.
cors: A security feature that makes sure your frontend can communicate with the backend.


 Project Structure
 crm-backend/
│                
├── .env                           
├── server.js                      
└── package.json 

Features of the Backend
Database Configuration: The db.js file sets up the connection to the MySQL database.
Express Server: The server.js file sets up the server to handle incoming requests like adding customers or logging interactions.

Dependencies 
express
mysql2
dotenv
cors
