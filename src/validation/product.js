import Joi from 'joi';

export const getAllProductsSchema = Joi.object({
  bloodType: Joi.number().valid(1, 2, 3, 4).required(),
});

export const postProductSchema = Joi.object({
  title: Joi.string().required(),
  calories: Joi.number().required(),
  groupBloodNotAllowed: Joi.array().items(Joi.boolean()).length(4).required(),
});

export const searchProductsSchema = Joi.object({
  search: Joi.string().min(1).required(),
});
