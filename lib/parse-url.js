'use strict';

const parseQuery = require('querystring').parse;
const parseUrl = require('url').parse;

module.exports = function(req) {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);

  return Promise.resolve(req);
};
