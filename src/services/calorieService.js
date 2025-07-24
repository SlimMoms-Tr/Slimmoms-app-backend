import Product from '../db/models/product.js';

export const getNotRecommendedProducts = async (bloodType) => {
  const products = await Product.find({ [`groupBloodNotAllowed.${bloodType}`]: true });
  return products;
};
