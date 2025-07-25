import { dailyCollection } from '../db/models/daily.js';
import { productCollection } from '../db/models/product.js';

export const getAllDaily = async ({ userId, date }) => {
  const entries = await dailyCollection
    .find({ user: userId, date })
    .populate('product');
  return entries;
};

export const createDailyEntry = async ({ userId, productId, weight, date }) => {
  const entry = await dailyCollection.create({
    user: userId,
    product: productId,
    weight,
    date,
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
