const http = require('http');
const app = require('./app')


const port = process.env.PORT || 5000;


const server = http.createServer(app);

server.listen(port, (err) =>
  err
    ? console.log("Filed to Listen on Port", port)
    : console.log("Listing for Port", port)
);