const Categories = require("../models/categorySchema")
const Users = require("../models/userSchema")
const categoryValidation = require("../validations.js/categoryValidation")

module.exports = class Admin{
    
    static async getCategories(req, res){
        try {
            const categories = await Categories.find().sort({updatedAt:-1})
            res.status(200).json({
                ok:true,
                message:'All categories',
                categories
            })
        } catch (error) {
            res.status(404).json({
                ok:false,
                message:error+''
            })
        }
    }

    static async createCategory(req, res){
        try {
            const {error} = categoryValidation(req.body)
            if(error){
                throw new Error(error.details[0].message)
            }
            const {name} = req.body
            const check = await Categories.findOne({name})
            if(check) throw new Error('This category already exist!')
            const category = await Categories.create({name})
            if(category) res.status(200).json({
                ok:true,
                message:'A new category created',
                category
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error+''
            })
        }
    }

    static async updateCategory(req, res){
        try {
            const {error} = categoryValidation(req.body)
            if(error){
                throw new Error(error.details[0].message)
            }
            const id = req.params.id
            let category = await Categories.findOne({_id:id})
            if(!category){
                throw new Error('Category does not exist!')
            } 
            await Categories.updateOne({_id:id},{
                name:req.body.name
            })
            res.status(200).json({
                ok:true,
                message:'Updated!',
                category
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error+""
            })
        }
    }
    
    static async deleteCategory(req, res){
        try {
            const id = req.params.id
            let category = await Categories.findOne({_id:id})
            if(!category){
                throw new Error('Category does not exist!')
            } 
            await Categories.deleteOne({_id:id})
            res.status(200).json({
                ok:true,
                message:'Deleted',
                category
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error+""
            })
        }
    }
}