const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// add routes
const db = require('./db/connection');


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Add routes here



// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection AM I DOING THIS RIGHT???
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});