'use strict';

const http = require('http');
const Bake = require('./model/bake.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/bake', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('bake', req.url.query.id)
    .then( bake => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.write(JSON.stringify(bake));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });

      res.write('baked good not found');
      res.end();
    });

    return;
  }

  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });

  res.write('bad request');
  res.end();
});

router.post('/api/bake', function(req, res) {
  try {
    var bake = new Bake(req.body.bakedGood, req.body.description, req.body.calories);
    storage.createItem('bake', bake);

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.write(JSON.stringify(bake));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });

    res.write('bad request');
    res.end();
  }
});

router.delete('/api/bake', function(req, res) {
  if (req.url.query.id) {
    storage.deleteItem('bake', req.url.query.id)
    .then( () => {
      res.writeHead(204, { 'Content-Type': 'text/plain' });
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('bad request');
      res.end();
    });

    return;
  }

  res.writeHead(400, { 'Content-Type': 'text/plain' });
  res.write('bad request');
  res.end();
});


const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});