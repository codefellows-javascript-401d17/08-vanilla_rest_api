'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('person Routes', function() {
  var person = null;

  describe('POST: /api/person', function() {
    it('should return a person', function(done) {
      request.post('localhost:3000/api/person')
      .send({ first: 'eddie', last: 'del rio', age: 28, job: 'bum' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.first).to.equal('eddie');
        expect(res.body.last).to.equal('del rio');
        expect(res.body.age).to.equal(28);
        expect(res.body.job).to.equal('bum');
        console.log('POST request person:', res.body);
        person = res.body;
        done();
      });
    });
  });
  describe('GET: /api/person', function() {
    it('should return a person', function(done) {
      request.get(`localhost:3000/api/person?id=${person.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.first).to.equal('eddie');
        expect(res.body.last).to.equal('del rio');
        expect(res.body.age).to.equal(28);
        expect(res.body.job).to.equal('bum');
        console.log('GET request person:', res.body);
        done();
      });
    });
  });
  describe('DELETE: /api/person', function() {
    it('should return a an empty object', function(done) {
      request.delete(`localhost:3000/api/person?id=${person.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(202);
        expect(res.body.first).to.equal(undefined);
        expect(res.body.last).to.equal(undefined);
        expect(res.body.age).to.equal(undefined);
        expect(res.body.job).to.equal(undefined);
        console.log('DELETE request person:', res.body);
        done();
      });
    });
  });
});
