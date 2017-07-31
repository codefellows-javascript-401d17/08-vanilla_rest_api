'use strict';

const http = require('http');
const Car = require('./model/car.js');
const storage = require('./lib/storage.js');
const Router = require('./lib/router.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

router.get('/api/car', function(req, res) {
  if(req.url.query.id) {
    storage.fetchItem('car', req.url.query.id)
    .then(car => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(car));
      res.end();
    }).catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('item not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('Bad Request');
  res.end();
});

router.post('/api/car', function(req, res){
  try{
    var car = new Car(req.body.name, req.body.brand);
    storage.createItem('car', car);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(car));
    res.end();
  } catch(err) {
    console.error('server post', err);
    res.writeHead(400, {
      'Content-Type': 'plain/text'
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/car', function(req, res) {
  if(req.url.query.id) {
    storage.deleteItem('car', req.url.query.id)
    .then(car => {
      res.writeHead(204, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(car) + 'Delete');
      res.end();
    }).catch(err => {
      console.error(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('item not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'text/plain'
  });
  res.write('Bad Request');
  res.end();
});

const server = http.createServer(router.route());

server.listen(PORT, function(){
  console.log('Server ONLINE:', PORT);
});