'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../server.js');

describe('Hike Routes', function(){
  var hike = null;

  describe('POST: /api/hike', function(){
    it('should return a hike', function(done){
      request.post('localhost:8000/api/hike')
      .send({name:'some cool hike', distance: '3.4 miles', difficulty: 'medium', description:'a cool hike'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('some cool hike');
        expect(res.body.distance).to.equal('3.4 miles');
        expect(res.body.difficulty).to.equal('medium');
        expect(res.body.description).to.equal('a cool hike');
        hike = res.body;
        done();
      });
    });

    it('should return bad request', function(done){
      request.post('localhost:8000/api/hike')
      .send({name:'some cool hike', blue: '3.4 miles'})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  //also do a 400, in the server too.

  describe('GET: /api/hike', function(){
    it('should return a hike', function(done){
      request.get(`localhost:8000/api/hike?id=${hike.id}`)
      .send({name:'some cool hike', distance: '3.4 miles', difficulty: 'medium', description:'a cool hike'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal('some cool hike');
        expect(res.body.distance).to.equal('3.4 miles');
        expect(res.body.difficulty).to.equal('medium');
        expect(res.body.description).to.equal('a cool hike');
        console.log('get request hike:', res.body);
        done();
      });
    });
    it('should return an error(404)', function(done){
      request.get('localhost:8000/api/hike?id=123456')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should return bad request (400)', function(done){
      request.get('localhost:8000/api/hike?=1234567')
      .end(function(err,res){
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
});

//also 404 and 400
