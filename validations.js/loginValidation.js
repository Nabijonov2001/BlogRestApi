const Joi = require('joi')

function loginValidation(data){
    const schema = Joi.object().keys({
        email:Joi.string().min(6).email().required(),
        password:Joi.string().min(5).max(50).required()
    })

    return schema.validate(data)
}

module.exports = loginValidation