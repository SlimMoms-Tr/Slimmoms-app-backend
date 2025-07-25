import { dailyCollection } from '../db/models/daily.js';
import { productCollection } from '../db/models/product.js';
import { calculateTotalCalories } from '../utils/calculateTotalCalories.js';

export const getAllDaily = async ({ userId, date }) => {
  const entries = await dailyCollection
    .find({ user: userId, date })
    .populate('product');
  return entries;
};

export const createDailyEntry = async ({ userId, productId, weight, date }) => {
  const product = await productCollection.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  const totalCalories = calculateTotalCalories(weight, product.kcalPer100g);

  const entry = await dailyCollection.create({
    user: userId,
    product: productId,
    weight,
    date,
    totalCalories,
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
