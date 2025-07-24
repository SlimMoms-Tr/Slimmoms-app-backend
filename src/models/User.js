
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  height: Number,
  age: Number,
  currentWeight: Number,
  desiredWeight: Number,
  bloodType: Number,
  dailyCalories: Number,
  notRecommendedFoods: [String],
});

const User = mongoose.model('User', userSchema);
export default User;
