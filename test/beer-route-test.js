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
        console.log('POST request beer:', res.body);
        beer = res.body;
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
        console.log('GET request beer:', res.body);
        done();
      });
    });
  });
});
