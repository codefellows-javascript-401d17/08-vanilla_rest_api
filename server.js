'use strict';

const http = require('http');
const Beer = require('./model/beer.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/beer', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('beer', req.url.query.id)
    .then( beer => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.write(JSON.stringify(beer));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('beer not found');
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

router.post('/api/beer', function(req, res) {
  try {
    var beer = new Beer(req.body.name, req.body.content);
    storage.createItem('beer', beer);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(beer));
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
