'use strict';
const uuid = require('uuid/v4');
module.exports = function(name, brand){
  if(!name) throw new Error ('No Name');
  if (!brand) throw new Error('expected brand');

  this.id = uuidv4();
  this.name = name;
  this.brand = brand;
};