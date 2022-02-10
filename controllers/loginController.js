const {comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const Users = require("../models/userSchema")
const loginValidation = require("../validations.js/loginValidation")

module.exports = class Login{
    static async loginPost(req, res){
        try {
            const {error} = loginValidation(req.body)
            if(error) throw new Error(error.details[0].message)

            const {email, password} = req.body
            let user = await Users.findOne({email})
            if(!user) {
                throw new Error('You haven\'t registered yet, please sign up!')
            }
            const isTrue = await comparePassword(password, user.password)
            if(!isTrue) throw new Error('Password is incorrect!')
            let token = generateToken({
                id:user._id,
                role: user.role
            })
            user = {...user, password:null}
            res.cookie('token', token)
            res.status(200).json({
                ok:true,
                message:'User has been found!',
                
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error+''
            })
        }
    }
}