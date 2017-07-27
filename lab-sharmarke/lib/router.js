'use strict';

const parseUrl = require('.parse-url.js');
const parseJSON = require('./parse-json.js');

const Router = module.exports = function() {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, cb) {
  this.routes.GET[endpoint] = cb;
};

Router.prototype.post = function(endpoint, cb) {
  this.routes.POST[endpoint] = cb;
};

Router.prototype.put = function(endpoint, cb) {
  this.routes.PUT[endpoint] = cb;
};

Router.prototype.delete = function(endpoint, cb) {
  this.routes.DELETE[endpoint] = cb;
};

Router.prototype.routes = function() {
  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseJSON(req)
    ])
    .then( () => {
      if (typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname] (req, res);
        return;
      }

      console.error('route not found');

      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });

      res.write('route not found');
      res.end();
    })
    .catch(err => {
      console.error(err);

      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });

      res.write('bad request');
      res.end();
    })
  }
}
