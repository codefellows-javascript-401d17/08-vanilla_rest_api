'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(make, model) {
  if (!make) throw new Error('expected make ');
  if (!model) throw new Error('expected model');

  this.id = uuidv4();
  this.make = make;
  this.model = model;
};
