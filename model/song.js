'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(name, band, year) {
  if (!name) throw new Error('expected name');
  if (!band) throw new Error('expected band');
  if (!year) throw new Error('expected year');

  this.id = uuidv4();
  this.name = name;
  this.band = band;
  this.year = year;
};
