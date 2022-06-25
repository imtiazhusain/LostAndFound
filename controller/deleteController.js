// importing models
const userModel = require('../model/User')
const itemModel = require('../model/ItemDetails')



// method to send DeleteItems  view to user
const deleteItems = async(req,res)=>{
    const userData = await userModel.findById({_id:req.session.user_id})
    const userEmail = userData.email
    const posts = await itemModel.find({email:userEmail})

    res.render('deleteItems',{userData:userData,postData:posts})
   
}


// method to delete item data from Database

const deleteItemForPost = async(req,res)=>{
    try {
        // req.params.id is used to get id from url
        const result = await itemModel.findByIdAndDelete(req.params.id)
        res.redirect('/delete')

    } catch (error) {
        res.status(400).send(error)
    }
}


module.exports = {deleteItems,deleteItemForPost}