const fs = require('fs');
const posts = require('../views/posts.js');


const getHomepage = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    fs.createReadStream('./public/index.html').pipe(res);
};

const getPosts = (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(posts));
};

const getLogin= (res) => {
    fs.createReadStream('./public/login.html').pipe(res);
};

const getSignUp= (res) => {
    fs.createReadStream('./public/signup.html').pipe(res);
};

module.exports = {
    getHomepage,
    getPosts,
    getLogin,
    getSignUp
};
