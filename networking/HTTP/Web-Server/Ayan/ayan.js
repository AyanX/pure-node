const http = require('http');
const fs = require('fs');


class Ayan{
    constructor(){
        this.server = http.createServer() 
        this.routes = {}

        this.server.on('request', (req, res) => {
            console.log(`${req.method} request to ${req.url}`);
            const methodRoutes = this.routes[req.method] || {}
            const routeHandler = methodRoutes[req.url]
            if (routeHandler) {
                routeHandler(req, res)
            } else {
                res.writeHead(404, {'Content-Type': 'text/html'});
                fs.createReadStream("./Ayan/public/404.html").pipe(res);
            }
        })
    }   


    get(path, callback){
        this.routes["GET"] = this.routes["GET"] || {}
        this.routes["GET"][path] = callback
    }
    post(path, callback){
        this.routes["POST"] = this.routes["POST"] || {}
        this.routes["POST"][path] = callback
    }


    listen(port, callback){
        this.server.listen(port, callback)
    }
    
}
module.exports = Ayan;
