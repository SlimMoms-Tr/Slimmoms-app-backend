export const calculateCalories = ({
  height,
  weight,
  age,
  gender,
  targetWeight,
}) => {
  // Mifflin-St Jeor BMR formülü (kadınlar için)
  const bmr = 10 * weight + 6.25 * height - 5 * age - 161;

  // Activity level (sedentary - hafif aktif)
  const activityMultiplier = 1.2; // Sedentary (oturarak çalışan)

  // TDEE (Total Daily Energy Expenditure)
  const tdee = bmr * activityMultiplier;

  // Weight loss adjustment (500-1000 kcal deficit)
  const weightDifference = weight - targetWeight;
  let calorieDeficit = 0;

  if (weightDifference > 0) {
    // Kilo vermek istiyor
    calorieDeficit = Math.min(750, weightDifference * 10); // Güvenli deficit
  } else if (weightDifference < 0) {
    // Kilo almak istiyor
    calorieDeficit = Math.max(-500, weightDifference * 5); // Kontrollü artış
  }

  const dailyCalories = tdee + calorieDeficit;

  // Minimum güvenli kalori (1200 kcal)
  const minCalories = 1200;
  const finalCalories = Math.max(minCalories, dailyCalories);

  return Math.round(finalCalories);
};
