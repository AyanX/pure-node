const {createServer} = require("node:net")

const server = createServer()

server.on("connection", (socket) => {
  console.log("New client connected")       

   socket.on("data", (data) => {
    console.log("Received data:", data.toString())
    socket.write("welcome to the chat my boy")
  })
})


 


server.listen(3000, () => {
  console.log("Server listening on port 3000")
})