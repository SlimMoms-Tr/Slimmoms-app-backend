import { calculateCalories, getNotRecommendedFoods, searchProducts } from '../services/public.service.js';

export const calculateCaloriesAndProducts = async (req, res, next) => {
  try {
    const { height, age, currentWeight, desiredWeight, bloodType } = req.query;

    const calories = calculateCalories({ height, age, currentWeight, desiredWeight });
    const notRecommendedFoods = getNotRecommendedFoods(Number(bloodType));

    res.status(200).json({
      calories,
      notRecommendedFoods,
    });
  } catch (error) {
    next(error);
  }
};


export const searchPublicProducts = async (req, res, next) => {
  try {
    const { search = '' } = req.query;
    const products = searchProducts(search);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
