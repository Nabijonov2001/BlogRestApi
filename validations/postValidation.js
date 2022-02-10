const Joi = require('joi')

function postValidation(data){
    const schema = Joi.object().keys({
        title:Joi.string().min(4).max(500).required(),
        content:Joi.string().min(100).required(),
        category:Joi.string().min(3).max(100).required()
    })

    return schema.validate(data)
}

module.exports = postValidation