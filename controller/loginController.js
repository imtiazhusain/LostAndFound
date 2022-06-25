// importing models
const userModel = require('../model/User')

// impoting library to  hash passwords
const bcrypt = require('bcrypt')


// method to send login  view to user

const login = (req,res)=>{
    res.render('login',)
}

// method to authenticate user 

const loginForPost = async(req,res)=>{
    try {
     
            let error;

            // storing email and password in variables that are provided by user
            const email = req.body.email;
            const password = req.body.password;
            // to ensure all fields are filled by user
            if(!email || !password  ){
                error = "All fields are required"
                res.render('login',{error:error,email:email})
            }else{
                // fatching user data by it's email from database
                const userData = await userModel.findOne({email:email})

                // if user data is not in DB error will be passed to user that record not found
                if(userData== null){
                    error ="Record Not Found"
                    res.render('login',{error:error,email:email})
                }else{
                    // comparing user password with hased password that is stored in DB usring bcryt
                    const isMatch = await bcrypt.compare(password,userData.password)
                    
    
                    // if password is matced user will be redirted to dashboard other wise gets error of invlaid login details
                    if(isMatch){
                        // storing userID in sesiion to loged in user unless he loged out or server is restarted
                        req.session.user_id = userData._id
    
                        res.redirect('/userDashboard')
                    }else{
                        error = "Invalid Login Details"
                        res.render('login',{error:error,email:email})
                    }
                }
            }
           
            
        
        
        
    

    } catch (error) {
        res.status(400).send(error)
    }
}





module.exports = {login,loginForPost}