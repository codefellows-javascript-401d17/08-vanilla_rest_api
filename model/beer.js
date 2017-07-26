'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(name, style, ibu){
  if(!name) throw new Error('There was no name entered');
  if(!style) throw new Error('There was no style entered');
  if(!ibu) throw new Error('There was no style entered');

  this.id = uuidv4();
  this.name = name;
  this.style = style;
  this.ibu = ibu;
};
