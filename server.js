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

