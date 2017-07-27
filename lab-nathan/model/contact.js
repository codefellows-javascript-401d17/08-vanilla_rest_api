'use strict';

const uuidv4 = require('uuid/v4');

module.exports = Contact;

function Contact(firstName, lastName, email, phone) {
  if (!firstName) {
    throw new Error('No first name provided.');
  }

  if (!lastName) {
    throw new Error('No last name provided.');
  }

  if (!email) {
    throw new Error('No email provided.');
  }

  if (!phone) {
    throw new Error('No phone provided.');
  }

  this.id = uuidv4();
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.phone = phone;
}