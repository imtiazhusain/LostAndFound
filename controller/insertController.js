// importing models
const itemModel = require('../model/ItemDetails')
const userModel = require('../model/User')
// varible that will store userData coming form Database
let userData;

// method to send insertItems  view to user

const insertItemDetails = async(req,res)=>{
   userData = await userModel.findById({_id:req.session.user_id})
    res.render('InsertItemDetails',{userData:userData})
  
}


// method to store Item details  data in database

const insertItemDetailsForPost = async(req,res)=>{
    try {



            let error;
            let success;


       // storing user provided data in to variables
            const itemName = req.body.itemName;
            const itemLocation = req.body.location;
            const itemDate = req.body.Date;
            const itemDescription = req.body.itemDescription;
            const itemImage = req.file.filename;
            const status = req.body.status;
            const mobileNum = userData.mobileNum;
            const email = userData.email;
            const name = userData.firstName + " " + userData.lastName;
            
            //Authentication 

            // to ensure all fields are filled by user
            if(!itemName || !itemLocation || !itemDate  || !itemDescription || !itemImage || !status ){
                error = "All fields are required"
                res.render('signup',{sError:error,firstName:fname,lastName:lName,Email:email,
                   userMobNum:mobileNum})
            }else{
                
                // this bloak will be executed when user provided data is valid
                    
                
                // storing item details in database
                    const insertItem = new itemModel({
                        itemName: itemName,
                        itemLocation:itemLocation,
                        itemDate: itemDate,
                        itemDescription:itemDescription,
                        itemImage: itemImage,
                        status:status,
                        mobileNum:mobileNum,
                        email:email,
                        name:name,
    
                        
                      
                    })
                    
                    const result =  await insertItem.save()
                    
                    success = 'Item Added Successfully'
                    res.render('InsertItemDetails',{userData:userData,success:success})
                    
             
            }
         

        




           
            
            
        
       

    } catch (error) {
        console.log('error');
        res.status(400).send(error)
    }
}





module.exports = {insertItemDetails,insertItemDetailsForPost}
