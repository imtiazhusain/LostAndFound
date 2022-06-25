// importing userModel
const userModel = require('../model/User')

// method to send signup  view to user
const signup = (req,res)=>{
    res.render('signup',{active:'active'})
}


// method to store user Data in database 

const signupForPost = async(req,res)=>{
    try {


            let error;
            let success;


        
            // storing user provided data in to variables
            const fname = req.body.FirstName;
            const lName = req.body.LastName;
            const email = req.body.Email;
            const mobileNum = req.body.MobileNum;
            const password = req.body.Password;
            const conPassword = req.body.ConfirmPassword;

            // finding user Data via it's provided email
            const emailDB = await userModel.findOne({email:email})
            // finding user via it's provided mobile number
            const mobNumDB = await userModel.findOne({mobileNum:mobileNum})


            //Authentication 

            // to ensure all fields are filled by user
            if(!fname || !lName || !email  || !mobileNum || !password || !conPassword ){
                error = "All fields are required"
                res.render('signup',{sError:error,firstName:fname,lastName:lName,Email:email,
                   userMobNum:mobileNum})

            }else if(!(fname.length > 2)){
                // this block will be executed when First Name(provided by user) is less than 3 characters
                error = "Firt Name should be at least 3 characters long"
                
                // other varibles will also send to user so he don't have to fill form from scratch
                res.render('signup',{sError:error,firstName:fname,lastName:lName,Email:email,
                    userMobNum:mobileNum})

            }else if(!(lName.length > 2)){
                // this block will be executed when last Name(provided by user) is less than 3 characters
                error = "last Name should be at least 3 characters long"

                // other varibles will also send to user so he don't have to fill form from scratch
                res.render('signup',{sError:error,firstName:fname,lastName:lName,Email:email,
                    userMobNum:mobileNum})

            }else if(!(emailDB== null)){
                // this block will be executed when email(provided by user) is already 
                // in database this will ensure each soted in database will be uniqu
                 error = "User already exists with this email "

                // other varibles will also send to user so he don't have to fill form from scratch
                res.render('signup',{sError:error,firstName:fname,lastName:lName,Email:email,
                    userMobNum:mobileNum})

            }else if(!(mobNumDB== null)){

                // this block will be executed when mobile number(provided by user) is already 
                // in database this will ensure each mobile number soted in database will be unique
               
                error = "User already exists with this Mobile number "

                // other varibles will also send to user so he don't have to fill form from scratch
                res.render('signup',{sError:error,firstName:fname,lastName:lName,Email:email,
                userMobNum:mobileNum})

         }else if(( isNaN(mobileNum))){

                // this block will be executed when mobile number(provided by user) is not a number

            error = "invalid mob "

            res.render('signup',{sError:error,firstName:fname,lastName:lName,Email:email,
                userMobNum:mobileNum})

         }else if(!(password.length > 7 )){
                // this block will be executed when password(provided by user) is less than 8 characters

            error = "Password should be 8 characters long"
            res.render('signup',{sError:error,firstName:fname,lastName:lName,Email:email,
                userMobNum:mobileNum})

        }else if(!(password == conPassword)){
                // this block will be executed when password(provided by user) is not matched with conirm password

            error = "Password Doest not match"
            res.render('signup',{sError:error,firstName:fname,lastName:lName,Email:email,
                userMobNum:mobileNum})

             }else{

                if(password == conPassword){
                // this bloak will be executed when user provided data is valid

                    // stroing user data into database by using userModel
                    const registerUser = new userModel({
                        firstName: fname,
                        lastName:lName,
                        email:email,
                        mobileNum:mobileNum,
                        password:password,
    
                        
                      
                    })
                    const result =  await registerUser.save()
                    
                    success = 'you have been succesfully registered'
                    // success msg will also be passed to tell user that he is successfully registerd
                    res.render('login',{success:success})
                    
             } 
            }
  

    } catch (error) {
        console.log('error');
        res.status(400).send(error)
    }
}



module.exports = {signup,signupForPost}