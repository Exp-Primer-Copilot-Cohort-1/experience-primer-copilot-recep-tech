// Create web server
// 1. Load the http module
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

// 2. Create an HTTP server to handle responses
http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  console.log("Request for " + pathname + " received.");

  // 3. Read the requested file content from file system
  fs.readFile(pathname.substr(1), function (err, data) {
    if (err) {
      console.log(err);
      // HTTP Status: 404 : NOT FOUND
      // Content Type: text/plain
      res.writeHead(404, {'Content-Type': 'text/html'});
    } else {
      // Page found
      // HTTP Status: 200 : OK
      // Content Type: text/plain
      res.writeHead(200, {'Content-Type': 'text/html'});

      // Write the content of the file to response body
      res.write(data.toString());
    }
    // Send the response body
    res.end();
  });
}).listen(8080);

console.log('Server running at http://