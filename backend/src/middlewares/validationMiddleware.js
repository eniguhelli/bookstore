const { registerSchema, loginSchema } = require('../validations/authValidation');
const { createBookSchema, updateBookSchema } = require('../validations/bookValidation');
const {createCategorySchema, updateCategorySchema} = require('../validations/categoryValidation');
const { createOrderSchema, updateOrderSchema } = require('../validations/orderValidation');

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
}

function validateRegister(req, res, next) {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

function validateLogin(req, res, next) {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = {
  validateRegister,
  validateLogin,
  validateBody,
  createBookSchema,
  updateBookSchema,
  createCategorySchema,
  updateCategorySchema,
  createOrderSchema,
  updateOrderSchema
};
