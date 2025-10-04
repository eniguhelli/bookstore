const Joi = require('joi');

const createOrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        book: Joi.string().length(24).hex().required().messages({
          'string.length': 'Book ID must be a valid 24-character hex string',
          'string.hex': 'Book ID must be a valid hex string',
          'any.required': 'Book ID is required',
        }),
        quantity: Joi.number().integer().min(1).required().messages({
          'number.min': 'Quantity must be at least 1',
          'any.required': 'Quantity is required',
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one item is required',
      'any.required': 'Items are required',
    }),
  totalPrice: Joi.number().positive().required().messages({
    'number.positive': 'Total price must be a positive number',
    'any.required': 'Total price is required',
  }),
});

const updateOrderStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'completed', 'cancelled').required().messages({
    'any.only': 'Status must be one of [pending, completed, cancelled]',
    'any.required': 'Status is required',
  }),
});

module.exports = { createOrderSchema, updateOrderStatusSchema };
