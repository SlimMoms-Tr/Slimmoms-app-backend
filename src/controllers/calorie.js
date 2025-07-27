import {
  publicCalories,
  privateCalories,
} from '../services/calorie.js';

export const getPublicCaloriesController = async (req, res, next) => {
  const { weight, height, age, gender, targetWeight, bloodType } = req.body;

  const dailyData = await publicCalories({
    weight,
    height,
    age,
    gender,
    targetWeight,
    bloodType,
  });

  res.json({
    status: 200,
    message: 'Successfully retrieved public calories!',
    data: dailyData,
  });
};

export const privateCaloriesController = async (req, res, next) => {
  const userId = req.user._id;
  const gender = req.user.gender;
  const { weight, height, age, targetWeight, bloodType, date } = req.body;
  console.log('Received data:', userId);
  const entry = await privateCalories({
    weight,
    height,
    age,
    gender,
    targetWeight,
    bloodType,
    userId,
    date,
  });

  res.json({
    status: 201,
    message: 'Successfully created private calories!',
    data: entry,
  });
};
