import { publicCalories, privateCalories } from '../services/calorie.js';
import { calorieCollection } from '../db/models/calorie.js';

export const postPublicCaloriesController = async (req, res, next) => {
  const { weight, height, age, targetWeight, bloodType } = req.body;

  const dailyData = await publicCalories({
    weight,
    height,
    age,
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
  const { weight, height, age, targetWeight, bloodType, date } = req.body;

  const entry = await privateCalories({
    weight,
    height,
    age,
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

export const getUserCaloriesController = async (req, res, next) => {
  const userId = req.user._id;

  const latestEntry = await calorieCollection
    .findOne({ userId })
    .sort({ createdAt: -1 });

  if (!latestEntry) {
    return res.json({
      status: 200,
      message: 'No calorie calculation found for user',
      data: {
        totalCalories: 0,
        notRecommendedFoods: [],
        bloodType: null,
      },
    });
  }

  res.json({
    status: 200,
    message: 'Successfully retrieved user calories!',
    data: {
      totalCalories: latestEntry.totalCalories,
      notRecommendedFoods: latestEntry.notRecommendedFoods,
      bloodType: latestEntry.bloodType,
    },
  });
};
