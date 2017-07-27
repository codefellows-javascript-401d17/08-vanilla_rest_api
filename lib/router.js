const parseBody = require('./parse_body');
const parseUrl = require('./parse_url');

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

Router.prototype.delete = function (endpint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function () {
  return function (req, rsp) {
    Promise.all([
      parseBody(req),
      parseUrl(req)
    ]).then(function () {
      //if there's a function
      if (this[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, rsp);
        return;
      }
      console.error('not found');
      rsp.writeHead('400', {
        'Content-Type': 'text-plain'
      });
      rsp.write('bad request');
      rsp.end();
    });
  };
};