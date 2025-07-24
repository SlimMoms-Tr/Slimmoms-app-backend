export const calculateCalories = ({ height, age, currentWeight, desiredWeight }) => {
  const calories = 10 * currentWeight + 6.25 * height - 5 * age;
  return Math.round(calories);
};

export const getNotRecommendedFoods = (bloodType) => {
  const foodsByBloodType = {
    1: ['bread', 'pasta'],
    2: ['meat', 'milk'],
    3: ['corn', 'tomato'],
    4: ['banana', 'orange'],
  };

  return foodsByBloodType[bloodType] || [];
};

import productsData from '../data/products.js';

export const searchProducts = (searchTerm) => {
  const lowerSearch = searchTerm.toLowerCase();
  return productsData.filter(product =>
    product.title.toLowerCase().includes(lowerSearch)
  );
};
