'use strict'

const http = require('http');
const Person = require('./model/person.js');
const Router = rquire('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 5000;
const router = new Router();

const models = {
  person : Person
}

const modelRoutes = function(model) {
  router.get(`api/${model}`, function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem(`${model}`, req.url.query.id)
      .then( obj => {
        res.writeHead(200, {
          'Content-Type' : 'application/json'
        });

        res.write(JSON.stringify(obj));
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type' : 'text/plain'
        });
        res.write(`${model} not found`);
        res.end();

        return
      });

      res.writeHead(400, {
        'Content-Type' : 'text/plain' 
      });
      res.write('bad request');
      res.end();
    }
  });

  router.post(`/api/${model}`, function(req, res) {
    try {
      var newObj = new models[model](...req.body);
      storage.createItem(`${model}`, newObj);
      res.writeHead(200, {
        'Content-Type' : 'application/json'
      });
      res.write(JSON.stringify(newObj));
      res.end();
    } catch (err) {
      console.error(err);
      res.writeHead(400, {
        'Content-Type' : 'text/plain'
      });
      res.write('bad request');
      res.end();
    }
  });
}

modelRoutes('person');

const server = http.createServer(router.route());
  
server.listen(PORT, () => {
  console.log('server on at port:', PORT);
});