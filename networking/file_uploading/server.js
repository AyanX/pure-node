const net = require("net")
const fs = require("fs")

const server = net.createServer(()=>{})

//create a writeStream
        let writeS ;

server.on("connection",socket=>{
    socket.on("data",data=>{


        {writeS && writeS.write(data)}

        if(!writeS){
            const fileName =  JSON.parse( data.toString() ).fullPath
            writeS = fs.createWriteStream(`./uploaded/${fileName}`) || fs.createWriteStream(`./uploaded/uploadedFile-${Date.now()}.txt`)
            if(fileName){
                console.log("Receiving file:", fileName)
                return
            }
        }
    })

    socket.on("end",()=>{
        writeS.end()
        console.log("File upload completed")
    })    
})


server.listen(5000, ()=>console.log("server started"))