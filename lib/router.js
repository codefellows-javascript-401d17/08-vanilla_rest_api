'use strict';

const parser = require('./parser.js');

const Router = module.exports = function(){
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {}
  };
};

Router.prototype.get = function(endpoint, callback){
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback){
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback){
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback){
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = () => {
  return(req, res) => {
    Promise.all([
      parser.parseUrl(req),
      parser.parseJson(req)
    ])
    .then(() => {
      if(typeof this.routes[req.method][req.url.pathname] === 'function'){
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }
      console.error('cannot find route');
      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      res.write('cannot find route');
      res.end();
    })
    .catch(err => {
      console.log(err);
      // QUESTION: why not console.error(err);
      res.writeHead(400, {
        'Content-Type': 'text/plain'
      });
      res.write('bad request');
      res.end();
    });
  };
};
