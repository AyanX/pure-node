const {createServer} = require("node:http")
const fs = require("fs")

const server = createServer()

const fileStream = fs.createWriteStream("./books.txt")

server.on("request", (req,res)=> {

    let userName = req.headers.name;

    req.on("data", data=>{

        fileStream.write(`${userName} - ${data.toString("utf-8")}\n`)
        res.writeHead(200)
        res.write("data received")
    })
    req.on("end", ()=> res.write("message received"))


})

server.listen(5000, ()=>console.log("server started on port 5000"))
