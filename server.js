const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());