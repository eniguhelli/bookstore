const Joi = require('joi');
const mongoose = require('mongoose');

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('"{{#label}}" must be a valid MongoDB ObjectId');
  }
  return value;
}, 'ObjectId Validation');

const createBookSchema = Joi.object({
  title: Joi.string().min(2).max(255).required().messages({
    'string.min': 'Title must be at least 2 characters long',
    'string.max': 'Title must be at most 255 characters long',
    'any.required': 'Title is required',
  }),
  author: Joi.string().min(2).max(255).required().messages({
    'string.min': 'Author must be at least 2 characters long',
    'string.max': 'Author must be at most 255 characters long',
    'any.required': 'Author is required',
  }),
  description: Joi.string().min(5).max(2000).required(),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
  category: objectId.required(),
});

const updateBookSchema = Joi.object({
  title: Joi.string().min(2).max(255).messages({
    'string.min': 'Title must be at least 2 characters long',
    'string.max': 'Title must be at most 255 characters long',
  }),
  author: Joi.string().min(2).max(255).messages({
    'string.min': 'Author must be at least 2 characters long',
    'string.max': 'Author must be at most 255 characters long',
  }),
  description: Joi.string().min(5).max(2000),
  price: Joi.number().min(0),
  stock: Joi.number().integer().min(0),
  category: objectId,
}).min(1);

module.exports = {
  createBookSchema,
  updateBookSchema,
};
