const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
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
});

const kcalConsumedSchema = new mongoose.Schema({
  food: {
    type: foodSchema,
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },
});

const exerciseSchema = new mongoose.Schema({
  excercise: String,
  time_done: Number,
  kcal_min: Number,
});

const userNutritionSchema = new mongoose.Schema(
  {
    kcal_consumed_eaten: {
      type: [kcalConsumedSchema],
      default: [],
    },
    excercise_done: {
      type: [exerciseSchema],
      default: [],
    },
    kcal_burnt: {
      type: Number,
      required: true,
      default: 0,
    },
    total_kcal_left: {
      type: Number,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const NutritionModel = mongoose.model("nutritionIntake", userNutritionSchema);

module.exports = { NutritionModel };
//*test model data
/*{
  kcal_consumed_eaten: [
    {
      food: [
        {
          name: "Chicken breast",
          kcal: 231
        },
        {
          name: "Broccoli",
          kcal: 55
        }
      ],
      quantity: 2
    },
    {
      food: [
        {
          name: "Brown rice",
          calories: 218
        }
      ],
      quantity: 1
    }
  ],
  excercise_done: [
    {
      excercise: "Running",
      time_done: 30
    },
    {
      excercise: "Weight lifting",
      time_done: 45
    }
  ],
  total_excercise_time_done: 75,
  kcal_burnt: 700,
  total_kcal_left: 300,
  userID: "1234"
}*/

/* 


!function to check calories consumed
function calculateTotalCaloriesConsumed(nutritionData) {
  let totalCaloriesConsumed = 0;
  for (const item of nutritionData.kcal_consumed_eaten) {
    for (const food of item.food) {
      totalCaloriesConsumed += food.calories * item.quantity;
    }
  }
  return totalCaloriesConsumed;
}

*/
