const url = require('url');
const http = require('http');
const path = require('path');

const writeFile = require('./writeFile');

const server = new http.Server();
server.on('request', (req, res) => {

    const pathname = url.parse(req.url).pathname.slice(1);
    const filePath = path.join(__dirname, 'files', pathname);
    
    const urlArr = req.url.split('/');
    
    if( urlArr.length > 2 ) {
        res.statusCode = 400;
        res.end('Unknown request');
    } 

    switch (req.method) {
        case 'POST':
            if( !filePath ) {
                res.statusCode = 404;
                res.end('file not found')
            }
            writeFile(filePath, req, res);
            break;
        default:
            res.statusCode = 501;
            res.end('Not implemented');
    }
});

module.exports = server;