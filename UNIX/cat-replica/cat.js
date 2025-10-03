
const {stdin, stdout} = require("node:process")
const fs = require("node:fs")


const filePath = process.argv[2]

const stream = fs.createReadStream(filePath)

if(filePath){
stream.on("data", data=>stdout.write(data.toString()))
stream.on("end", ()=>{
     stdout.write("\n")
    process.exit(0)
    })
}


