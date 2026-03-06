import mongoose from 'mongoose';

const StorageSchema = new mongoose.Schema({
  location: String,
  capacity: String,
  price: String,
  contact: String,
  description: String,

  coordinates: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
    }
  }

},{
  timestamps:true
});

StorageSchema.index({ coordinates: "2dsphere" });

export default mongoose.models.Storage || mongoose.model("Storage", StorageSchema);