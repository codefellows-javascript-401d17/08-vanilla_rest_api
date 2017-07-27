'use strict';

const uuidv4 = require('uuid/v4');
const errHandle = require('../lib/errorHandle.js');

module.exports = function(make, model, color, year) {
  errHandle(['make', 'model', 'color', 'year'], arguments);

  this.id = uuidv4();
  this.make = make;
  this.model = model;
  this.color = color;
  this.year = year;
};