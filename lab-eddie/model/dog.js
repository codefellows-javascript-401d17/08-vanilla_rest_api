'use strict';

const uuidv4 = require('uuid/v4');
const errHandle = require('../lib/errorHandle.js');

module.exports = function(name, breed, age) {
  errHandle(['name', 'breed', 'age'], arguments);

  this.id = uuidv4();
  this.name = name;
  this.breed = breed;
  this.age = age;
  
};