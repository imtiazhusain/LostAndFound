// importing userModel

const userModel = require('../model/User')

let userData;

// method to send updateUser  view to user
const upadateUserData = async(req,res)=>{

   // finding user Data from database via sessions
   userData = await userModel.findById({_id:req.session.user_id})

    res.render('updateUser',{userData:userData,success:false})
  
}


// method to update user Data in database 
const updateUserDataForPost = async(req,res)=>{
    try {



  let error;
  let success;

   // storing user provided data in to variables
  const fname = req.body.FirstName;
  const lName = req.body.LastName;
  const email = req.body.Email;
  const mobileNum = req.body.MobileNum;

  

 //Authentication 

   // to ensure all fields are filled by user
  if(!fname || !lName || !email  || !mobileNum ){
      error = "All fields are required"
      res.render('updateUser',{sError:error,userData:userData,success:false})
  }else if(!(fname.length > 2)){
      // this block will be executed when First Name(provided by user) is less than 3 characters

      error = "Firt Name should be at least 3 characters long"

      res.render('updateUser',{sError:error,userData:userData,success:false})

  }else if(!(lName.length > 2)){
      // this block will be executed when last Name(provided by user) is less than 3 characters

      error = "last Name should be at least 3 characters long"
      res.render('updateUser',{sError:error,userData:userData,success:false})

  }else if(( isNaN(mobileNum))){
   // this block will be executed when mobile number(provided by user) is not a number

  error = "invalid mob "
  res.render('updateUser',{sError:error,userData:userData,success:false})
}else{
      // this bloak will be executed when user provided data is valid
         

      // update user Data in database
          const updateUser = await userModel.findOneAndUpdate({email:userData.email},{
              $set:{
            firstName: fname,
            lastName:lName,
            email:email,
            mobileNum:mobileNum
          }
        },{returnDocument:'after'})

            
            // setting success variable to true so that user will get confirmation msg of data updated successfully 
          success = true
          
          res.render('updateUser',{userData:updateUser,success:success})

  }


    } catch (error) {
        console.log('error');
        res.status(400).send(error)
    }
}



module.exports = {upadateUserData,updateUserDataForPost}
