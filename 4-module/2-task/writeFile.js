const fs = require('fs');
const LimitSizeStream = require('./LimitSizeStream');

module.exports = function writeFile( filepath, req, res ){

    const maxStream = new LimitSizeStream({limit : 1e6});
    const saveStream = fs.createWriteStream(filepath, {flags: 'wx'});

    req
        .pipe(maxStream)
        .pipe(saveStream);

    
    maxStream.on('error', (error) => {
        if (error.code === 'LIMIT_EXCEEDED') {
            res.statusCode = 413;
            res.end('File is too big');
        } else {
            res.statusCode = 500;
            res.end('Internal server error');
        }
        fs.unlink(filepath, (err) => {});
    });

    saveStream.on('error', (error) => {
        if (error.code === 'EEXIST') {
            res.statusCode = 409;
            res.end('File exists');
        } else {
            res.statusCode = 500;
            res.end('Internal server error');
            fs.unlink(filepath, (error) => {});
        }
    }).on('close', () => {
        res.statusCode = 201;
        res.end('file has been saved');
    });

    res.on('close', () => {
        if (res.finished) return;
        fs.unlink(filepath, (error) => {});
    });
}