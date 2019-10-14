
const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();
server.on('request', (req, res) => {
    
  const pathname = url.parse(req.url).pathname.slice(1);
  const filePath = path.join(__dirname, 'files', pathname);
  
  if (pathname.includes('/') || pathname.includes('..')) {
    res.statusCode = 400;
    res.end('Nested paths are not allowed');
  }

  switch (req.method) {
    case 'DELETE':
      if( !filePath ) {
        res.statusCode = 404;
        res.end('file not found')
      } else {
        fs.unlink(filePath, (error) => {
            if(error){
                res.statusCode = 404;
                res.end('file not found');
            } else {
                res.statusCode = 200;
                res.end('success');
            }
        });
      }
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;