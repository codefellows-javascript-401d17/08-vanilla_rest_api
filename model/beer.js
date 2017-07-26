'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(name, style, IBU) {
  if (!name) throw new Error('expected name');
  if (!style) throw new Error('expected content');
  if (!IBU) throw new Error('expected content');

  this.id = uuidv4();
  this.name = name;
  this.style = style;
  this.IBU = IBU;
};
