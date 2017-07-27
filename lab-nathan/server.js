'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const Storage = require('./lib/storage.js');
const parseJson = require('./lib/parse-json.js');
const parseUrl = require('./lib/parse-url.js');
const Note = require('./model/note.js');
const Contact = require('./model/contact.js');

const router = new Router();
const storage = new Storage();

router.addMiddleware(parseJson);
router.addMiddleware(parseUrl);

router.handlePost('/api/note', function(request, response) {
  try {
    let note = new Note(request.body.name, request.body.content);
    storage.add('notes', note);
    respond(response, 200, JSON.stringify(note), 'application/json');
    return;
  } 
  catch(error) {
    console.error(error);
    respond(response, 400, 'Could not add note.');
  }
});

router.handlePost('/api/contact', function(request, response) {
  try {
    let contact = new Contact(request.body.firstName, request.body.lastName, request.body.email, request.body.phone);
    storage.add('contacts', contact);
    respond(response, 200, JSON.stringify(contact), 'application/json');
    return;
  } 
  catch(error) {
    console.error(error);
    respond(response, 400, 'Could not add contact.');
  }
});

router.handleGet('/api/note', function(request, response) {
  let id = request.url.query.id;

  if (!id) {
    respond(response, 200, JSON.stringify(Object.keys(storage['notes'])), 'application/json');
    return;
  }

  try {
    let note = storage.get('notes', id);
    respond(response, 200, JSON.stringify(note), 'application/json');
  } 
  catch(error) {
    console.error(error);
    respond(response, 404, error.message);
  }
});

router.handleGet('/api/contact', function(request, response) {
  let id = request.url.query.id;

  if (!id) {
    respond(response, 200, JSON.stringify(Object.keys(storage['contacts'])), 'application/json');
    return;
  }

  try {
    let note = storage.get('contacts', id);
    respond(response, 200, JSON.stringify(note), 'application/json');
  } 
  catch(error) {
    console.error(error);
    respond(response, 404, error.message);
  }
});

router.handleDelete('/api/note', function(request, response) {
  let id = request.url.query.id;

  if (!id) {
    respond(response, 200, 'No id provided.');
    return;
  }

  try {
    storage.remove('notes', id);
    respond(response, 204, null, null);
  } 
  catch(error) {
    console.error(error);
    respond(response, 404, error.message);
  }
});

router.handleDelete('/api/contact', function(request, response) {
  let id = request.url.query.id;

  if (!id) {
    respond(response, 200, 'No id provided.');
    return;
  }

  try {
    storage.remove('contacts', id);
    respond(response, 204, null, null);
  } 
  catch(error) {
    console.error(error);
    respond(response, 404, error.message);
  }
});

function respond(response, statusCode, message, contentType = 'text/plain') {
  if (contentType) {
    let headers = {
      'Content-Type': contentType
    };

    response.writeHead(statusCode, headers);
  }
  else {
    response.writeHead(statusCode);
  }  

  if (message) {
    response.write(message);
  }

  response.end();
}

const PORT = process.env.PORT || 3000;
const server = http.createServer(router.route());
server.listen(PORT, function() {
  console.log(`Listening on port ${PORT}.`);
});