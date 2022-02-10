const Posts = require('../models/postSchema')
const Categories = require('../models/categorySchema')
module.exports = class Home{

    static async getCategories(req, res){
        try {
            const categories = await Categories.find().sort({updatedAt:-1})
            res.status(200).json({
                ok:true,
                message:'All Categories!',
                categories
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error+''
            })
        }
    }

    static async getPosts(req, res){
        try {
            const posts = await Posts.find().populate('author','fullname').sort({updatedAt:-1})
            console.log(posts[0].category)
            res.status(200).json({
                ok:true,
                message:'All posts',
                posts
            })
        } catch (error) {
            res.status(404).json({
                ok:false,
                message:error+''
            })
        }
    }

    static async sortPostsByCategory(req, res){
        try {
            const category = req.params.category
            console.log(category)
            const isCategory = await Categories.findOne({name:category})
            if(!isCategory) throw new Error('This category does not exist!')
            const posts = await Posts.find({category}).populate('author','fullname').sort({updatedAt:-1})
            res.status(200).json({
                ok:true,
                message:'Posts',
                posts
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error+''
            })
        }
    }

    static async getSinglePost(req, res){
        try {
            const id = req.params.id
            const post = await Posts.findOne({_id:id}).populate('author','fullname')
            if(!post) throw new Error('There is no post with this id!')
            res.status(200).json({
                ok:true,
                message:'Post found!',
                post
            })
        } catch (error) {
            res.status(404).json({
                ok:false,
                message:error+''
            })
        }
    }
}