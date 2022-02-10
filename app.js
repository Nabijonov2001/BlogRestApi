const express = require('express')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const fs = require('fs')
const { PORT } = require('./config')
const dbConnection  = require('./db/db_connection')
const app = express()

// database connection
dbConnection()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(fileUpload())
app.use(cookieParser())

// all routers
fs.readdir(path.join(__dirname, 'routes'), (err, files)=>{
    if(!err){
        files.forEach(file => {
            const RouterPath = path.join(__dirname, 'routes', file)
            const Router = require(RouterPath)
            if(Router.router && Router.path){
               app.use(Router.path, Router.router)
            }
           
        })
    }
    
})

// server connection
const port = PORT || 3000
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})