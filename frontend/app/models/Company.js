import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Company || mongoose.model("Company", companySchema);
