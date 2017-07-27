'use strict'

const http = require('http');
const Person = require('./model/person.js');
// const Car = require('./model/car.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 5000;
const router = new Router();

const models = {
  person : Person
  // car: Car
}

const modelRoutes = function(model) {

  router.get(`/api/${model}`, function(req, res) {
    if (req.url.query.id) {
      storage.fetchItem(`${model}`, req.url.query.id)
      .then( person => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });

        res.write(JSON.stringify(person));
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write('note not found');
        res.end();
      });

      return;
    };

    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  });

  router.post(`/api/${model}`, function(req, res) {
    try {
      let params = [];
      for(let key in req.body) {
        params.push(req.body[key]);
      }
      var newObj = new models[model](...params);
      console.log(newObj)
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

  router.delete(`/api/${model}`, function(req, res) {
    if (req.url.query.id) {
      storage.deleteItem(`${model}`, req.url.query.id)
      .then( person => {
        res.writeHead(200, {
          'Content-Type': 'application/json'
        });

        res.write(JSON.stringify(person));
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write('note not found');
        res.end();
      });

      return;
    };

    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  });

}

modelRoutes('person');
// modelRoutes('car');

const server = http.createServer(router.route());
  
server.listen(PORT, () => {
  console.log('server on at port:', PORT);
});