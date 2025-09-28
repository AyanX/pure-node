const { default: users } = require("../views/users");
const posts = require('../views/posts.js');


const loginPost = async (req,res)=>{
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); //  Buffer to string
    });
    req.on('end', () => {
        const { username, password } = JSON.parse(body);
        // Validate credentials
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Login successful' }));
        } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid credentials' }));
        }
    });
}

const newPost =async (req,res)=>{
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); //  Buffer to string
    });

    console.log("Request body:", body);

    req.on('end',async () => {
        const { title, content ,author} = JSON.parse(body);
        //  save the post to our little database
        posts.unshift({ id: posts.length + 1, postTitle:title, post: content,author });
        console.log(posts);
        //status 201 Created
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ title, content, author }));
    });
}


module.exports = {
    loginPost, newPost
};