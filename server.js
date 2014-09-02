// Logger
var log = require('debug')('naxmeify');

//Requirements
var express = require('express');
var sysPath = require('path');
var morgan  = require('morgan');
var livereload = require('express-livereload');

// Port
var port = process.env.PORT || 3000;

// Public Path
var path = __dirname;

var server = express();
livereload(server, {
  watchDir: __dirname
});
server.use(function (request, response, next) {
  response.header('X-Accept-Language', request.headers['accept-language']);
  next();
});
server.use(express.static(path));
server.use(morgan('dev'));
server.all('/*', function (request, response) {
  response.sendFile(sysPath.join(path, 'index.html'));
});
server.listen(port);
log('listening on ' + port);