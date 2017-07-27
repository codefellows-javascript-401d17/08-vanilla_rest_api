'use strict';

module = function(req) {
  return new Promise((res, rej) => {
    if(req.method === 'POST' || req.method === 'PUT') {
      var body = '';

      req.on('data', data => {
        body += data.toString();
        console.log(body)
      });

      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          resolve(req);
        } catch (err) {
          console.error(err);
          reject(err);
        }
      });

      req.on('error', err => {
        console.error(err);
        reject(err);
      });

      return
    }

    resolve();
  });
}