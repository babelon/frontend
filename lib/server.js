
var fs, path, express, invocation, server, pkg_specs, port;

fs = require('fs');
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

pkg_specs = JSON.parse( fs.readFileSync( path.resolve(__dirname, '../package.json') ) );

// Command line args
invocation.version(pkg_specs.version)
          .option('-p --port [port]', 'listening port for connections')
          .parse(process.argv);

port = invocation.port || process.env.PORT || 8080;

server.listen(port, function() {
  console.info('Server running at ' + port);
});
