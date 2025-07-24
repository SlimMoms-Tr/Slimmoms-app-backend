
import Joi from 'joi';

export const privateSchema = Joi.object({
  height: Joi.number().required(),
  age: Joi.number().required(),
  currentWeight: Joi.number().required(),
  desiredWeight: Joi.number().required(),
  bloodType: Joi.number().valid(1, 2, 3, 4).required(),
});
