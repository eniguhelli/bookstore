const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name should have at least 2 characters',
      'string.max': 'Name should have at most 100 characters',
    }),
});

const updateCategorySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .messages({
      'string.empty': 'Name cannot be empty',
      'string.min': 'Name should have at least 2 characters',
      'string.max': 'Name should have at most 100 characters',
    }),
}).min(1); 

module.exports = { createCategorySchema, updateCategorySchema };
