const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
console.log('starting....');
const cors = require('cors');

// **** Set basic express settings **** //

var currentChannel = '';
var currentUserId = '';
var currentUserName = '';
var upvote = false;

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

async function createPostsTable() {
  // await connection.query('DROP TABLE IF EXISTS posts');
  connection.query(
    `CREATE TABLE IF NOT EXISTS posts
( id int unsigned NOT NULL auto_increment,
data varchar(400) NOT NULL,
username varchar(40) NOT NULL,
upvotes int,
downvotes int,
channelname varchar(40),
PRIMARY KEY (id)
)`,
    function (error, result) {}
  );
  console.log('made posts table');
  createRepliesTable();
}

async function createRepliesTable() {
  // await connection.query('DROP TABLE IF EXISTS replies');
  connection.query(
    `CREATE TABLE IF NOT EXISTS replies
( id int unsigned NOT NULL auto_increment,
data varchar(400) NOT NULL,
username varchar(40),
upvotes int,
downvotes int,
postid int NOT NULL,
channelname varchar(40),
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
      res.send('none');
    } else {
      res.send(results);
      console.log('User exists');
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

app.post('/createMessage', (req, res) => {
  const username = currentUserName;
  const data = req.body.data;
  const channelname = req.body.channelname;
  const upvotes = 0;
  const downvotes = 0;

  var query = `INSERT INTO posts (data, username, upvotes, downvotes, channelname) VALUES
('${data}', '${username}', '${upvotes}', '${downvotes}', '${currentChannel}')`;

  connection.query(query, function (error, result) {
    console.log(error);
  });
});

app.get('/getMessages', (req, res) => {
  // var channelname = req.body.channelname;

  // console.log('the channel: ' + channelname);
  var theQuery = `SELECT * FROM posts WHERE channelname = ?`;
  connection.query(theQuery, [currentChannel], function (err, result) {
    if (err) console.log(err);
    res.send(JSON.stringify(result));
  });
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
    res.send(JSON.stringify(result));
  });
});

app.post('/postReply', (req, res) => {
  var data = req.body.data;
  var username = currentUserName;
  var postid = req.body.postId;
  console.log('id: ' + postid);
  var channelname = req.body.currentChannel;
  var upvotes = 0;
  var downvotes = 0;

  var query = `INSERT INTO replies (data, username, upvotes, downvotes, postid, channelname) VALUES
  ('${data}', '${username}', '${upvotes}', '${downvotes}', '${postid}', '${currentChannel}')`;
  connection.query(query, function (error, result) {
    console.log(error);
  });
  console.log('created a new reply with ' + postid);
});
app.get('/getReplies', (req, res) => {
  // var postId = req.body.postId;
  const query = `
  SELECT * FROM replies WHERE channelname = ?;
`;

  connection.query(query, [currentChannel], (error, results) => {
    if (error) {
      console.error('Error getting replies:', error);
      return;
    }
    res.send(JSON.stringify(results));
  });
});

app.post('/setCurrentChannel', (req, res) => {
  console.log('got here');
  currentChannel = req.body.channelname;
  console.log('The current channel is now ' + req.body.channelname);
});

app.post('/storeUser', (req, res) => {
  currentUserId = req.body.userId;
  currentUserName = req.body.username;
  console.log('the current user is now ' + currentUserName);
});

app.post('/toggleUpVote', (req, res) => {
  var postid = req.body.postid;
  var type = req.body.type;
  var query;
  if (type === 'message') {
    query = `UPDATE posts SET upvotes = upvotes + 1 WHERE id = ?`;
  } else {
    query = `UPDATE replies SET upvotes = upvotes + 1 WHERE id = ?`;
  }

  connection.query(query, [postid], function (error, results, fields) {
    if (error) throw error;
    console.log('Upvote count updated successfully');
  });
});

app.post('/toggleDownVote', (req, res) => {
  var postid = req.body.postid;
  var type = req.body.type;
  var query;
  if (type === 'message') {
    query = `UPDATE posts SET downvotes = downvotes + 1 WHERE id = ?`;
  } else {
    query = `UPDATE replies SET downvotes = downvotes + 1 WHERE id = ?`;
  }

  connection.query(query, [postid], function (error, results, fields) {
    if (error) throw error;
    console.log('Downvote count updated successfully');
  });
});

app.post('/deleteUser', (req, res) => {
  var username = req.body.username;
  const query = `DELETE FROM users WHERE username = ?`;

  connection.query(query, [username], function (error, results, fields) {
    if (error) throw error;
    console.log('User deleted successfully');
  });
});

app.post('/deleteChannel', (req, res) => {
  var id = req.body.id;
  const query = `DELETE FROM channels WHERE id = ?`;

  connection.query(query, [id], function (error, results, fields) {
    if (error) throw error;
    console.log('Channel deleted successfully');
  });
});

app.post('/deleteMessage', (req, res) => {
  var id = req.body.id;
  const query = `DELETE FROM posts WHERE id = ?`;

  connection.query(query, [id], function (error, results, fields) {
    if (error) throw error;
    console.log('Message deleted successfully');
  });
});

app.post('/deleteReply', (req, res) => {
  var id = req.body.id;
  const query = `DELETE FROM replies WHERE id = ?`;

  connection.query(query, [id], function (error, results, fields) {
    if (error) throw error;
    console.log('Message deleted successfully');
  });
});

var theQuery = `SELECT * FROM users`;
connection.query(theQuery, function (err, result) {
  if (err) console.log(err);
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
