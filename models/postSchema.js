const {Schema, model} = require('mongoose')

const PostSchema = new Schema({
    title:{
        type:String,
        min:4,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }

}, {timestamps:true})

const Posts = model('Post', PostSchema)
module.exports = Posts