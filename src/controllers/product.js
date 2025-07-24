import { Product } from '../db/models/product.js';

export const searchProducts = async (req, res, next) => {
  try {
    const { q = '' } = req.query;

    const result = await Product.find({
      title: { $regex: q, $options: 'i' },
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};
