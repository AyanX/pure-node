const Ayan = require('./Ayan/ayan');
const http = require('http');
const {
    getHomepage,getPosts, getLogin, getSignUp
} = require('./controllers/get.controller');

const { loginPost ,newPost } = require('./controllers/post.controller');

const server = new Ayan();

const PORT = process.env.PORT || 3002

server.use(server.parse()) // to parse json data

server.use((req, res, next) => {
    console.log(`Middleware 1: ${req.method} ${req.url}`);
    next()
})


server.get('/', (req, res) => {
    return getHomepage(req, res)
});


server.get('/login.html', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    return getLogin(res);
});

server.get('/signup.html', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    return getSignUp(res)
})

const trying = (req,res)=>{
    console.log("Trying middleware");
}

server.get('/posts', trying, (req, res) => {
    return getPosts(req, res);
});

server.post("/login",(req,res)=>{
   return loginPost(req,res)
})

server.post("/posts",(req,res)=>{
   return newPost(req,res)
})



server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});