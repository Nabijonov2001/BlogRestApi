const Joi = require('joi')

function categoryValidation(data){
    const schema = Joi.object().keys({
        name:Joi.string().min(4).required()
    })

    return schema.validate(data)
}

module.exports = categoryValidation