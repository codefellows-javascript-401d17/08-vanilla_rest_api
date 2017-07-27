'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('person Routes', function() {
  var person = null;

  describe('POST: /api/note', function() {
    it('should return a person', function(done) {
      request.post('localhost:3000/api/person')
      .send({ first: 'eddie', last: 'del rio', age: 28, job: 'bum' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.first).to.equal('eddie');
        expect(res.body.last).to.equal('del rio');
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
        expect(res.body.last).to.equal('delrio');
        console.log('GET request person:', res.body);
        done();
      });
    });
  });
});
