export const calculateCalories = ({ height, weight, age, gender, targetWeight }) => {

  let bmr =
    gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const adjustment = -10 * (weight - targetWeight);
  const dailyCalories = bmr + adjustment;

  return Math.round(dailyCalories);
};
