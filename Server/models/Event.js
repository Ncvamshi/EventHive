import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  rate: { type: String, required: true },
  logo: { type: String }, // URL for the logo
  description: { type: String },
});

const Event = mongoose.model("Event", eventSchema);

export default Event; // Export the model as default
