'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Beer Routes', function() {
  var beer = null;

  describe('POST: /api/beer', function() {
    it('should return a beer', function(done) {
      request.post('localhost:8000/api/beer')
      .send({ name: 'test name', style: 'test style', IBU: 'test IBU' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.style).to.equal('test style');
        expect(res.body.IBU).to.equal('test IBU');
        beer = res.body;
        done();
      });
    });
  });

  describe('POST: /api/beer', function() {
    it('should return 400', function(done) {
      request.post('localhost:8000/api/beer')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('GET: /api/beer', function() {
    it('should return a beer', function(done) {
      request.get(`localhost:8000/api/beer?id=${beer.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.style).to.equal('test style');
        expect(res.body.IBU).to.equal('test IBU');
        done();
      });
    });
  });

  describe('GET: /api/beer', function() {
    it('should return 404 not found', function(done) {
      request.get('localhost:8000/api/beer?id=6194fa11-758f-477f-a597-61a5a8ca65cb')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('GET: /api/beer', function() {
    it('should return 400 bad request', function(done) {
      request.get('localhost:8000/api/beer?id=')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  describe('DELETE: /api/beer', function() {
    it('should return 204', function(done) {
      request.delete(`localhost:8000/api/beer?id=${beer.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
  });
});
