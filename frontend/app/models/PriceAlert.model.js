import mongoose from "mongoose";

const PriceAlertSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  commodity:String,
  targetPrice:Number,
  phone:String

},{timestamps:true})

export default mongoose.models.PriceAlert ||
mongoose.model("PriceAlert",PriceAlertSchema)