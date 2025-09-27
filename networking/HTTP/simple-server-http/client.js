const http = require("node:http")

const agent =new http.Agent({keepAlive:true})

const request = http.request({
    agent,
    port:5000,
    hostname:"localhost",
    method:"POST",
    path:"/names",
    headers:{
        "content-type":"application/json",
        "name":"ayan",
    }
})

request.on("response",(res)=>{
    res.on("data",data=>console.log(data.toString()))
})

request.write(JSON.stringify({
    book:"abominable snowman of pasadena",
    author:"RL Stine"
}))
request.end()