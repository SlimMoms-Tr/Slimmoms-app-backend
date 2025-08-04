import Joi from 'joi';
export const postPublicDailySchema = Joi.object({

  weight: Joi.number().required(),
  height: Joi.number().required(),
  age: Joi.number().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  targetWeight: Joi.number().required(),
  bloodType: Joi.number().valid(1, 2, 3, 4).required(),
});

export const postPrivateDailySchema = Joi.object({
  weight: Joi.number().required(),
  height: Joi.number().required(),
  age: Joi.number().required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  targetWeight: Joi.number().required(),
  bloodType: Joi.number().valid(1, 2, 3, 4).required(),
  date: Joi.date().iso().required(),

});
