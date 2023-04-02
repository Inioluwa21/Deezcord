const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
console.log('starting....');
const cors = require('cors');

// **** Set basic express settings **** //

app.use(cors());

var checkIfAdminExists;
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

function createDB() {
  connection.query(
    `CREATE DATABASE IF NOT EXISTS deezdb`,
    function (error, result) {
      if (error) console.log(error);
    }
  );
  connection.query(`USE deezdb`, function (error, results) {
    if (error) console.log(error);
  });
  createUsersTable();
}
createDB();
// var query = `
// DROP TABLE users
// `;

// connection.query(query, (error, results) => {
//   if (error) {
//     console.error('Error deleting tables:', error);
//     return;
//   }
//   console.log(`Deleted ${results.length} tables`);
// });

// connection.query(`SELECT * FROM users`, (error, result) => {
//   if (error) {
//     checkIfAdminExists = false; // this means that the table has not been created yet, hence no admin
//     console.log('GOT TO THIS USERS PART');
//   } else {
//     checkIfAdminExists = true;
//   }
// });
function createUsersTable() {
  connection.query(
    `CREATE TABLE IF NOT EXISTS users
( id int unsigned NOT NULL auto_increment, username varchar(20)
NOT NULL,
password varchar(30) NOT NULL,
authoritylevel int NOT NULL,
PRIMARY KEY (id)
)`,
    function (error, result) {}
  );
  console.log('made users table');
  createPostsTable();
}

function createPostsTable() {
  connection.query(
    `CREATE TABLE IF NOT EXISTS posts
( id int unsigned NOT NULL auto_increment,
  postid int NOT NULL,
data varchar(400) NOT NULL,
userid int,
upvotes int,
downvotes int,
PRIMARY KEY (id)
)`,
    function (error, result) {}
  );
  console.log('made posts table');
  createRepliesTable();
}

function createRepliesTable() {
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
}

app.post('/register', (req, res) => {
  console.log('got here');
  const username = req.body.username;
  const password = req.body.password;
  const authoritylevel = 0;

  console.log('the data: ' + password);

  var query = `INSERT INTO users (username, password, authoritylevel) VALUES
    ('${username}', '${password}', '${authoritylevel}')`;

  connection.query(query, function (error, result) {
    console.log(error);
  });
  res.send('ok ');
});

var theQuery = `SELECT * FROM users`;
connection.query(theQuery, function (err, result) {
  if (err) console.log(err);
  console.log(JSON.stringify(result));
});
console.log('made replies table');

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
