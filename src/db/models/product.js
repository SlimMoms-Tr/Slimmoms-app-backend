import mongoose, { model } from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    kcalPer100g: { type: Number, required: true },
    category: { type: String, required: true },
    notRecommended: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const productCollection = model('products', productSchema);
