'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const Storage = require('./lib/storage.js');
const parseJSON = require('./lib/parse-json.js');
const parseUrl = require('./lib/parse-url.js');
const Note = require('./model/note.js');

const router = new Router();
const storage = new Storage();

router.addMiddleware(parseJSON);
router.addMiddleware(parseUrl);

router.handlePost('/api/note', function(request, response) {
  let name = request.body.name;
  let content = request.body.content;

  if (!name) {
    respond(response, 400, 'Name not provided.');
    return;
  }

  if (!content) {
    respond(response, 400, 'Content not provided.');
    return;
  }

  let note = new Note(name, content);

  try {
    storage.add('notes', note);
    respond(response, 200, 'Added note.');
    return;
  } 
  catch(err) {
    console.error(err);
  }

  respond(response, 400, 'Could not add note.');
});

router.handleGet('/api/note', function(request, response) {
  let id = request.url.query.id;

  if (!id) {
    respond(response, 400, 'No id provided.');
    return;
  }

  try {
    let note = storage.get('notes', id);
    respond(response, 200, JSON.stringify(note), 'application/json');
  } 
  catch(error) {
    respond(response, 404, error.message);
  }
});

function respond(response, statusCode, message, contentType = 'text/plain') {
  response.writeHead(statusCode, {
    'Content-Type': contentType
  });

  response.write(message);
  response.end();
}

const PORT = process.env.PORT || 3000;
const server = http.createServer(router.route);
server.listen(PORT, `Listening on port ${PORT}.`);

