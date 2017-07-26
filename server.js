'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer().listen(PORT, () => {console.log('server up:', PORT)});