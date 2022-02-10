const mongoose = require('mongoose')
const { DB_URL } = require('../config')

async function dbConnection(){
    try {
        await mongoose.connect(DB_URL)
        console.log('Database connected!')
    } catch (error) {
        console.log('Database connection failed!')
    }
    
}

module.exports = dbConnection