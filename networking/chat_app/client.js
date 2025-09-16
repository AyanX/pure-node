const {createConnection} = require("node:net")

const client  = createConnection({port: 3000}, () => {
  console.log("Connected to server")
  client.write("Hello, server!")
  client.on("data", (data) => {
  console.log("Received from server:", data.toString())
})
})


