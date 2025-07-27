import { dailyCollection } from '../db/models/daily.js';



export const addProductDaily = async (date, userId, product) => {
  return await dailyCollection.updateOne(
    { userId: userId, date },
    { $push: { consumedProducts: product } },
    {
      upsert: true,
      runValidators: true,
    }
  );
};

export const deleteProductDaily = async (date, userId, productId) => {
  return await dailyCollection.updateOne(
    { userId: userId, date },
    { $pull: { consumedProducts: { _id: productId } } },
    { runValidators: true }
  );
};
