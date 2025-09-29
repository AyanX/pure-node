const http = require("http");
const fs = require("fs");

class Ayan {
  constructor() {
    this.server = http.createServer();
    this.routes = {};
    this.callbacks = {};
    this.middlewares = [];

    this.server.on("request", (req, res) => {
      this.runMiddlewares(req, res, () => {
        console.log(`${req.method} request to ${req.url}`);
        const methodRoutes = this.routes[req.method] || {};
        const routeHandler = methodRoutes[req.url];
        if (routeHandler) {
          routeHandler.forEach((handler) => handler(req, res));
          return;
        } else {
          res.writeHead(404, {
            "Content-Type": "text/html",
          });
          fs.createReadStream("./Ayan/public/404.html").pipe(res);
        }
      });
    });

    //constructor ends here
  }

  get(path, ...callbacks) {
    this.routes["GET"] = this.routes["GET"] || {};
    //register the callbacks for the given path and its function
    this.routes["GET"][path] = callbacks;
  }
  post(path, ...callbacks) {
    this.routes["POST"] = this.routes["POST"] || {};
    this.routes["POST"][path] = callbacks;
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  runMiddlewares(req, res, done) {
    let index = 0;

    const next = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        middleware(req, res, next); 
      } else {
        if (done) done(); // continue to route handler
      }
    };

    next();
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  //middleware to parse json data
  parse() {
    return (req, res, next) => {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        try {
          req.body = data ? JSON.parse(data) : {};
        } catch (err) {
          req.body = {};
        }
        next(); // continue middleware chain
      });
    };
  }
}
module.exports = Ayan;
