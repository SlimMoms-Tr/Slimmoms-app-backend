import {
  addProductDaily,
  deleteProductDaily
} from '../services/daily.js';
import {  getProductById } from '../services/product.js';
import createHttpError from 'http-errors';



export const addProductDailyController = async (req, res, next) => {
  const userId = req.user._id;
  const { date, productId, weight } = req.body;

  if (!date || !productId || !weight) {
    throw createHttpError(400, 'Date, productId, and weight are required');
  }

  const product = await getProductById(productId);

  if (!product) {
    throw createHttpError(400, 'Product not found');
  }

  let productId2 = product._id.toString();

  let title = product.title;
  let calories = (weight * product.calories) / 100;
  calories = Math.ceil(calories);
  let productLet = {
    productId: productId2,
    weight,
    title,
    calories,
  };
  const entry = await addProductDaily(date, userId, productLet);

  res.status(201).json({
    status: 201,
    message: 'Product added successfully!',
    data: entry,
  });
};
export const deleteProductDailyController = async (req, res, next) => {
  const userId = req.user._id.toString();
  const { date, productId } = req.body;

  if (!date || !productId) {
    throw createHttpError(400, 'Date and productId are required');
  }

  const result = await deleteProductDaily(date, userId, productId);



  const entry = await deleteProductDaily(date, userId, productId);
    if (result.matchedCount === 0) {
      throw createHttpError(404, 'No daily entry found for this user and date');
    }

    if (result.modifiedCount === 0) {
      throw createHttpError(404, 'Product not found in consumed products');
    }

  res.status(200).json({
    status: 200,
    message: 'Product deleted successfully!',
    data: entry,
  });
};
