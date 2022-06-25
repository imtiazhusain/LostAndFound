
// importing modules
const express = require('express')
const app = express()
const path = require('path')
const webroutes = require('./routes/webroutes')
const connectDB = require('./database/connectDB')
const session = require('express-session')


// defining port of the application
const PORT = process.env.PORT || 5000
// calling function to connect with mongodb database
connectDB()

// session configuration
app.use(session({
    secret:'09skdfj029eskdk',
    resave: false,
     saveUninitialized: true,   
   }))

// to use Post method correctly and access req.body
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// routes
app.use(webroutes)


// using express.static middleware to access the files inside public folder like css and JS files
app.use(express.static(path.join(__dirname,"/public")))


// telling express js that we are using ejs view enigne
app.set('view engine','ejs')
app.set('views','./views')


app.listen(PORT,()=>{
    console.log(`Example running at http://localhost:${PORT}`);
})
