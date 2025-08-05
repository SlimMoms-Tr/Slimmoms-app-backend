import { productCollection } from '../db/models/product.js';

export const createProduct = async (productData) => {
  const newProduct = await productCollection.create(productData);
  return newProduct;
};

export const getProductById = async (id) => {
  return await productCollection.findById(id);
};

export const getAllProducts = async (bloodType) => {
  return await productCollection.find({
    [`groupBloodNotAllowed.${bloodType}`]: false,
  });
};

export const searchProducts = async (searchQuery) => {
  const regex = new RegExp(searchQuery, 'i');
  return await productCollection.find({ title: regex }).limit(10);
};
