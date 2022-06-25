const mongoose = require('mongoose')

// importing bcrypt library to  hash passwords.
const bcrypt = require('bcrypt');


// definning schema 
const userSchema = new mongoose.Schema({
   

    firstName: {type:String, required: true, trim:true},
    lastName: {type:String, required: true, trim:true},
    email: {type:String, required: true, trim:true},
    mobileNum:{type:String, required:true},
    password: {type:String, required: true}
 
//  setting timestamps true will save the document time when it is created

},{timestamps:true})


// hashing the password using bcrypt
userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next()
})

//compiling schemma or making model
const userModel  = mongoose.model('user',userSchema)



// exporting userModel
    module.exports=userModel



