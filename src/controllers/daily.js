import {
  publicCalories,
  privateCalories,
  updateDailyEntry,
} from '../services/daily.js';
import { createProduct, getAllProducts } from '../services/product.js';
import createHttpError from 'http-errors';

export const getPublicCaloriesController = async (req, res, next) => {
  const { weight, height, age, gender, targetWeight, bloodType } = req.body;

  const dailyData = await publicCalories({
    weight,
    height,
    age,
    gender,
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
  const gender = req.user.gender;
  const { weight, height, age, targetWeight, bloodType, date } = req.body;
  console.log('Received data:', userId);
  const entry = await privateCalories({
    weight,
    height,
    age,
    gender,
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

export const addProductController = async (req, res, next) => {
  const userId = req.user._id;
  const { date, productTitle, weight } = req.body;

  if (!date || !productTitle || !weight) {
    throw createHttpError(400, 'Date, productTitle, and weight are required');
  }

  const products = await getAllProducts(productTitle);

  if (!products) {
    throw createHttpError(400, 'Products not found');
  }

  let productId = products[0]._id.toString();

  let title = products[0].title;
  let calories = (weight * products[0].calories) / 100;
  calories = Math.ceil(calories);
  let product = {
    productId,
    weight,
    title,
    calories,
  };
  const entry = await updateDailyEntry(date, userId, product);

  res.status(201).json({
    status: 201,
    message: 'Product added successfully!',
    data: entry,
  });
};
