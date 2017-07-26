'use strict';

const uuidv4 = require('uuid/v4');

module.exports = function(pokemon, type, gen) {
  if(!pokemon)throw new Error('expect Pokemon name');
  if(!type)throw new Error('expected Pokemon type');
  if(!gen)throw new Error('expected a generation')

  this.id = uuidv4();
  this.pokemon = pokemon;
  this.type = type;
  this.gen = gen;
};