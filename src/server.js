const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
  host: '34.16.24.69', // Replace with your GCP MySQL IP
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'scentastic', // Replace with your MySQL database name
  port: 3306,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

// Route to handle sign-up data
app.post('/signup', (req, res) => {
    const { userId, firstName, lastName, password } = req.body;
  
    const query = `
      INSERT INTO User (UserID, FirstName, LastName, Password, Notes, Feelings) 
      VALUES (?, ?, ?, ?, NULL, NULL)
    `;
    db.query(query, [userId, firstName, lastName, password], (err, results) => {
      if (err) {
        console.error('Error saving user data:', err.message);
        res.status(500).send('Error saving user data.');
      } else {
        res.status(200).send('User registered successfully!');
      }
    });
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});
