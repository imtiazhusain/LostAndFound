const mongoose = require('mongoose')
const DATABASE_URL = 'mongodb://localhost:27017'



// function that will connect mongodb database
const connectDB = async ()=> {
    try{
        const options={
            dbName:'LostFoundDB',
        }
        await mongoose.connect(DATABASE_URL,options)
        console.log('Database connection successful')
    } 
   catch(err){
        console.log('Database Connection Failed');
    }
}

module.exports = connectDB