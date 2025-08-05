import {
  getDailyByDate,
  addProductDaily,
  deleteProductDaily,
} from '../services/daily.js';
import { getProductById } from '../services/product.js';
import createHttpError from 'http-errors';

export const getDailyByDateController = async (req, res, next) => {
  const userId = req.user._id.toString();
  const { date } = req.query;

  if (!date) {
    throw createHttpError(400, 'Date is required');
  }

  const entry = await getDailyByDate(date, userId);

  if (!entry) {
    const emptyEntry = {
      userId: userId,
      date: date,
      consumedProducts: [],
      totalCalories: 0,
    };

    res.status(200).json({
      status: 200,
      message: 'Daily entry retrieved successfully!',
      data: emptyEntry,
    });
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Daily entry retrieved successfully!',
    data: entry,
  });
};

export const addProductDailyController = async (req, res, next) => {
  const userId = req.user._id.toString();
  const { date, productId, weight } = req.body;

  if (!date || !productId || !weight) {
    throw createHttpError(400, 'Date, productId, and weight are required');
  }

  const product = await getProductById(productId);

  if (!product) {
    throw createHttpError(400, 'Product not found');
  }

  let title = product.title;
  let calories = (weight * product.calories) / 100;
  calories = Math.ceil(calories);
  let productLet = {
    productId: product._id,
    weight,
    title,
    calories,
  };

  // Önce mevcut entry'yi kontrol et
  const existingEntry = await getDailyByDate(date, userId);
  const existingProduct = existingEntry?.consumedProducts?.find(
    (p) => p.productId.toString() === product._id.toString(),
  );

  await addProductDaily(date, userId, productLet);

  const updatedEntry = await getDailyByDate(date, userId);

  const message = existingProduct
    ? 'Product quantity updated successfully!'
    : 'Product added successfully!';

  res.status(201).json({
    status: 201,
    message: message,
    data: updatedEntry,
  });
};

export const deleteProductDailyController = async (req, res, next) => {
  const userId = req.user._id.toString();
  const { date, productId } = req.body;

  if (!date || !productId) {
    throw createHttpError(400, 'Date and productId are required');
  }

  const result = await deleteProductDaily(date, userId, productId);

  if (result.matchedCount === 0) {
    throw createHttpError(404, 'No daily entry found for this user and date');
  }

  if (result.modifiedCount === 0) {
    throw createHttpError(404, 'Product not found in consumed products');
  }

  const updatedEntry = await getDailyByDate(date, userId);

  res.status(200).json({
    status: 200,
    message: 'Product deleted successfully!',
    data: updatedEntry,
  });
};
