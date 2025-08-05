import { dailyCollection } from '../db/models/daily.js';
import mongoose from 'mongoose';

export const getDailyByDate = async (date, userId) => {
  return await dailyCollection.findOne({ userId: userId, date });
};

export const addProductDaily = async (date, userId, product) => {
  // Önce aynı productId'ye sahip ürün var mı kontrol et
  const existingEntry = await dailyCollection.findOne({ userId: userId, date });

  if (existingEntry && existingEntry.consumedProducts) {
    const existingProduct = existingEntry.consumedProducts.find(
      (p) => p.productId.toString() === product.productId.toString(),
    );

    if (existingProduct) {
      // Aynı ürün varsa gramını artır ve kalorileri güncelle
      const newWeight = existingProduct.weight + product.weight;
      const newCalories = Math.ceil(
        (newWeight * product.calories) / product.weight,
      );

      return await dailyCollection.updateOne(
        { userId: userId, date },
        {
          $set: {
            'consumedProducts.$[elem].weight': newWeight,
            'consumedProducts.$[elem].calories': newCalories,
          },
        },
        {
          arrayFilters: [{ 'elem.productId': product.productId }],
          runValidators: true,
        },
      );
    }
  }

  return await dailyCollection.updateOne(
    { userId: userId, date },
    { $push: { consumedProducts: product } },
    {
      upsert: true,
      runValidators: true,
    },
  );
};

export const deleteProductDaily = async (date, userId, productId) => {
  const objectId = new mongoose.Types.ObjectId(productId);

  const result = await dailyCollection.updateOne(
    { userId: userId, date },
    { $pull: { consumedProducts: { _id: objectId } } },
    { runValidators: true },
  );

  return result;
};
