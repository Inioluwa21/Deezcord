const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
console.log('starting....');
// app.use('/', express.static('pages'));

// const cors = require('cors');

// **** Set basic express settings **** //

// app.use(cors());
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

connection.query(
  `CREATE DATABASE IF NOT EXISTS deezdb`,
  function (error, result) {
    if (error) console.log(error);
  }
);
connection.query(`USE deezdb`, function (error, results) {
  if (error) console.log(error);
});

connection.query(
  `CREATE TABLE IF NOT EXISTS users
( id int unsigned NOT NULL auto_increment, username varchar(20)
NOT NULL,
password varchar(30) NOT NULL,
PRIMARY KEY (id)
)`,
  function (error, result) {}
);
console.log('made users table');
connection.query(
  `CREATE TABLE IF NOT EXISTS posts
( id int unsigned NOT NULL auto_increment,
  post id int NOT NULL,
data varchar(400) NOT NULL,
userid int,
upvotes int,
downvotes int,
PRIMARY KEY (id)
)`,
  function (error, result) {}
);
console.log('made posts table');
connection.query(
  `CREATE TABLE IF NOT EXISTS replies
( id int unsigned NOT NULL auto_increment, topic varchar(30)
NOT NULL,
data varchar(400) NOT NULL,
userid int,
upvotes int,
downvotes int,
PRIMARY KEY (id)
)`,
  function (error, result) {}
);
console.log('made replies table');
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
