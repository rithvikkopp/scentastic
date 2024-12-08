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
app.post('/users', (req, res) => {
    const { userId, firstName, lastName, password } = req.body;
    const query1 = `
      SELECT * FROM User WHERE UserID = ?;`
    db.query(query1, [userId], (err, results) => {
      if (results.length != 0) {
        console.error('User already exists');
        // alert('User already exists! Use the login.')
        res.status(200).send('User already exists. Use the login if that\'s you.');
        return;
      } else {
        const query2 = `
          INSERT INTO User (UserID, FirstName, LastName, Password, Notes, Feelings) 
          VALUES (?, ?, ?, ?, '.', '.')
        `;
        db.query(query2, [userId, firstName, lastName, password], (err, results) => {
          if (err) {
            console.error('Error saving user data:', err.message);
            res.status(500).send('Error saving user data.');
          } else {
            res.status(200).send('You picked a unique UserId! User registered successfully!');
          }
        });
      }
    })
  });
  app.delete('/users', (req, res) => {
    const userId = req.query.userId; // Extract userId from query parameters
  
    const query1 = `DELETE FROM User WHERE UserID = ?;`;
    db.query(query1, [userId], (err, results) => {
      if (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).send("Something went wrong. Please try again.");
      } else if (results.affectedRows === 0) {
        res.status(404).send("User not found.");
      } else {
        res.status(200).send('User successfully deleted! You will now be redirected to the Signup/Login.');
      }
    });
  });

  app.put('/users', (req, res) => {
    const { userId, firstName, lastName, password , newUserID} = req.body;
    const query1 = `UPDATE User SET UserID = ? WHERE UserID=?;`
    console.log(userId);
    db.query(query1, [newUserID, userId], (err, results) => {
      if (err) {
        res.status(500).send("Something went wrong. Please try again.");
      } else {
        res.status(200).send('User ID successfully updated! You will now be redirected to the Signup/Login.');
      }
    })
  });

  app.put('/users-notes', (req, res) => {
    const { userId, firstName, lastName, password , notes, feelings} = req.body;
    if (!userId || !notes) {
      return res.status(400).send("Missing userId or notes in the request body.");
    }
    console.log('Request body:', req.body);
    // console.log(notes);
    const query1 = `UPDATE User SET Notes = ? WHERE UserID=?;`
    db.query(query1, [notes, userId], (err, results) => {
      if (err) {
        res.status(500).send("Something went wrong updating user notes. Please try again.");
      } else {
        console.log("HIHIHIHHIIHIH1");
        res.status(200).send('User notes successfully updated!');
      }
    })
  });

  app.put('/users-feelings', (req, res) => {
    const { userId, firstName, lastName, password , notes, feelings} = req.body;
    if (!userId || !feelings) {
      return res.status(400).send("Missing userId or notes in the request body.");
    }
    // console.log(feelings);
    const query2 = `UPDATE User SET Feelings = ? WHERE UserID=?;`
    db.query(query2, [feelings, userId], (err, results) => {
      if (err) {
        res.status(500).send("Something went wrong updating user feelings. Please try again.");
      } else {
        console.log("HIHIHIHHIIHIH2");
        res.status(200).send('User feelings successfully updated!');
      }
    })

  });

  app.put('/search', (req, res) => {
    const {name} = req.body;
    // console.log(`Search query received: ${name}`);

  if (!name) {
    return res.status(400).send("Missing 'name' in the query parameters.");
  }

  const query = `SELECT * FROM Perfumes WHERE name LIKE ?`;
  db.query(query, [`%${name}%`], (err, results) => {
    if (err) {
      console.error("Error while searching:", err.message);
      res.status(500).send("Something went wrong searching.");
    } else {
      // console.log("Search results:", results);
      if (Array.isArray(results)) {
        res.status(200).json(results); // Send as JSON array
      } else {
        res.status(200).json([results]); // Wrap single result in an array
      }
    }
  })
    
  });

  app.put('/dupes', (req, res) => {
    const {id} = req.body;
    // console.log(id);

  const query = `CALL GetAvgDupePrice(?);`;
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error while searching:", err.message);
      res.status(500).send("Something went wrong searching.");
    } else {
      // console.log("Search results:", results);
      if (Array.isArray(results)) {
        res.status(200).json(results); // Send as JSON array
      } else {
        res.status(200).json([results]); // Wrap single result in an array
      }
    }
  })
    
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${5000}`);
});
