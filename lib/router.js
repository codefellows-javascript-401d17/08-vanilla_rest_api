'use strict';

const parseBody = require('./parse_body.js');
const parseUrl = require('./parse_url.js');

const Router = module.exports = function () {
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

Router.prototype.get = function (endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function (endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function (endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function (endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function () {
  return (req, rsp) => { //TODO: why are lexical arrow functions necessary here?
    Promise.all([
      parseBody(req),
      parseUrl(req)
    ])
      .then(() => {
        //if there's a function
        if (typeof this.routes[req.method][req.url.pathname] === 'function') {
          this.routes[req.method][req.url.pathname](req, rsp);
          return;
        }
        console.error('not found');
        rsp.writeHead('400', {
          'Content-Type': 'text-plain'
        });
        rsp.write('bad request');
        rsp.end();
      }).catch(function (err) {
        console.error(err);
        rsp.writeHead(400, {
          'Content-Type': 'text-plain'
        });
        rsp.write('bad request');
        rsp.end();
      });
  };
};