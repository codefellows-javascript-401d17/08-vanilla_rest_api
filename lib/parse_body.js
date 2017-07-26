'use strict';

module.exports = function(req) {
  return new Promise(function(resolve, reject) {
    console.log('request method', req.method);
    
    if(req.method === 'POST' || req.method === 'PUT') {
      resolve('POST or PUT request made');
    } else {
      reject('appropriate request not made');
    }
    resolve();
  })
}