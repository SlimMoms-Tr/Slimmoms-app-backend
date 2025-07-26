import { productCollection } from "../db/models/product.js";

export const createProduct = async ({ title, calories, groupBloodNotAllowed }) => {
  const newProduct = new productCollection({ title, calories, groupBloodNotAllowed });
  await newProduct.save();
  return newProduct;
};

export const getAllProducts = async ( title) => {
  return await productCollection.find({
    title: title
  });
};
