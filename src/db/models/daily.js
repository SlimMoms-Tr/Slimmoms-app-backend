import mongoose, { model } from 'mongoose';

const dailySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    weight: { type: Number, required: true },
    date: { type: String, required: true },
    totalCalories: { type: Number, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const dailyCollection = model('dailyEntry', dailySchema);
