
const EventEmitter = require("./events")
const events = new EventEmitter()


events.on("ayan",(x,y)=>{
    console.log(x+y)
})

events.emit("ayan", 2,4)

events.emit("ayan", 29,1)