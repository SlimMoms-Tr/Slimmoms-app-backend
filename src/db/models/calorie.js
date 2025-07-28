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
    totalCalories: { type: Number, required: true },
    notRecommendedFoods: { type: [String], required: true },

  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const calorieCollection = model('calorieEntry', calorieSchema);
