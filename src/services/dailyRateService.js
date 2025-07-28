import DailyRate from '../db/models/dailyRate.js';

export const saveDailyRate = async ({
  owner,
  dailyCalories,
  notRecommendedProducts,
}) => {
  await DailyRate.findOneAndDelete({ owner });

  const newEntry = await DailyRate.create({
    owner,
    dailyCalories,
    notRecommendedProducts,
  });

  return newEntry;
};
