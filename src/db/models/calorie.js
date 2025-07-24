import mongoose from 'mongoose';

const calorieSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  calories: { type: Number, required: true },
  notRecommendedFoods: { type: [String], required: true },
}, { timestamps: true });

export const Calorie = mongoose.model('Calorie', calorieSchema);
