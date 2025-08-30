const {Buffer} = require("buffer")

const allocatedMemory = Buffer.from([0x43,0xf65])


console.log(allocatedMemory.toString("utf-8"))