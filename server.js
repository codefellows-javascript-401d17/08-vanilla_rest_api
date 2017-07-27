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
    var hike = new Hike(req.body.name, req.body.content);
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
  if(!req.url.query.id){
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request, need a query url');
    res.end();
  }
  if(!server.storage[req.url.query.id]) {
    res.writeHead(404, {
      'Content-Type' : 'text/plain'
    });
    res.write(`Hike ${req.url.query.id} not found`);
    res.end();
  }
  delete server.storage[req.url.query.id];
  res.writeHead(204, {
    'Content-Type': 'plain/text'
  });
  res.write(`hike ${req.url.query.id} deleted`);
  res.end();
});

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log('listening on PORT:', PORT);
});
