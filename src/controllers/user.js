import { calculateCalories, getNotRecommendedFoods } from '../services/publicService.js';
import User from '../models/User.js';

export const calculateAndSaveUserCalories = async (req, res, next) => {
  try {
    const { height, age, currentWeight, desiredWeight, bloodType } = req.body;
    const { _id: userId } = req.user;

    const calories = calculateCalories({ height, age, currentWeight, desiredWeight });
    const notRecommendedFoods = getNotRecommendedFoods(Number(bloodType));

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        dailyRate: calories,
        notAllowedProducts: notRecommendedFoods,
      },
      { new: true }
    );

    res.status(200).json({
      calories: updatedUser.dailyRate,
      notRecommendedFoods: updatedUser.notAllowedProducts,
    });
  } catch (error) {
    next(error);
  }
};
