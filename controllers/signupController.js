const { hashPassword } = require("../helpers/bcrypt")
const Users = require("../models/userSchema")
const signupValidation = require("../validations.js/signupValidation")

module.exports = class Signup{
    static async signupPost(req, res){
        try {
            const {error} = signupValidation(req.body)
            if(error){
                throw new Error(error.details[0].message)
            }
            const {fullname, email, password, phone_number, interest} = req.body
            const check = await Users.find().or([{email},{phone_number}])
            if(check.length){
                throw new Error('This email or phone number already has been registred')
            }
            const pass = await hashPassword(password)
            const user = await Users.create({
                fullname, email,
                phone_number,
                password:pass,
                interest
            })
            if(user){
                res.status(200).json({
                    ok:true,
                    message:'A new user created',
                    user
                })
            }
            
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error+''
            })
        }
    }
}