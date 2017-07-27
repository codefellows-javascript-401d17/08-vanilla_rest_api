'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const PORT = process.env.PORT || 3000;

require('../server.js');

describe('Car Routes', function() {
  var car = null;

  describe('POST: /api/car', function() {
    it('should return a car', function(done) {
      request.post(`localhost:${PORT}/api/note`)
      .send({make: 'test make', model: 'test model', year: 'test year'})
    })
  })
})
