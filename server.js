const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer()


server.listen(PORT, function() {
  console.log('server running on ', PORT);
})