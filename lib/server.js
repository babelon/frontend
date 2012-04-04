
var path, express, invocation, server, port;

path = require('path');
express = require('express');
invocation = require('commander');

server = express.createServer();

server.configure(function() {
  server.use(express.logger('tiny'));
  server.use(server.router);
  server.use(express['static'](path.resolve(__dirname, '../static')));
});

server.configure('development', function() {
  server.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }))
});

// Command line args
invocation.version('0.0.1-alpha')
          .option('-p --port [port]', 'Port to listen on for connections')
          .parse(process.argv);

port = invocation.port || process.env.PORT || 8080;

server.listen(port, function() {
  console.info('Server running at ' + port);
});
