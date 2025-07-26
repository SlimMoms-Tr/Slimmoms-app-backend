import { productCollection } from "../db/models/product";

export const createProduct = async ({ title, kcalPer100g, groupBloodNotAllowed }) => {
  const newProduct = new productCollection({ title, kcalPer100g, groupBloodNotAllowed });
  await newProduct.save();
  return newProduct;
};

export const getAllProducts = async (bloodType) => {
  return await productCollection.find({ [`groupBloodNotAllowed.${bloodType}`]: false });
};
