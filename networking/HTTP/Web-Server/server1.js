const Ayan = require('./Ayan/ayan');
const http = require('http');
const {
    getHomepage,getPosts, getLogin, getSignUp
} = require('./controllers/get.controller');

const { loginPost ,newPost } = require('./controllers/post.controller');

const server = new Ayan();

const PORT = process.env.PORT || 3001




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

server.post("/posts",(req,res)=>{
    console.log("New post request received to create a new post");
   return newPost(req,res)
})


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});