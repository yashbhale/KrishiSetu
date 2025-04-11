import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    location: String,
    type: String, // e.g., Truck, Tempo, Tractor
    capacity: String,
    price: String,
    contact: String,
    description: String,
  },
  { timestamps: true }
);

const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
