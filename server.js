'use strict';

const http = require('http');
const Superhero = require('./model/superhero.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/superhero', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('superhero', req.url.query.id)
    .then( superhero => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.write(JSON.stringify(superhero));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('superhero not found');
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

router.post('/api/superhero', function(req, res) {
  try {
    var superhero = new Superhero(req.body.name, req.body.comicUni);
    storage.createItem('superhero', superhero);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(superhero));
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

router.delete('/api/superhero', function(req, res) {
  if (req.url.query.id) {
    storage.deleteItem('superhero', req.url.query.id)
    .then( superhero => {
      res.writeHead(204, {
        'Content-Type': 'application/json'
      });
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('superhero not found');
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

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('server up:', PORT);
});
