import {
  createProduct,
  getAllProducts,
  searchProducts,
} from '../services/product.js';
import createHttpError from 'http-errors';

export const getAllProductController = async (req, res, next) => {
  const bloodType = req.user?.bloodType;

  if (!bloodType) {
    throw createHttpError(400, 'Blood type is required');
  }

  const entries = await getAllProducts(bloodType);

  res.json({
    status: 200,
    message: 'Successfully retrieved all products!',
    data: entries,
  });
};

export const postProductController = async (req, res, next) => {
  const { title, calories, groupBloodNotAllowed } = req.body;

  if (!title || !calories || !groupBloodNotAllowed) {
    throw createHttpError(400, 'All fields are required');
  }

  const newProduct = await createProduct({
    title,
    calories,
    groupBloodNotAllowed,
  });

  res.status(201).json({
    status: 201,
    message: 'Product created successfully!',
    data: newProduct,
  });
};

export const searchProductsController = async (req, res, next) => {
  const { search } = req.query;

  console.log('Search query received:', search);

  if (!search) {
    throw createHttpError(400, 'Search query is required');
  }

  const products = await searchProducts(search);

  console.log('Products found:', products.length);

  res.json({
    status: 200,
    message: 'Products found successfully!',
    data: products,
  });
};
