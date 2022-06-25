// impoting mongoose
const mongoose = require('mongoose')




// definning items collection schema 
const itemDetailsSchema = new mongoose.Schema({
   

    itemName: {type:String, required: true, trim:true},
    itemLocation: {type:String, required: true, trim:true},
    itemDate: {type:String, required: true, trim:true},
    itemDescription:{type:String, required:true},
    itemImage:{type:String, required:true},
    status: {type:String, required: true},
    mobileNum: {type:String, required: true},
    email: {type:String, required: true},
    name: {type:String, required: true},

    
//  setting timestamps true will save the document time when it is created
},{timestamps:true})



//compiling schemma or making model
const itemModel  = mongoose.model('item',itemDetailsSchema)


// exporting itemModel
module.exports=itemModel



