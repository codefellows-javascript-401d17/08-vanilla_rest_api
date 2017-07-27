'use strict';

const uuidv4 = require('uuid/v4');
const errHandle = require('../lib/errorHandle.js');

module.exports = function(make, model, year, color) {
  errHandle(['make', 'model', 'year', 'color'], arguments);

  this.id = uuidv4();
  this.make = make;
  this.model = model;
  this.year = year;
  this.color = color;
  
};