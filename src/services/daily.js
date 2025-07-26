import { dailyCollection } from '../db/models/daily.js';
import { productCollection } from '../db/models/product.js';
import { calculateCalories } from '../utils/calculateCalories.js';



export const publicCalories = async ( {weight, height, age, gender="female", targetWeight,bloodType}) => {
  const dailyCalories = calculateCalories({ age, height, weight, gender, targetWeight });
  const notRecommendedFoods = await productCollection.aggregate([
  { $match: { [`groupBloodNotAllowed.${bloodType}`]: true } },
  { $sample: { size: 4 } }
]);
 const  dailyData = {
    dailyCalories,
    notRecommendedFoods: notRecommendedFoods.map(food => food.title),
  };
  return dailyData;

};

export const getDailySchema = {
  query: {
    date: {
      in: ['query'],
      isString: true,
      errorMessage: 'Date must be a string',
    },
  },
};
export const addProductSchema = {
  body: {
    date: {
      in: ['body'],
      isString: true,
      errorMessage: 'Date must be a string',
    },
    productId: {
      in: ['body'],
      isMongoId: true,
      errorMessage: 'Product ID must be a valid MongoDB ObjectId',
    },
    weight: {
      in: ['body'],
      isNumeric: true,
      errorMessage: 'Weight must be a number',
    },
  },
};
export const getAllDaily = async ({ userId, date }) => {
  const entries = await dailyCollection
    .find({ user: userId, date })
    .populate('product');
  return entries;
};



export const privateCalories = async ({ weight, height, age, gender, targetWeight,userId,date, bloodType }) => {

  const dailyCalories = calculateCalories({ age, height, weight, gender, targetWeight });
  const notRecommendedFoods = await productCollection.aggregate([
  { $match: { [`groupBloodNotAllowed.${bloodType}`]: true } },
  { $sample: { size: 4 } }
]);



   const entry = await dailyCollection.create({
    user: userId,
    weight,
    date,
    totalCalories: dailyCalories,
    notRecommendedFoods:  notRecommendedFoods.map(food => food.title),
  });
  return entry;

};

export const createDailyEntry = async ({weight, height, age, gender="female", targetWeight,bloodType,date,userId}) => {
    const dailyCalories = calculateCalories({ age, height, weight, gender, targetWeight });
const notRecommendedFoods = await productCollection.aggregate([
  { $match: { [`groupBloodNotAllowed.${bloodType}`]: true } },
  { $sample: { size: 4 } }
]);
 const  dailyData = {
    dailyCalories,
    notRecommendedFoods: notRecommendedFoods.map(food => food.title),
  };
  const entry = await dailyCollection.create({
    date,
    weight,
    totalCalories: dailyData.dailyCalories,
    notRecommendedFoods: dailyData.notRecommendedFoods,
    user: userId,
  });
  return entry;
};

export const deleteDailyEntry = async (id, userId) => {
  const entry = await dailyCollection.findOneAndDelete({
    _id: id,
    user: userId,
  });

  return entry;
};
