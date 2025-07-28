import { createProduct,getAllProducts } from "../services/product";
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
  const { title, kcalPer100g, groupBloodNotAllowed } = req.body;

  if (!title || !kcalPer100g || !groupBloodNotAllowed) {
    throw createHttpError(400, 'All fields are required');
  }

  const newProduct = await createProduct({ title, kcalPer100g, groupBloodNotAllowed });

  res.status(201).json({
    status: 201,
    message: 'Product created successfully!',
    data: newProduct,
  });
};

