'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(name, distance, difficulty, description){
  if(!name)throw new Error('expected name');
  if(!distance)throw new Error('expected distance');
  if(!difficulty)throw new Error('expected difficulty');
  if(!description)throw new Error('expected description');

  this.id = uuidv4();
  this.name = name;
  this.distance = distance;
  this.difficulty = difficulty;
  this.description = description;
};
