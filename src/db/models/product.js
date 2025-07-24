


import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  kcalPer100g: { type: Number, required: true },
  category: { type: String },
  notRecommended: { type: Boolean }
});
export const ProductCollection = mongoose.model('Product', productSchema);