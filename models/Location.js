import mongoose from "mongoose";
const locationSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  landmark: {
    type: Array,
    index: true,
    unique: true,
    required: true,
    properties: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
    },
  },
  approved: {
    type: Boolean,
    default: false
  }
});

export const Location = mongoose.model("Location", locationSchema);
