const http = require('http');
const PORT = process.env.PORT || 8000;

const server = http.createServer();

server.listen(PORT, function() {
  console.log(`Server listening on PORT: ${PORT}`);
});