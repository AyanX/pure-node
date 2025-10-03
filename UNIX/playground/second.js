const {stdin, stdout,stderr} = require("node:process")

stdin.on("data",data=>{
    console.log(data)
})