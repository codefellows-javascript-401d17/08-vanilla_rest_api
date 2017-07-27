'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Car Routes', function() {
  var car = null;

  describe('POST: /api/car', function() {
    it('should return a car', function(done) {
      request.post('localhost:8000/api/car')
      .send({make: 'test make', model: 'test model', year: 'test year'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.make).to.equal('test make');
        expect(res.body.model).to.equal('test model');
        expect(res.body.year).to.equal('test year');
        car = res.body;
        console.log('post 200');
        done();
      });
    });
    it('should return 400', function(done) {
      request.post('localhost:8000/api/car')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        console.log('post 400');
        done();
      });
    });
  });

  describe('GET: /api/car', function() {
    it('should return a car', function(done) {
      request.get(`localhost:8000/api/car?id=${car.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.make).to.equal('test make');
        expect(res.body.model).to.equal('test model');
        expect(res.body.year).to.equal('test year');
        console.log('get 200');
        done();
      });
    });
    it('should return 404', function(done) {
      request.get('localhost:8000/api/car?id=5432')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        console.log('get 404');
        done();
      });
    });
    it('should return 400', function(done) {
      request.get('localhost:8000/api/car?id=1')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        console.log('get 400');
        done();
      });
    });
  });
  // describe('DELETE: /api/car', function() {
  //   it('should return 204', function(done) {
  //     request.delete(`localhost:8000/api/car?id=${car.id}`)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(204);
  //       console.log('delete 204');
  //
  //       done();
  //     });
  //   });
  // });
});
