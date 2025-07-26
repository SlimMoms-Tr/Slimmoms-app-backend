import { dailyCollection } from '../db/models/daily.js';
import { productCollection } from '../db/models/product.js';
import { calculateCalories } from '../utils/calculateCalories.js';

export const publicCalories = async ({
  weight,
  height,
  age,
  gender = 'female',
  targetWeight,
  bloodType,
}) => {
  const dailyCalories = calculateCalories({
    age,
    height,
    weight,
    gender,
    targetWeight,
  });
  const notRecommendedFoods = await productCollection.aggregate([
    { $match: { [`groupBloodNotAllowed.${bloodType}`]: true } },
    { $sample: { size: 4 } },
  ]);
  const dailyData = {
    dailyCalories,
    bloodType,
    notRecommendedFoods: notRecommendedFoods.map((food) => food.title),
  };
  return dailyData;
};
export const privateCalories = async ({
  weight,
  height,
  age,
  gender,
  targetWeight,
  userId,
  date,
  bloodType,
}) => {
  const dailyCalories = calculateCalories({
    age,
    height,
    weight,
    gender,
    targetWeight,
  });
  const notRecommendedFoods = await productCollection.aggregate([
    { $match: { [`groupBloodNotAllowed.${bloodType}`]: true } },
    { $sample: { size: 4 } },
  ]);

  const entry = await dailyCollection.create({
    user: userId,
    weight,
    date,
    totalCalories: dailyCalories,
    notRecommendedFoods: notRecommendedFoods.map((food) => food.title),
    bloodType,
  });
  return entry;
};

export const updateDailyEntry = async (date, userId, product) => {
  return await dailyCollection.updateOne(
    { user: userId, date: date },
    {
      $push: {
        consumedProducts: product,
      },
    },
  );
};
