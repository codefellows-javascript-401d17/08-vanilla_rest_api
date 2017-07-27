'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(bakedGood, description, calories) {
  if (!bakedGood) throw new Error('expected baked good');
  if (!description) throw new Error('expected description');
  if (!calories) throw new Error('expected calories');

  this.id = uuidv4();
  this.bakedGood = bakedGood;
  this.description = description;
  this.calories = calories;
};