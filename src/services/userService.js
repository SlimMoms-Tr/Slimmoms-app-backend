export const calculateCalories = ({ height, age, currentWeight, desiredWeight }) => {
  const calories =
    10 * currentWeight + 6.25 * height - 5 * age - 161 - 10 * (currentWeight - desiredWeight);
  return Math.round(calories);
};

export const getNotRecommendedFoods = (bloodType) => {
  const foods = {
    1: ['bread', 'corn', 'pork'],
    2: ['beef', 'ice cream', 'shrimp'],
    3: ['chicken', 'peanuts', 'wheat'],
    4: ['banana', 'lentils', 'red meat'],
  };

  return foods[bloodType] || [];
};
