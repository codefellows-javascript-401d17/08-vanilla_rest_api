'use strict';

const request = require('superagent');
const expect = require('chai').expect;
require('../server.js');

before(function () {
  request.post('localhost:8000/api/drone')
    .send({ model: 'Phantom VI', rotors: 9 });
})

describe('Drone Routes', function () {
  var drone = null; //initialize drone for tests
  describe('POST: /api/drone', function () {
    it('should return a drone', function (done) {
      request.post('localhost:8000/api/drone')
        .send({ model: 'Phantom III', rotors: 3 })
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.model).to.equal('Phantom III');
          expect(res.body.rotors).to.equal(3);
          drone = res.body; //drone is set here so that GET request below can reference it
          done();
        });
    });
  });
  describe('GET /api/drone', function () {
    it('should return a drone', function (done) {
      request.get(`localhost:8000/api/drone?id=${drone.id}`)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.model).to.equal('Phantom III');
          expect(res.body.rotors).to.equal(3);
          done();
        });
    });
  });
  describe('DELETE /api/drone', function () {
    it('should delete a drone', function (done) {
      request.delete(`localhost:8000/api/drone?id=${drone.id}`)
        .end(function (err, res) {
          if (err) return done(err);
          expect(res.status).to.equal(204);
          expect(res.body).to.be.empty;
          done();
        });
    });
  });
});