import { calculateCalories, getNotRecommendedFoods } from '../services/publicService.js';
import { saveUserCalorieInfo } from '../services/calorieService.js';

export const postPrivateCalorieInfo = async (req, res, next) => {
  try {
    const { height, age, currentWeight, desiredWeight, bloodType } = req.body;
    const userId = req.user.id;

    const calories = calculateCalories({ height, age, currentWeight, desiredWeight });
    const notRecommendedFoods = getNotRecommendedFoods(Number(bloodType));

    const result = await saveUserCalorieInfo({ userId, calories, notRecommendedFoods });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
