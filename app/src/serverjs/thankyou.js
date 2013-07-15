var http = require('http')
var url  = require('url')
var qs   = require('querystring')


function thankYou(res) {
   res.write('<html><head><title>Thank you!</title></head><body><br><br><center><h2>Thank you for submitting this post</h2></center></body></html')
}

function start(reqUrl, res) {
   console.log('query = "' + reqUrl.query + '"\n')
   
   console.log(qs.parse(reqUrl.query))


/* 
   console.log(
      'user send this data:' +
      '\nname:\t' + querystring(req.url)['name'] +
      '\ntitle:\t' + querystring(req.url)['title'] +
      '\ncomment:\t' + querystring(req.url)['comment'])
*/

   thankYou(res)
}

exports.start = start
