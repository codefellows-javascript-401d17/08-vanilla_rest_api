'use strict';

const uuidv4 = require('uuid/v4');

module.exports = Note;

function Note(name, content) {
  if (!name) {
    throw new Error('No name provided.');
  }

  if (!content) {
    throw new Error('No content provided.');
  }

  this.id = uuidv4();
  this.name = name;
  this.content = content;
}