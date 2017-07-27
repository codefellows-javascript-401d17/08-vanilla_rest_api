'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Note Routes', function() {
  var bake = null;

  describe('POST: /api/bake', function() {
    it('should make a baked good', function(done) {
      request.post('localhost:8000/api/bake')
      .send({
        bakedGood: 'muffin',
        description: 'naked cupcake',
        calories: 255
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.bakedGood).to.equal('muffin');
        expect(res.body.description).to.equal('naked cupcake');
        expect(res.body.calories).to.equal(255);

        bake = res.body;
        done();
      });
    });
  });

  describe('GET: /api/bake', function() {
    it('should return a baked good', function(done) {
      request.get(`localhost:8000/api/bake?id=${bake.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.bakedGood).to.equal('muffin');
        expect(res.body.description).to.equal('naked cupcake');
        expect(res.body.calories).to.equal(255);
        done();
      });
    });
  });

  describe('DELETE: /api/bake', function() {
    it('should delete a baked good', function(done) {
      request.delete(`localhost:8000/api/bake?id=${bake.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(204);
        expect(res.body.bakedGood).to.equal(undefined);
        done();
      });
    });
  });
});