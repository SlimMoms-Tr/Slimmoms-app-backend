import DailyRate from '../../models/DailyRate.js';
import productsData from '../../data/products.js';

export const calculateDailyRate = async (req, res) => {
  const { height, age, currentWeight, desiredWeight, bloodType } = req.body;
  const userId = req.user._id;

  const dailyCalories = 10 * currentWeight + 6.25 * height - 5 * age - 161;

  const notAllowedProducts = productsData
    .filter((item) => item.notRecommended === true)
    .map((item) => item.title);

  await DailyRate.create({
    user: userId,
    height,
    age,
    currentWeight,
    desiredWeight,
    bloodType,
    dailyCalories: Math.round(dailyCalories),
    notAllowedProducts,
  });

  res.status(201).json({
    dailyCalories: Math.round(dailyCalories),
    notAllowedProducts,
  });
};
