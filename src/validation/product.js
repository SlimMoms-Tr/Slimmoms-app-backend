import Joi from 'joi';

export const addProductSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  kcalPer100g: Joi.number().min(0).required(),
  groupBloodNotAllowed: Joi.array().items(Joi.boolean()).required(),
});
