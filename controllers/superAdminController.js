const Users = require('../models/userSchema')
module.exports = class SuperAdmin{
    
    static async getUsers(req, res){
        try {
            const users = await Users.find()
            const admins = await Users.find({role:'admin'})
            res.status(200).json({
                ok:true,
                message:'All Users',
                admins,
                users
            })
        } catch (error) {
            res.status(404).json({
                ok:false,
                message:error+''
            })
        }
    }

    static async addOrRemoveAdmin(req, res){
        try {
            const id = req.params.id
            const user = await Users.findOne({_id:id})
            if(!user) throw new Error('User not found')
            if(user.role =='user'){
                await Users.updateOne({_id:id},{
                    role:'admin'
                })
                res.status(200).json({
                    ok:true,
                    message:'New admin created!',
                    user
                })
                return
            }else if(user.role == 'admin'){
                await Users.updateOne({_id:id},{
                    role:'user'
                })
                res.status(200).json({
                    ok:true,
                    message:'Admin removed!',
                    user
                })
            }
        } catch (error) {
            res.status(200).json({
                ok:false,
                message:error+''
            })
        }
    }
}