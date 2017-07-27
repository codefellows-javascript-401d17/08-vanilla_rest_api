'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Note Routes', () => {
  var note = null;

  describe('POST: /api/note', () => {
    it('Should return a note', (done) => {
      request.post('localhost:8000/api/note')
      .send({name: 'test name', content: 'test content'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        note = res.body;
        done();
      });
    });
  });

  describe('GET: /api/note', () => {
    it('Should return a note', (done) => {
      request.get(`localhost:8000/api/note?id=${note.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('test name');
        expect(res.body.content).to.equal('test content');
        done();
      });
    });
  });

  describe('PUT: /api/note', () => {
    it('Should replace a note\'s info', (done) => {
      request.put(`localhost:8000/api/note?id=${note.id}`)
      .send({name: 'new name', content: 'new content'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('new name');
        expect(res.body.content).to.equal('new content');
        done();
      });
    });
  });

  describe('DELETE: /api/note', () => {
    it('Should delete a note', (done) => {
      request.delete(`localhost:8000/api/note?id=${note.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(202);
        done();
      });
    });
  });
});
