
const {stdin} = require("node:process")

stdin.on("data", data=>console.log(data.toString()))
stdin.on("end", ()=>console.log("done reading"))