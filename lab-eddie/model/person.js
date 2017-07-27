'use strict';

const uuidv4 = require('uuid/v4');
const errHandler = require('../lib/errorHandle.js');

module.exports = function(first, last, age, job) {
  errHandle(['first', 'last', 'age', 'job'], argument.parameters);

  this.id = uuidv4();
  this.first = first;
  this.last = last
  this.age = age;
  this.job = job;
};