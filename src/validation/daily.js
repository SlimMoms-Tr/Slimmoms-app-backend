import Joi from 'joi';
export const getDailyByDateSchema = Joi.object({
  date: Joi.date().iso().required(),
});
export const addProductSchema = Joi.object({
  date: Joi.date().iso().required(),
  productTitle: Joi.string().required(),
  weight: Joi.number().required().min(1).max(10000),
});

export const deleteProductSchema = Joi.object({
  date: Joi.date().iso().required(),
  productId: Joi.string().required(),
});


