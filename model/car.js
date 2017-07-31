'use strict';

const uuidv4 = require('uuid/v4');

const Car = module.exports = function(name, brand){ //eslint-disable-line
  if(!name) throw new Error('expected name');
  if(!brand) throw new Error('expected brand');
  this.name = name;
  this.brand = brand;
  this.id = uuidv4();
};
