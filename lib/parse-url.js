'use strict';

const parseUrl = require('url').parse;
const parseQuery = require('querystring').parse;

module.exports = (req) => {
  req.url = parseUrl(req.url);
  req.url.query = parseQuery(req.url.query);
  return Promise.resolve(req);
};
