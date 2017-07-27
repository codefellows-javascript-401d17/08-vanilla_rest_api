'use strict';

const http = require('http');
const Song = require('./model/song.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/song', function(req, res) {
  if(req.url.query.id) {
    storage.fetchItem('song', req.url.query.id)
    .then( song => {
      res.writeHead(200, {
        'Content-type': 'application/json'
      });
      res.write(JSON.stringify(song));
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-type': 'text/plain'
      });
      res.write('song not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-type': 'text/plain'
  });
  res.write('bad request');
  res.end();
});

router.post('/api/song', function(req, res){
  try {
    var song = new Song(req.body.name, req.body.band, req.body.year);
    storage.createItem('song', song);
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.write(JSON.stringify(song));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('api/song', function(req, res) {
  if(req.url.query.id) {
    storage.deleteItem('song', req.url.query.id)
    .then( () => {
      res.writeHead(204, {
        'Content-type': 'text/plain'
      });
      res.end();
    })
    .catch( err => {
      console.error(err);
      res.writeHead(404, {
        'Content-type': 'text/plain'
      });
      res.write('song not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-type': 'text/plain'
  });
  res.write('bad request');
  res.end();
});

const server = http.createServer(router.route());

server.listen(PORT, function() {
  console.log('listening on:', PORT);
});
