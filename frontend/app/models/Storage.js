import mongoose from 'mongoose';

const StorageSchema = new mongoose.Schema({
  location: String,
  capacity: String,
  price: String,
  contact: String,
  description: String,
}, {
  timestamps: true,
});

export default mongoose.models.Storage || mongoose.model('Storage', StorageSchema);
