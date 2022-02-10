const Joi = require('joi')

function signupValidation(data){
    const schema = Joi.object().keys({
        fullname: Joi.string().max(50).required(),
        email:Joi.string().min(6).email().required(),
        phone_number:Joi.string().min(13).required(),
        password:Joi.string().min(5).max(50).required(),
        interest:Joi.string().min(3).required()
    })

    return schema.validate(data)
}

module.exports = signupValidation