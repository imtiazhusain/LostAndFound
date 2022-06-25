
// method that will logout the user
const logout = (req,res)=>{
    try {
        // it will destroy the session and redirect user to login
        req.session.destroy()
        res.redirect('login')
    } catch (error) {
        console.log(error);
    }
   
}

module.exports = logout