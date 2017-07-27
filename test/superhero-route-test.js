'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const PORT = process.env.PORT || 3000;

require('../server.js');

describe('Superhero Routes', function() {
  var superhero = null;

  describe('POST: /api/superhero', function() {
    it('should return a superhero', function(done) {
      request.post(`localhost:${PORT}/api/superhero`)
      .send({name: 'name', comicUni: 'comicUni'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('name');
        expect(res.body.comicUni).to.equal('comicUni');
        superhero = res.body;
        done();
      });
    });

    it('should return a bad request', function(done) {
      request.post(`localhost:${PORT}/api/superhero`)
      .send({viewers: '10000', conceptArt: 'comic art'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  describe('GET: /api/superhero', function() {
    it('should return a superhero', function(done) {
      request.get(`localhost:${PORT}/api/superhero?id=${superhero.id}`)
     .end((err, res) => {
       if (err) return done(err);
       expect(res.status).to.equal(200);
       expect(res.body.name).to.equal('name');
       expect(res.body.comicUni).to.equal('comicUni');
       done();
     });
    });

    it('should return a bad request', function(done) {
      request.get(`localhost:${PORT}/api/superhero`)
     .end((err, res) => {
       expect(res.status).to.equal(400);
       expect(res.text).to.equal('bad request');
       done();
     });
    });
  });

  it('should return with superhero not found', function(done) {
    request.get(`localhost:${PORT}/api/superhero?id=12345`)
   .end((err, res) => {
     expect(res.status).to.equal(404);
     expect(res.text).to.equal('superhero not found');
     done();
   });
  });
});
