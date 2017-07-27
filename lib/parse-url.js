'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = function(req) {
  console.log('req:', req);
  req.url = parseUrl(req.url);
  console.log('req.url:', req.url);
  req.url.query = parseQuery(req.url.query);

  return Promise.resolve(req);
};