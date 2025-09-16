
const {createServer} = require('net');


//create a server
const socket = createServer((socket) => { 
    // 'connection' listener
    socket.on('data', (data) => {
        console.log('Data received from client:', data.toString());
        socket.write(`Echo: ${data}`);
    });
    // When client disconnects
    socket.on('end', () => {
        console.log('Client disconnected');
    });
});
 // Start server listening on port 3000
socket.listen(3000, () => {
    console.log('Server listening on port 3000');
});