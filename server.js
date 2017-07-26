const http = require('http');
const PORT = process.env.PORT || 3000;
const Drone = require('./model/drone.js');
const parseBody = require('./lib/parse_body.js');

const server = http.createServer(function (req) {
  parseBody(req)
    .then(function (msg) {
      console.log(msg)
    })
    .catch(function (err) {
      console.error(err)
    });
});

server.listen(PORT, function () {
  console.log('server running on ', PORT);
});