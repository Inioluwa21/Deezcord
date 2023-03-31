const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
console.log('starting....');
// app.use('/', express.static('pages'));

const cors = require('cors');

// **** Set basic express settings **** //

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var mysql = require('mysql');
const PORT = 8000;
var connection = mysql.createConnection({
  host: 'mysql1',
  user: 'root',
  password: 'admin',
});

connection.connect;
