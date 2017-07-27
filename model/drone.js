const uuid = require('uuid/v4');

module.exports = function(model, rotors) {
  if(!model) return new Error('must include model');
  if(!rotors) return new Error('must include rotors');

  this.id = uuid();
  this.model = model;
  this.rotors = rotors;
}

