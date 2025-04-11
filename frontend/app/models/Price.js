// models/Price.js
import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  market: {
    type: String,
    required: true,
  },
  commodity: {
    type: String,
    required: true,
  },
  variety: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  min_price: {
    type: Number,
    required: true,
  },
  max_price: {
    type: Number,
    required: true,
  },
  modal_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

export default mongoose.models.Price || mongoose.model('Price', priceSchema);
