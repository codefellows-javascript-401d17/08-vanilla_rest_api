'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const PORT = process.env.PORT || 3000;

require('../server.js');

describe('Superhero Routes', function() {
  var superhero = null;

  describe('POST: /api/superhero', function() {
    it('should return a superhero', function(done) {
      request.post(`${PORT}/api/superhero`)
      .send({name: 'test name', comicUni: 'test comic universe'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.comicUni).to.equal('test comic universe');
        console.log('POST request superhero:', res.body);
        superhero = res.body;
        done();
      });
    });
  });

  describe('POST: /api/superhero', function() {
    it('should return a bad request', function(done) {
      request.post(`${PORT}/api/somefakepath`)
      .send({name: 'test name', comicUni: 'test comic universe'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.name).to.equal('test name');
        expect(res.body.comicUni).to.equal('test comic universe');
        console.log('POST request superhero:', res.body);
        superhero = res.body;
        done();
      });
    });
  });

  describe('GET: /api/superhero', function() {
    it('should return a superhero', function(done) {
      request.get(`${PORT}/api/superhero?id=${superhero.id}`)
     .end((err, res) => {
       if (err) return done(err);
       expect(res.status).to.equal(200);
       expect(res.body.name).to.equal('test name');
       expect(res.body.content).to.equal('test comicUni');
       console.log('GET request superhero:', res.body);
       done();
     });
    });
  });

  describe('GET: /api/superhero', function() {
    it('should return a bad request', function(done) {
      request.get(`${PORT}/api/superhero?id=${superhero.id}`)
     .end((err, res) => {
       if (err) return done(err);
       expect(res.status).to.equal(400);
       expect(res.body.name).to.equal('');
       expect(res.body.content).to.equal('');
       console.log('GET request note:', res.body);
       done();
     });
    });
  });

  describe('GET: /api/superhero', function() {
    it('should return with superhero not found', function(done) {
      request.get(`${PORT}/api/superhero?id=${fakeid.id}`)
     .end((err, res) => {
       if (err) return done(err);
       expect(res.status).to.equal(404);
       expect(res.body.name).to.equal('test name');
       expect(res.body.content).to.equal('test comicUni');
       console.log('GET request note:', res.body);
       done();
     });
    });
  });
});
