const mongoose = require("mongoose");
const planSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    tag: { type: String, required: true },
    features: { type: Array, required: true },
    price_month: { type: Number, required: true },
    price_Year: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);
const PlanModel = mongoose.model("plan", planSchema);
module.exports = { PlanModel };
