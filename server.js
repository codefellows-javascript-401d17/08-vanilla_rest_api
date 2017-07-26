const http = require('http');
const PORT = process.env.PORT || 3000;
const Drone = require('./model/drone.js');

const server = http.createServer()

const phantom = new Drone('phantom', 4);
console.log(phantom);

server.listen(PORT, function() {
  console.log('server running on ', PORT);
})