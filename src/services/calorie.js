import { calorieCollection } from '../db/models/calorie.js';
import { productCollection } from '../db/models/product.js';
import { calculateCalories } from '../utils/calculateCalories.js';

const getNotRecommendedFoods = async (bloodType) => {
  return await productCollection.aggregate([
    { $match: { [`groupBloodNotAllowed.${bloodType}`]: true } },
    { $sample: { size: 4 } },
  ]);
};

export const publicCalories = async ({
  weight,
  height,
  age,
  targetWeight,
  bloodType,
}) => {
  const dailyCalories = calculateCalories({
    age,
    height,
    weight,
    gender: 'female',
    targetWeight,
  });
  const notRecommendedFoods = await getNotRecommendedFoods(bloodType);
  const dailyData = {
    totalCalories: dailyCalories,
    bloodType,
    notRecommendedFoods: notRecommendedFoods.map((food) => food.title),
  };
  return dailyData;
};

export const privateCalories = async ({
  weight,
  height,
  age,
  targetWeight,
  userId,
  date,
  bloodType,
}) => {
  const dailyCalories = calculateCalories({
    age,
    height,
    weight,
    gender: 'female', 
    targetWeight,
  });
  const notRecommendedFoods = await getNotRecommendedFoods(bloodType);

  const entry = await calorieCollection.create({
    userId: userId,
    weight,
    date,
    totalCalories: dailyCalories,
    notRecommendedFoods: notRecommendedFoods.map((food) => food.title),
    bloodType,
  });
  return entry;
};
