// imporing models
const userModel = require('../model/User')
const itemModel = require('../model/ItemDetails')

let userData;
let posts;
let itemNotFoundError;
// method to send searchItems  view to user
const searchItems = async(req,res)=>{
    // getting userData from DB that is currently loged in by using req.session.user_id
     userData = await userModel.findById({_id:req.session.user_id})
    // sendig searchItems view to user alog with it's data
    res.render('searchItems',{userData:userData})

   
}

// method to search items from Database and seding back to users
const searchItemForPost = async(req,res)=>{
    try {



            let error;

            const itemName = req.body.itemName;
            const itemLocation = req.body.Location;
         
            // to ensure all fields are filled by user
            if(!itemName || !itemLocation ){
                error = "All fields are required"
                console.log(itemName,itemLocation);
                res.render('searchItems',{sError:error,userData:userData,postData:posts,itemName:itemName,itemLocation:itemLocation})
            }else{

                // fatching Matced Items  from database
                const itemData = await itemModel.find({itemName:itemName,itemLocation:itemLocation})
               
                // if no item found so empty array is stored in ItemData varible that is why it's length is 
                // checked to ensure itemData is not empty
                if(itemData.length>0){
                    // sendig searchItems view to user alog with items Data
                    res.render('searchItems',{userData:userData,postData:itemData})
                }else{

                //    this bloack will execute if no item is found
                    itemNotFoundError="No  Such Item Found"
                    res.render('searchItems',{userData:userData,itemNotFoundError:itemNotFoundError})
                }
                    
                    
             } 
            
         

        




           
            
            
        
       

    } catch (error) {
        console.log('error');
        res.status(400).send(error)
    }
}






module.exports = {searchItems,searchItemForPost}