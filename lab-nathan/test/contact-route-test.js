'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Contact Routes', function() {
  let contact = null;
  
  describe('POST: /api/contact', function() {
    it('should return a contact', function(done) {
      request.post('localhost:8000/api/contact')
        .send({
          firstName: 'bob',
          lastName: 'vila',
          email: 'bob@vila.com',
          phone: '1-800-BOB-VILA'
        })
        .end(function(err, response) {
          if (err) {
            console.error(err);
            return done(err);
          }

          expect(response.status).to.equal(200);
          expect(response.body.firstName).to.equal('bob');
          expect(response.body.lastName).to.equal('vila');
          expect(response.body.email).to.equal('bob@vila.com');
          expect(response.body.phone).to.equal('1-800-BOB-VILA');

          contact = response.body;
          
          done();
        });
    });

    it('should respond with bad request if no request body was provided or the body was invalid', function(done) {
      request.post('localhost:8000/api/contact')
        .send({
          gobble: 'gobble'
        })
        .end(function(error) {
          expect(error.status).to.equal(400);
          expect(error.response.text).to.equal('Could not add contact.');

          done();
        });
    });

    
  });

  describe('GET: /api/contact', function() {
    it('should return a contact', function(done) {
      request.get(`localhost:8000/api/contact?id=${contact.id}`)
        .end(function(err, response){
          if (err) {
            return done(err);
          }

          expect(response.status).to.equal(200);
          expect(response.body.firstName).to.equal('bob');
          expect(response.body.lastName).to.equal('vila');
          expect(response.body.email).to.equal('bob@vila.com');
          expect(response.body.phone).to.equal('1-800-BOB-VILA');

          done();
        });
    });

    it('should return a status code of 404 for routes that have not been registered', function(done) {
      request.get('localhost:8000/api/dinosaurs')
        .end(function(error) {
          expect(error.status).to.equal(404);
          expect(error.response.text).to.equal('Route not found.');

          done();
        });
    });

    it('should respond with not found for valid requests made with an id that was not found', function(done) {
      request.get('localhost:8000/api/contact?id=100')
        .end(function(error) {
          expect(error.status).to.equal(404);
          expect(error.response.text).to.equal('No item in contacts exists with an id 100');

          done();
        });
    });

    it('it should respond with an array of all ids if no id was provided in the request', function(done) {
      request.get('localhost:8000/api/contact')
        .end(function(error, response) {
          expect(response.body).to.deep.equal([ `${contact.id}` ]);

          done();
        });
    });
  });

  describe('DELETE: /api/contact', function() {
    it('should delete a contact', function(done) {
      request.delete(`localhost:8000/api/contact?id=${contact.id}`)
        .end(function(error, response){
          if (error) {
            return done(error);
          }

          expect(response.status).to.equal(204);

          done();
        });
    });
  });
});