const mongoose = require("mongoose");
const meatSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    kcal: { type: Number, required: true },
    carb: { type: Number, required: true },
    protein: { type: Number, required: true },
    vitA: { type: Number, required: true },
    vitD: { type: Number, required: true },
    vitC: { type: Number, required: true },
    vitE: { type: Number, required: true },
    mineral: { type: Number, required: true },
    fat: { type: Number, required: true },
    potassium: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);
const MeatModel = mongoose.model("food-meat", meatSchema);
module.exports = { MeatModel };
