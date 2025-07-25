import Joi from 'joi';

export const addProductSchema = Joi.object({
  date: Joi.date().iso().required(),

  productId: Joi.string().required(),
  weight: Joi.number().required().min(1).max(10000),
});

export const getDailySchema = Joi.object({
  date: Joi.string()
    .required()
    .pattern(/^\d{4}-\d{2}-\d{2}$/),
});
  