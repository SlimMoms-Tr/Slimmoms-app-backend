import {
  calculateCalories,
  getNotRecommendedFoods,
} from '../services/publicService.js';
import User from '../db/models/userInfo.js';

export const getDailyCaloriesPrivate = async (req, res, next) => {
  const { height, age, currentWeight, desiredWeight, bloodType } = req.body;
  const userId = req.user.id;

  const calories = calculateCalories({
    height,
    age,
    currentWeight,
    desiredWeight,
  });
  const notRecommendedFoods = getNotRecommendedFoods(Number(bloodType));

  await User.create(userId, {
    dailyCalories: calories,
    notRecommendedFoods,
  });

  res.status(200).json({
    calories,
    notRecommendedFoods,
  });
};
