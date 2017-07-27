'use strict';

const parseUrl = require('url').parse;
const queryString = require('querystring').parse;

module.exports = function(req) {
  req.url = parseUrl(req.url);
  req.url.query = queryString(req.url.query);
  return Promise.resolve(req);
}