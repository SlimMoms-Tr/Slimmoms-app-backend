import mongoose from 'mongoose';

const dailyRateSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dailyCalories: {
      type: Number,
      required: true,
    },
    notRecommendedProducts: [
      {
        id: String,
        title: String,
      },
    ],
  },
  { timestamps: true }
);

const DailyRate = mongoose.model('DailyRate', dailyRateSchema);

export default DailyRate;
