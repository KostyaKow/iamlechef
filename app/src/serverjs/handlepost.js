var http = require('http')
var qs   = require('querystring')

var db   = require('./db')

function start(queryData, res) {
   var parsed = qs.parse(queryData)
   
   if (parsed['action'] == 'register')
      db.addUser(parsed['usrname'], parsed['passwd'])

   if (parsed['action'] == 'submit') {
      if (parsed['passwd'] != db.getPasswd(parsed['usrname']))
         console.log('wrong password; cannot post the comment')
      else
         db.postComment(parsed['title'], parsed['comment'], parsed['usrname'])
   }
   //res.write()
}

exports.start = start
