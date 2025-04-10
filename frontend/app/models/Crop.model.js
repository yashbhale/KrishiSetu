import mongoose from 'mongoose';
import User from './User'; // Import User model

const CropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageurl: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
    location: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Crop || mongoose.model('Crop', CropSchema);