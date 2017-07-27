const http = require('http');
const PORT = process.env.PORT || 3000;
const Drone = require('./model/drone.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const parseBody = require('./lib/parse_body.js');
const router = new Router();

router.get('/api/drone', function (req, rsp) {
  if (req.url.query.id) {
    storage.fetchItem('drone', req.url.query.id) //returns promise
      .then(function (drone) {
        rsp.writeHead(200, {
          'Content-Type': 'application/json'
        });
        rsp.write(JSON.stringify(drone));
        rsp.end();
      })
      .catch(function (err) {
        console.error(err);
        rsp.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        rsp.write('bad request');
        rsp.end();
      });
    return;  //TODO: why this here?
  }
  if (!req.url.query.id) {
    storage.fetchAllItems('drone')
      .then(function (drones) {
        console.log('line 32', drones);
        rsp.writeHead(200);
        rsp.write(JSON.stringify(drones));
        rsp.end();
      })
      .catch(function (err) {
        console.error(err);
        rsp.writeHead(404);
        rsp.end();
      });
    return;
  }
  rsp.writeHead(400, {
    'Content-type': 'text/plain'
  })
  rsp.write('bad request');
  rsp.end();
})

router.post('/api/drone', function (req, rsp) {
  try {
    var drone = new Drone(req.body.model, req.body.rotors);
    storage.createItem('drone', drone);
    rsp.writeHead(200, {
      'Content-Type': 'application/json'
    });
    rsp.write(JSON.stringify(drone));
    rsp.end();
  } catch (err) {
    console.error(err);
    rsp.writeHead(400, {
      'Content-Type': 'text/plain'
    })
    rsp.write('drone not found request');
    rsp.end();
  }
});

router.delete('/api/drone', function (req, rsp) {
  if (req.url.query.id) {
    storage.deleteItem('drone', req.url.query.id)
      .then(() => {
        rsp.writeHead(204);
        rsp.end();
      })
      .catch(function (err) {
        console.error(err);
        rsp.writeHead(400);
        rsp.write('drone not found');
        rsp.end();
      });
  }
})

const server = http.createServer(router.route()); //returns function w/ req, rsp

server.listen(PORT, function () {
  console.log('server running on ', PORT);
});