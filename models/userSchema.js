const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        min:5,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    interest:{
      type:String
    }

}, {timestamps:true})

const Users = model('User', UserSchema)
module.exports = Users