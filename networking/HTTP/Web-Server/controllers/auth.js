const isLoggedIn =(req,res)=>{
    if(!req.headers.cookie){
        res.end()
    }
}
module.exports = isLoggedIn