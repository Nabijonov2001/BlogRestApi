const postValidation = require("../validations.js/postValidation")
const path = require('path')
const Posts = require("../models/postSchema")
const Categories = require("../models/categorySchema")
module.exports = class Post {

    static async getPosts(req, res){
        try {
            const posts = await Posts.find().populate('author','fullname').sort({updatedAt:-1})
            res.status(200).json({
                ok:true,
                message:'All posts',
                posts
            })

        } catch (error) {
            res.status('404').json({
                ok:false,
                message:error+'',
            })
        }
    }

    static async createPost(req, res) {
        try {
            const { error } = postValidation(req.body)
            if (error) {
                throw new Error(error.details[0].message)
            }
            const { title, content, category } = req.body
            const isCategory = await Categories.findOne({name:category})
            if(!isCategory) throw new Error('Category not found!')
            const athor = req.admin.id
            if (!req.files || req.files.length === 0) {
                throw new Error('You did not upload post image!')
            }
            const image = req.files.image
            const imageType = image.mimetype.split('/')[0]
            const imageName = image.name.split('.')[0]
            const imageFormat = image.mimetype.split('/')[1]
            const imagePath = path.join('images', `${imageName}- ${image.md5}.${imageFormat}`)
            if (imageType === 'image' || imageType === 'vector') {
                await image.mv(imagePath)
            }
            const post = await Posts.create({
                title, content,
                image:imagePath,
                author:athor,
                category
            })
            res.status(200).json({
                ok:true,
                message:'A new post created!',
                post
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ''
            })
        }
    }

    static async updatePost(req, res){
        try {
            const id = req.params.id
            const post = await Posts.findOne({_id:id}) 
            if(!post) throw new Error('Theres is no post with this id')
            const {error} = postValidation(req.body)
            if(error) throw new Error(error.details[0].message)
            const { title, content, category } = req.body
            const isCategory = await Categories.findOne({name:category})
            if(!isCategory) throw new Error('Category not found!')
            const athor = req.admin.id
            if (!req.files || req.files.length === 0) {
                throw new Error('You did not upload post image!')
            }
            const image = req.files.image
            const imageType = image.mimetype.split('/')[0]
            const imageName = image.name.split('.')[0]
            const imageFormat = image.mimetype.split('/')[1]
            const imagePath = path.join('images', `${imageName}- ${image.md5}.${imageFormat}`)
            if (imageType === 'image' || imageType === 'vector') {
                await image.mv(imagePath)
            }
            await Posts.updateOne({_id:id}, {
                title, content,
                image:imagePath,
                author:athor,
                category
            })
            res.status(200).json({
                ok:true,
                message:'Updated!',
                post
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error+''
            })
        }
    }

    static async deletePost(req, res){
        try {
            const id = req.params.id
            const post = await Posts.findOne({_id:id}) 
            if(!post) throw new Error('Theres is no post with this id')
            await Posts.deleteOne({_id:id})
            res.status(200).json({
                ok:true,
                message:'Deleted!',
                post
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error+''
            })
        }
    }
}