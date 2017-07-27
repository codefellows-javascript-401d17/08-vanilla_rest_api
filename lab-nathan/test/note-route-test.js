'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Note Routes', function() {
  let note = null;
  
  describe('POST: /api/note', function() {
    it('should return a note', function(done) {
      request.post('localhost:8000/api/note')
        .send({
          name: 'test name',
          content: 'test content'
        })
        .end(function(err, response) {
          if (err) {
            console.error(err);
            return done(err);
          }

          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal('test name');
          expect(response.body.content).to.equal('test content');

          note = response.body;
          
          done();
        });
    });
  });

  describe('GET: /api/note', function() {
    it('should return a note', function(done) {
      request.get(`localhost:8000/api/note?id=${note.id}`)
        .end(function(err, response){
          if (err) {
            return done(err);
          }

          expect(response.status).to.equal(200);
          expect(response.body.name).to.equal('test name');
          expect(response.body.content).to.equal('test content');

          done();
        });
    });
  });
});