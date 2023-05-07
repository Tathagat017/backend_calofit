const express = require("express");
const {
  NutritionModel,
} = require("../Model/Nutrition_Model/NutritionUserModel");

const nutritionRouter = express.Router();
//GET ALL Users nutritions
nutritionRouter.get("/", async function (req, res) {
  try {
    let all_users_data = await NutritionModel.find();
    res.status(200).send(all_users_data);
  } catch (err) {
    res.status(409).send({ err: err.message });
  }
});

//GET Specific all data for all  Users  ( for internal use only)

nutritionRouter.get("/getuserdata", async function (req, res) {
  const { userID } = req.body;
  try {
    let users_data = await NutritionModel.findOne({ userID: userID });
    if (users_data) {
      let totalCalorieConsumed = 0;
      users_data.kcal_consumed_eaten.forEach((item) => {
        totalCalorieConsumed += item.food.kcal * item.quantity;
      });

      let totalExercise = 0;
      users_data.excercise_done.forEach((exercise) => {
        totalExercise += exercise.time_done * exercise.kcal_min;
      });

      let total_calorie_left = 0;

      total_calorie_left = totalCalorieConsumed - totalExercise;

      if (total_calorie_left < 0) {
        total_calorie_left = 0;
      }

      let complete_user_data = {
        users_data,
        totalCalorieConsumed,
        totalExercise,
        total_calorie_left,
      };

      res.status(200).send(complete_user_data);
    } else {
      res.status(404).send({ error: "No Data Found on this user" });
    }
  } catch (err) {
    res.status(409).send({ err: err.message });
  }
});

//Post Specific Users data
nutritionRouter.post("/add", async function (req, res) {
  const { userID } = req.body;
  console.log(userID);
  try {
    let user = await NutritionModel.findOne({ userID: userID });
    if (!user) {
      let users_data = new NutritionModel(req.body);
      await users_data.save();
      res.status(200).send(users_data);
    } else {
      res
        .status(403)
        .send({ msg: "user data already present, please make patch request" });
    }
  } catch (err) {
    res.status(409).send({ err: err.message });
  }
});

//Patch Specific user data
nutritionRouter.patch("/update", async function (req, res) {
  const { userID } = req.body;
  try {
    let user_data = await NutritionModel.findOne({ userID: userID });
    if (user_data) {
      const id = user_data._id;
      let new_user_data = await NutritionModel.findByIdAndUpdate(id, req.body);
      new_user_data.save();
      res
        .status(200)
        .send({ message: "new patched successfully , user data updated" });
    } else {
      res
        .status(403)
        .send({ msg: "please make a post request as no user data available" });
    }
  } catch (err) {
    res
      .status(404)
      .send({ error: `patch unsuccessful, encountered error : ${err}` });
  }
});

//delete user data
nutritionRouter.delete("/delete", async function (req, res) {
  const { userID } = req.body;
  try {
    let user_data = await NutritionModel.findOne({ userID: userID });
    if (user_data) {
      const id = user_data._id;
      let new_user_data = await NutritionModel.findByIdAndDelete(id);
      new_user_data.save();
      res.status(200).send({ message: "user data deleted" });
    } else {
      res.status(403).send({ msg: "user not found !!" });
    }
  } catch (err) {
    res
      .status(404)
      .send({ error: `delete unsuccessful, encountered error : ${err}` });
  }
});
module.exports = { nutritionRouter };
