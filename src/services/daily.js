import { dailyCollection } from '../db/models/daily.js';
import { productCollection } from '../db/models/product.js';
import { calculateCalories } from '../utils/calculateCalories.js';



export const addProductDaily = async (date, userId, product) => {
  return await dailyCollection.updateOne(
    { user: userId, date: date },
    {
      $push: {
        consumedProducts: product,
      },
    },
  );
};
