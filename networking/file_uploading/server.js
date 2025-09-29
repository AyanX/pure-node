const net = require("net")
const fs = require("fs")

const server = net.createServer(()=>{})

//create a writeStream
        let writeS ;

server.on("connection",socket=>{

    try{

    socket.on("data",data=>{


        {writeS && writeS.write(data)}

        if(!writeS){
            const fileName =  JSON.parse( data.toString() ).fullPath || "no_name"
            writeS = fs.createWriteStream(`./uploaded/${fileName}`) || fs.createWriteStream(`./uploaded/uploadedFile-${Date.now()}.txt`)
            if(fileName){
                console.log("Receiving file:", fileName)
                return
            }
        }
    })

    socket.on("end",()=>{
        writeS && writeS.end(()=>{
        console.log("File upload completed")})
        socket.end()
        writeS = null
    })  
}catch(err){
    console.log("Error:  Use Tcp   --------------    ----   \n  \n", err)}
})


server.listen(5005, ()=>console.log("server started on port 5005"))