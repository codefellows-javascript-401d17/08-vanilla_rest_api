'use strict'

const http = require('http');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const Person = require('./model/person.js');
const Car = require('./model/car.js');
const Dog = require('./model/dog.js')
const PORT = process.env.PORT || 5000;
const router = new Router();

const models = {
  person : Person,
  car: Car,
  dog: Dog
}

const modelAllRoutes = function(model) {
  modelGet(model);
  modelPost(model);
  modelDelete(model);
}

const modelGet = function(model) {
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
        res.write(`${model} not found`);
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
};

const modelPost = function(model) {
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
}

const modelDelete = function(model) {

  router.delete(`/api/${model}`, function(req, res) {
    if (req.url.query.id) {
      storage.deleteItem(`${model}`, req.url.query.id)
      .then( person => {
        res.writeHead(202, {
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
        res.write(`${model} not found`);
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

modelAllRoutes('person');
modelAllRoutes('car');
modelAllRoutes('dog')

const server = http.createServer(router.route());
  
server.listen(PORT, () => {
  console.log('server on at port:', PORT);
});