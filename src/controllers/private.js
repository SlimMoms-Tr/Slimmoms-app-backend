import { calculateCalories, getNotRecommendedFoods } from '../services/public.service.js';
import User from '../models/User.js';

export const getDailyCaloriesPrivate = async (req, res, next) => {
  try {
    const { height, age, currentWeight, desiredWeight, bloodType } = req.body;
    const userId = req.user.id;

    const calories = calculateCalories({ height, age, currentWeight, desiredWeight });
    const notRecommendedFoods = getNotRecommendedFoods(Number(bloodType));

    await User.findByIdAndUpdate(userId, {
      dailyCalories: calories,
      notRecommendedFoods,
    });

    res.status(200).json({
      calories,
      notRecommendedFoods,
    });
  } catch (error) {
    next(error);
  }
};
