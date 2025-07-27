import { productCollection } from "../db/models/product.js";

export const createProduct = async ({ title, calories, groupBloodNotAllowed }) => {
  const newProduct = new productCollection({ title, calories, groupBloodNotAllowed });
  await newProduct.save();
  return newProduct;
};
export const getProductById = async (id) => {
  return await productCollection.findById(id);
};
