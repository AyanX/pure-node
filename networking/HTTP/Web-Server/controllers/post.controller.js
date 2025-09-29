const { default: users } = require("../views/users");
const posts = require('../views/posts.js');
const { sessions } = require("../views/sessions.js");


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
            const token = Math.random().toString(36).substring(2); // Simple token generation
            sessions.push({ username, token });
            res.writeHead(200, { 'Set-Cookie': `token=${token}; HttpOnly; Path=/`, 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Login successful' }));
        } else {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid credentials' }));
        }
    });
}

const newPost =async (req,res)=>{
    
    let body = '';
    console.log("Request body:",req.body);

   
        console.log("posts",posts)
        const { title, content ,author} = req.body
        //  save the post to our little database
        console.log("Creating new post:", { title, content, author });
        posts.unshift({ id: posts.length + 1, postTitle:title, post: content,author });
        console.log(posts);
        //status 201 Created
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ title, content, author }));
   

}


module.exports = {
    loginPost, newPost
};