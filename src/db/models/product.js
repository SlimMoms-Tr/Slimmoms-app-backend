
import { model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    calories: { type: Number, required: true },
    groupBloodNotAllowed: {
      type: [Boolean],
      required: true,
      default: [null, false, false, false, false],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const productCollection = model('products', productSchema);
