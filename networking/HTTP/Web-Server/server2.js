const Ayan = require('./Ayan/ayan');
const http = require('http');
const {
    getHomepage,getPosts, getLogin, getSignUp
} = require('./controllers/get.controller');

const { loginPost ,newPost, signupPost } = require('./controllers/post.controller');
const isLoggedIn = require('./controllers/auth');

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

server.get('/posts', (req, res) => {
    return getPosts(req, res);
});

server.post("/login",(req,res)=>{
   return loginPost(req,res)
})

server.post("/signup",(req,res)=>{
   return signupPost(req,res)
})

server.post("/posts",  isLoggedIn,(req,res)=>{
   return newPost(req,res)
})



server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});