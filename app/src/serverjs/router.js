var http = require('http')
var url  = require('url')
var qs   = require('querystring')

var handlePost   = require('./handlepost')
var thankyouPage = require('./thankyou')

function checkIfPost(req, res) {
   var queryData = '';
   req.on(
      'data',
      function(data) {
         queryData += data
         if(queryData.length > 1e6) {
            queryData = ""
            response.writeHead(413, {'Content-Type': 'text/plain'}).end()
            request.connection.destroy()
         }
      }
         )

   req.on(
      'end',
      function() { 
         handlePost.start(queryData, res) 
         console.log('---RECEIVED A POST REQUEST: ' + queryData + '----')
      }
         )
      
}

function handleReq(req, res) {
   if (req.method == 'POST')
      handlePost(req, res)
      return
   }

   var reqUrl = url.parse(req.url)
   var path = reqUrl.pathname;
  
   console.log('handling request for: ' + path) 
   
   if (path == '/user/register') 
      registerPage.start(res)
   else if (path == '/submit')
      thankyouPage.start(reqUrl, res)

}


exports.handle = handleReq
