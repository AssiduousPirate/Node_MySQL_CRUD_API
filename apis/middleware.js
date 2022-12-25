const Joi = require("joi")

const index = Joi.object().keys({
	name: Joi.string().required()
})

module.exports = { index }