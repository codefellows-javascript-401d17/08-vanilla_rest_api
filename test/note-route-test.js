'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Note Routes Module', () => {
  let note = null;
  describe('POST:/api/note', () => {
    it('Should post a note', done => {
      request.post('localhost:8000/api/note')
      .send({name: 'Logan', content: '21'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Logan');
        expect(res.body.content).to.equal('21');
        note = res.body;
        console.log('POST note:', note);
        done();
      });
    });
  });
  describe('GET:/api/note', () => {
    it('Should get a note', done => {
      request.get(`localhost:8000/api/note?${note.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Logan');
        expect(res.body.content).to.equal('21');
        console.log('GET note:', note);
        done();
      });
    });
  });
  describe('DELETE:/api/note', () => {
    it('Should delete the selected note', done => {
      request.delete(`localhost:8000/api/note?${note.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});
