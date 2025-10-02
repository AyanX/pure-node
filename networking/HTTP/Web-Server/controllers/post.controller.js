const { default: users } = require("../views/users");
const posts = require('../views/posts.js');
const { sessions } = require("../views/sessions.js");


const loginPost = async (req,res)=>{
        const { username, password } = req.body
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
        return
}

const newPost =async (req,res)=>{
        const { title, content ,author} = req.body
        //  save the post to our little database
        posts.unshift({ id: posts.length + 1, postTitle:title, post: content,author });
        //status 201 Created
        res.writeHead(201, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ title, content, author }));
}

const signupPost = (req,res)=>{
    //  name, username, password 

    const {username,password} = req.body
    if(!username || !password){
        res.writeHead(401, { 'Content-Type': 'application/json' });
       return res.end(JSON.stringify({ message: 'Invalid credentials' }));
    }

    users.push({username,password})
    res.writeHead(200, { 'Content-Type': 'application/json' });
         return   res.end(JSON.stringify({ message: 'user created' }));

}

module.exports = {
    loginPost, newPost,signupPost
};