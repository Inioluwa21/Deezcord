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
  topic varchar(30)
NOT NULL,
data varchar(400) NOT NULL,
userid int,
upvotes int,
downvotes int,
channelid int,
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
( id int unsigned NOT NULL auto_increment,
data varchar(400) NOT NULL,
userid int,
upvotes int,
downvotes int,
postid int NOT NULL,
channelid int,
PRIMARY KEY (id)
)`,
    function (error, result) {}
  );
  createChannelsTable();
}

function createChannelsTable() {
  connection.query(
    `CREATE TABLE IF NOT EXISTS channels
    ( id int unsigned NOT NULL auto_increment, name varchar(30)
    NOT NULL,
    PRIMARY KEY (id)
    )`,
    function (error, result) {}
  );
}
app.post('/test', (req, res) => {
  console.log('CONNECTED');
});
app.post('/login', (req, res) => {
  console.log('got to signin post function');
  const username = req.body.username;
  const password = req.body.password;

  console.log(username + password);

  const query = `
    SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1;
  `;

  connection.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Error checking for user:', error);
      return;
    }

    if (results.length === 0) {
      res.send('User does not exist');
    } else {
      console.log('User exists');
      res.send('User exists');
    }
  });
});
app.post('/register', (req, res) => {
  console.log('got here');
  const username = req.body.username;
  const password = req.body.password;
  const authoritylevel = 0;

  var query = `INSERT INTO users (username, password, authoritylevel) VALUES
    ('${username}', '${password}', '${authoritylevel}')`;

  connection.query(query, function (error, result) {
    console.log(error);
  });
  console.log('added new user with username ' + username);
  res.send('ok ');
});

app.post('/createChannel', (req, res) => {
  const name = req.body.name;
  var query = `INSERT INTO channels (name) VALUES
  ('${name}')`;
  connection.query(query, function (error, result) {
    console.log(error);
  });
  console.log('added new channel ' + name);
  res.send('ok ');
});

app.get('/getChannels', (req, res) => {
  var theQuery = `SELECT * FROM channels`;
  connection.query(theQuery, function (err, result) {
    if (err) console.log(err);
    console.log(JSON.stringify(result));
    res.send(JSON.stringify(result));
  });
});

app.get('/getReplies', (req, res) => {
  var postId = req.body.postId;
  const query = `
  SELECT * FROM replies WHERE postid = ?;
`;

  connection.query(query, [postId], (error, results) => {
    if (error) {
      console.error('Error getting replies:', error);
      return;
    }
    console.log(JSON.stringify(results));
    res.send(JSON.stringify(results));
  });
});

var theQuery = `SELECT * FROM users`;
connection.query(theQuery, function (err, result) {
  if (err) console.log(err);
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
