
var fs, path, express, invocation, Mongoose, server, pkg_specs, port;

fs = require('fs');
path = require('path');
express = require('express');
invocation = require('commander');
Mongoose = require('mongoose');

server = express.createServer();

/*************************\
* Middleware Configuration
\*************************/

server.configure(function() {
  server.use(express.logger('tiny'));
  server.use(express.bodyParser());
  server.use(server.router);
  server.use(express['static'](path.resolve(__dirname, '../static')));
});

server.configure('development', function() {
  server.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

/****************\
* Database config
\****************/

Mongoose.connect('mongodb://localhost/emails');
require('./models').define(server);

/************\
* Controllers
\************/

server.post('/learnmore', function(req, res) {
  var EmailSignup, signup;

  EmailSignup = Mongoose.model('EmailSignup');
  signup = new EmailSignup({
    email: req.param('email')
  });

  signup.save(function(err, saved) {
    if (err) console.warn('EMAIL signup saving failed: ' + req.param('email'));
    res.redirect('/');
  });

});

/******************\
* Command line args
\******************/

pkg_specs = JSON.parse( fs.readFileSync( path.resolve(__dirname, '../package.json') ) );

invocation.version(pkg_specs.version)
          .option('-p --port [port]', 'listening port for connections')
          .parse(process.argv);

/********\
* Listen
\********/

port = invocation.port || process.env.PORT || 8080;

server.listen(port, function() {
  console.info('Server running at ' + port);
});
