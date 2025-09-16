
const {createConnection} = require('net');
// Create a client and connect to the server
const client = createConnection({ port: 3000}, () => {
    console.log('Connected to server');
    client.write('Hello, server! This is the client.');
});