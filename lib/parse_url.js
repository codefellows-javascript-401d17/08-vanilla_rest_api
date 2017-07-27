'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  //parses the query string (str) into an object collection of key and value pairs, parses url into a url object also key value
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  return Promise.resolve(req);
}
