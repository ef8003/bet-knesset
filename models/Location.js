import mongoose from "mongoose";
const locationSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  landmark: {
    type: Array,
    properties: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
    },
  },
  approved: {
    type: Boolean
  }
});
locationSchema.index({ landmark: { unique: true } });
export const Location = mongoose.model("Location", locationSchema);
