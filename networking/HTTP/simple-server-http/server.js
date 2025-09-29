const {createServer} = require("node:http")
const fs = require("fs")

const server = createServer()

const fileStream = fs.createWriteStream("./books.txt")

server.on("request", (req,res)=> {

    let userName = req.headers.name;

    req.on("data", data=>{
        console.log(data.toString("utf-8"))
        fileStream.write(`${userName} - ${data.toString("utf-8")}\n`)
        res.writeHead(200, {"Content-Type": "text/plain", "name":userName})
        res.write("data received\n")
        res.end()
    })
    req.on("end", ()=> res.write("message received"))


})

server.listen(5000, ()=>console.log("server started on port 5000"))

