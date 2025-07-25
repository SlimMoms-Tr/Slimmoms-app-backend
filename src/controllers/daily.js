import { getAllDaily, createDailyEntry, deleteDailyEntry } from '../services/daily.js';
import createHttpError from 'http-errors';

export const getAllProductController = async (req, res, next) => {
  const userId = req.user?._id;
  const { date } = req.query;

  if (!date) {
    throw createHttpError(400, 'Date is required');
  }

  const entries = await getAllDaily({ userId, date });

  res.json({
    status: 200,
    message: 'Successfully retrieved all products!',
    data: entries,
  });
};

export const addProductController = async (req, res, next) => {
  const userId = req.user._id;
  const { date, productId, weight } = req.body;

  if (!date || !productId || !weight) {
    throw createHttpError(400, 'Date, productId, and weight are required');
  }

  const entry = await createDailyEntry({
    userId,
    productId,
    weight,
    date
  });

  res.json({
    status: 201,
    message: 'Product added successfully!',
    data: entry
  });
};

export const deleteProductController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (!id) {
    throw createHttpError(400, 'Entry ID is required');
  }

  const entry = await deleteDailyEntry(id, userId);

  if (!entry) {
    throw createHttpError(404, 'Entry not found');
  }

  res.json({
    status: 200,
    message: 'Product deleted successfully!'
  });
};
