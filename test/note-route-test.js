'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Song Routes', function() {
  var song = null;

  describe('POST: /api/song', function() {
    it('should return a song', function(done) {
      request.post('localhost:8000/api/song')
      .send({name: 'test name', band: 'test band', year: 'test year'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.band).to.equal('test band');
        expect(res.body.year).to.equal('test year');
        song = res.body;
        done();
      });
    });

    it('should return bad request', function(done) {
      request.post('localhost:8000/api/song')
      .send({album: 'test album', money: 'easy money'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  describe('GET: api/song', function() {
    it('should return a song', function(done) {
      request.get(`localhost:8000/api/song?id=${song.id}`)
      .end(function(err, res){
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.band).to.equal('test band');
        expect(res.body.year).to.equal('test year');
        done();
      });
    });

    it('should return song not found', function(done) {
      request.get('localhost:8000/api/song?id=12345')
      .end(function(err, res){
        expect(res.status).to.equal(404);
        expect(res.text).to.equal('song not found');
        done();
      });
    });

    it('should return bad request', function(done) {
      request.get('localhost:8000/api/song?=12345')
      .end(function(err, res){
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });
});
