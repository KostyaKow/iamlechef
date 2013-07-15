var pg = require('pg') //postgres

var client, query;

function init() {
   // pstgres://username:password@localhost:5432/dbname
   client = new pg.Client('postgres://kkostya:pass@localhost:5432/kkostya')
   client.connect()
}

function stop() {
   client.end.bind(client) 
}

function initDb() { //initialize db for the first time
   client.query('CREATE TABLE users (name varchar(30), passwd varchar(50), date date, upvotes int, downvotes int)')
   client.query('CREATE TABLE posts (title varchar(150), comment varchar(1000), upvotes int, downvotes int, poster varchar(30), date date)')
}

function usrExists(usrname) {
   query = client.query('SELECT name FROM users WHERE name = "$1"', [usrname])
   if (query.rows.length != 0)
     return true;
   console.log('user ' + usrname + ' does not exist')
   return false;
}

//TODO: output an error through HTML
function addUser(usrname, passwd) {
   if (!usrExists(usrname))
      client.query('INSERT INTO users VALUES ($1, $2, NOW(), 0, 0)', [usrname, passwd])
   else
      console.log('error: trying to add an existing user')
}

function getPasswd(usrname) {
   if (!usrExists(usrname))
      query = client.query('SELECT passwd FROM users WHERE name = "$1"', [usrname])
   else
      console.log('cannot return password for non-existing user')

   return query.rows[0]
}

function postComment(title, comment, poster) {
   client.query('INSERT INTO posts VALUES ($1, $2, 0, 0, $3, NOW())', [title, comment, poster])
}

//init()
//addUser('kostya', 'mypassword')
//addUser('testUser', 'testUser')
//console.log('\n---\n')
//stop()

exports.init        = init
exports.stop        = stop
exports.initDb      = initDb
exports.usrExists   = usrExists
exports.addUser     = addUser
exports.getPasswd   = getPasswd
exports.postComment = postComment
