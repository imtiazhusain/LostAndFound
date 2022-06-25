

//l middleware to check whether user is loged in
const isLogin = async(req,res,next)=>{
    try {
        
        if(req.session.user_id){

        }else{
            // this block will execute when session.user_id is undefined
            // means user is not loged in yet 
            res.render('login')
        }
        next()


    } catch (error) {
        console.log(error);
        
    }
}


// middleware to check whether user is logged out

const isLogout = async(req,res,next)=>{
    try {
     
         
        if(req.session.user_id){
          // this block will execute when session.user_id has user id
            // means user is loged in so we redirect it to userDashboard
                res.redirect('/userDashboard')
        }
            next()
        } catch (error) {
        
        }

    }






module.exports={isLogin,isLogout}