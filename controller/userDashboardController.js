// impoting models
const userModel = require('../model/User')
const itemModel = require('../model/ItemDetails')

// method to send userDashboard  view to user
const userDashboard = async(req,res)=>{
 
   // finding user Data from database via sessions

    const userData = await userModel.findById({_id:req.session.user_id})
    //  assigning user Email that is logged in now to userEmail variable 
    const userEmail = userData.email

   // finding Items/post that user stored in database
       const posts = await itemModel.find({email:userEmail})

    res.render('userDashboard',{userData:userData,postData:posts})
   
}




module.exports = userDashboard