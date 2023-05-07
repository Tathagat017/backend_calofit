const mongoose = require("mongoose");

const excerciseSchema = new mongoose.Schema(
  {
    excerciseType: {
      type: String,
      required: true,
    },
    hard_kcal_min: {
      type: Number,
      required: true,
    },
    easy_kcal_min: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const ExcerciseModel = mongoose.model("excercise", excerciseSchema);

module.exports = { ExcerciseModel };
