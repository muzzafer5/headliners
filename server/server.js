const app = require('./route')
const mongoose = require('mongoose')
const keys = require("./config/keys")
const db = keys.mongoURI;
const port = keys.PORT
const path = require('path')
const express = require('express')

mongoose.connect( db, { 
     useNewUrlParser: true, 
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true})
 .then(()=>console.log('MongoDB succesfully Connected'))
 .catch(err => console.log(err))

if (process.env.NODE_ENV === "production") {
    console.log("prod")
    app.use(express.static('web_app/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'web_app', 'build', 'index.html'))
    })
}

const server = app.listen(port, function() {
    console.log('Server is running on port: ' + port)
   });

module.exports = server;
                            