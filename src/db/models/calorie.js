import { model, Schema } from 'mongoose';


const calorieSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bloodType: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true,
    },
    date: { type: String, required: true, default: new Date().toISOString().split('T')[0] },
    totalCalories: { type: Number, required: true },
    notRecommendedFoods: { type: [String], required: true },
    consumedProducts: [
  {
    title: { type: String, required: true },
    weight: { type: Number, required: true },
    calories: { type: Number, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
  }
]
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const calorieCollection = model('calorieEntry', calorieSchema);
