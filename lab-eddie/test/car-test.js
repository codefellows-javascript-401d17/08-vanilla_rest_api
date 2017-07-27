'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('car Routes', function() {
  var car = null;

  describe('POST: /api/car', function() {
    it('should return a car', function(done) {
      request.post('localhost:3000/api/car')
      .send({ make: 'Toyota', model: '4runner', year: 1987, color: 'black' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.make).to.equal('Toyota');
        expect(res.body.model).to.equal('4runner');
        expect(res.body.color).to.equal('black');
        expect(res.body.year).to.equal(1987);
        console.log('POST request car:', res.body);
        car = res.body;
        done();
      });
    });
  });
  describe('GET: /api/car', function() {
    it('should return a car', function(done) {
      request.get(`localhost:3000/api/car?id=${car.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.make).to.equal('Toyota');
        expect(res.body.model).to.equal('4runner');
        expect(res.body.year).to.equal(1987);
        expect(res.body.color).to.equal('black');
        console.log('GET request car:', res.body);
        done();
      });
    });
  });
  describe('DELETE: /api/car', function() {
    it('should return a an empty object', function(done) {
      request.delete(`localhost:3000/api/car?id=${car.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(202);
        expect(res.body.make).to.equal(undefined);
        expect(res.body.model).to.equal(undefined);
        expect(res.body.year).to.equal(undefined);
        expect(res.body.color).to.equal(undefined);
        console.log('DELETE request car:', res.body);
        done();
      });
    });
  });
});
