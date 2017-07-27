'use strict';

const uuid4v = require('uuid/v4');

module.exports = function(name, content){
  if(!name) throw new Error('must enter a name');
  if(!content) throw new Error('must enter content');

  this.id = uuid4v();
  this.name = name;
  this.content = content;
};
