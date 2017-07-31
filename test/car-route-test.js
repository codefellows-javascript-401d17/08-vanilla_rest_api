'use strict';

const expect = require('chai').expect;
const request = require('superagent');

require('../server.js');

describe('Car Routes', function(){
  var car = null;
  describe('Post: /api/car', function(){
    it('should POST: 200', function(done){
      request.post('localhost:3000/api/car')
      .send({name: 'Miata', brand: 'Mazda'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('Miata');
        expect(res.body.brand).to.equal('Mazda');
        car = res.body;
        done();
      });
    });

  });
  describe('Get: /api/car', function(){
    it('should GET :200  ', function(done){
      request.get(`localhost:3000/api/car?id=${car.id}`)
      .end((err, res) =>{
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(car.id);
        expect(res.body.name).to.equal('Miata');
        expect(res.body.brand).to.equal('Mazda');
        done();
      });
    });
  });
  describe('Delete: /api/car', function(){
    it('should delete', function(done){
      request.delete(`localhost:3000/api/car?id=${car.id}`)
      .end((err, res) =>{
        expect(res.status).to.equal(204);
        expect(res.body.id).to.equal(undefined);
        expect(res.body.name).to.equal(undefined);
        expect(res.body.brand).to.equal(undefined);
        done();
      });
    });
  });

    it('should POST: 400', function (done) {
      request.post('localhost:3000/api/car')
        .send({ name: 'Miata', notBrand: 'Mazda' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          car = res.body;
          done();
        });
    });
    it('should GET: 404', function (done) {
      request.get(`localhost:3000/api/car?id=${car.id+1}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should GET: 400', function (done) {
      request.get(`localhost:3000/api/car?notID=${car.id}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
});