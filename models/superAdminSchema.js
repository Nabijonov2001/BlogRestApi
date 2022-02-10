const {Schema, model} = require('mongoose')

const SuperAdminSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        require:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:String,
        default:'SuperAdmin'
    },
    interest:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        default:null
    }

}, {timestamps:true})

const SuperAdmin = model('SuperAdmin', SuperAdminSchema)
module.exports = SuperAdmin