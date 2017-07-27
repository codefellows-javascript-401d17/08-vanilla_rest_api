'use strict';

const url = require('url').parse;
const query = require('querystring').parse;

module.exports = exports = {};

exports.parseUrl = req => {
  req.url = url(req.url);
  req.url.query = query(req.url.query);
  return Promise.resolve(req);
};

exports.parseJson = req => {
  return new Promise((result, reject) => {
    if(req.method === 'POST' || req.method === 'PUT'){
      let body = null;

      req.on('data', data => {
        body += data.toString();
      });

      req.on('end', () => {
        try{
          req.body = JSON.parse(body);
          result(req);
        }catch(err){
          console.error(err);
          result(err);
        }
      });

      req.on('error', err => {
        console.log(err);
        reject(err);
      });
      return;
    }
    result();
  });
};
