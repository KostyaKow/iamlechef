var http    = require('http')

var router  = require('./router')
var db      = require('./db')

db.init()

var i = 1

var server = http.createServer(function (req, res) {
      console.log('\n\n\nhandling request #' + i++)

      res.writeHead(200, {'Content-Type' : 'text/html'})

      router.handle(req, res) 

      res.end()
   })

console.log('starting server')
server.listen(8888)
