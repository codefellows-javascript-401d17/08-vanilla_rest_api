'use strict';

module.exports = Router;

function Router() {
  this.routes = {
    GET: {},
    PUT: {},
    POST: {},
    DELETE: {}
  };

  this.middleware = [];
}

Router.prototype.handleGet = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.handlePut = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.handlePost = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.handleDelete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.addMiddleware = function(promise) {
  this.middleware.push(promise);
};

Router.prototype.route = function(request, response) {
  Promise.all(this.middleware)
    .then(() => {
      let endpoint = request.url.pathname;
      let method = request.method;

      let callback = this.routes[method][endpoint];

      if (callback) {
        callback(request, response);
        return;
      }

      response.writeHead(404, {
        'Content-Type': 'text/plain'
      });

      response.write('Route not found.');
      response.end();
    });
};