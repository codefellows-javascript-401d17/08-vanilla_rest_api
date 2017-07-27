'use strict';

const http = require('http');
const Pokemon = require('./model/pokemon.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/pokemon', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('pokemon', req.url.query.id)
    .then( pokemon => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.write(JSON.stringify(pokemon));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('pokemon not found');
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

router.post('/api/pokemon', function(req, res) {
  try {
    var pokemon = new Pokemon(req.body.name, req.body.type, req.body.gen);
    storage.createItem('pokemon', pokemon);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(pokemon));
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

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server up:', PORT);
});