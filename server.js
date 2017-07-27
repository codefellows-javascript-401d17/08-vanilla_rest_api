'use strict';

const http =require('http');
const Hike = require('./model/hike.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/hike', function(req, res){
  if(req.url.query.id) {
    storage.fetchItem('hike', req.url.query.id)
    .then( hike => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });

      res.write(JSON.stringify(hike));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'plain/text'
      });
      res.write('hike not found!');
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

router.post('/api/hike', function(req, res){
  try{
    var hike = new Hike(req.body.name, req.body.distance, req.body.difficulty, req.body.description);
    storage.createItem('hike', hike);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(hike));
    res.end();
  } catch(err){
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/hike', function(req, res){
  if(req.url.query.id) {
    storage.deleteItem('hike', req.url.query.id)
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
      res.write('hike not found');
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

server.listen(PORT, () => {
  console.log('listening on PORT:', PORT);
});
