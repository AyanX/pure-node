
const {createServer} = require('http');

//hostname as ip address

const hostname = '192.168.180.44';

const server = createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({ message: 'Hello, World!' }));
});

server.listen(3001, hostname, () => {
  console.log(`Server running at http://${hostname}:3001/home`);
});
// now you can access the server using the IP address in your browser in the same wifi network