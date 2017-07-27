'use strict';

const url = require('url');
const queryString = require('querystring');

module.exports = parseUrl;

function parseUrl(request) {
  request.url = url.parse(request.url);
  request.url.query = queryString.parse(request.url.query);

  return Promise.resolve(request);
}