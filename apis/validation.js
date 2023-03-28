const Joi = require("joi")

const create = Joi.object().keys({
	name: Joi.string(),
	title: Joi.string(),
	description: Joi.string(),
	city: Joi.string(),
	category: Joi.string(),
	status: Joi.string(),
	author: Joi.string()
})

const post = Joi.object().keys({
	id: Joi.number().required()
})

const update = Joi.object().keys({
	id: Joi.number(),
	name: Joi.string(),
	title: Joi.string(),
	description: Joi.string(),
	city: Joi.string(),
	category: Joi.string(),
	status: Joi.string(),
	author: Joi.string()
})

const deletePost = Joi.object().keys({
	id: Joi.number().required()
})

module.exports = { 
	create,
	post,
	update,
	deletePost
 }