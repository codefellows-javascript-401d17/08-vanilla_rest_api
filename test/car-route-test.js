'use strict';

const expect = require('chai').expect;
const request = require('superagent');

require('../server.js');

describe('Car Routes', function() {
  var car = null;

 describe('POST: /api/car', function() {
    it('should return a car', function(done) {
      request.post('localhost:3000/api/car')
      .send({name: 'test name', brand: 'test brand'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.brand).to.equal('test brand');
        car = res.body;
        done();
      });
    });
  });

  describe('POST: /api/car', function() {
    it('should return 400', function(done) {
      request.post('localhost:3000/api/car')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/car', function() {
    it('should return 400 bad request', function(done) {
      request.get('localhost:3000/api/car?id=')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });

    it('should return 404', function(done) {
      request.get('localhost:3000/api/car?id=5432')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        console.log('get 404');
        done();
      });
    });
  });
});