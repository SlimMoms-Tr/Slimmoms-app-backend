export const calculateTotalCalories = (weight, kcalPer100g) => {
  if (typeof weight !== 'number' || typeof kcalPer100g !== 'number') {
    throw new Error('weight and kcalPer100g should be numerical values.');
  }
  if (weight < 0 || kcalPer100g < 0) return 0;

  return (weight * kcalPer100g) / 100;
};
