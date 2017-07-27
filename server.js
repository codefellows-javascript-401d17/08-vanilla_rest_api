'use strict';

const http = require('http');

const Note = require('./model/note.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');

const PORT = process.env.PORT || 3000;

const router = new Router();

router.get('/api/note', (req, res) => {
  if(req.url.query.id){
    storage.fetchItem('note', req.url.query.id)
    .then(note => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(JSON.stringify(note));
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('note not found');
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

router.post('/api/note', (req, res) => {
  try{
    let note = new Note(req.body.name, req.body.content);
    storage.createItem('note', note);
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.write(JSON.stringify(note));
    res.end();
  }catch(err){
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/note', (req, res) => {
  if(req.url.query.id){
    storage.fetchItem('note', req.url.query.id)
    .then(note => {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write('deleted note:', JSON.stringify(note));
      delete storage.storageAll[note];
      res.end();
    })
    .catch(err => {
      console.log(err);
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('note not found');
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

const server = http.createServer();

server.listen(PORT, () => {
  console.log('running on PORT:', PORT);
});
