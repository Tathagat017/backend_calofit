const express = require("express");

const { ExcerciseModel } = require("../Model/excercisModel.js");

const excerciseRouter = express.Router();

// POST REQUEST
excerciseRouter.post("/add", async (req, res) => {
  const excerciseType = req.body.excerciseType;
  try {
    const existingexcercise = await ExcerciseModel.findOne({
      excerciseType: excerciseType,
    });

    if (existingexcercise) {
      return res.status(404).send({ message: "excercise already exists" });
    } else {
      const excercise = new ExcerciseModel(req.body);
      await excercise.save();
      res.status(200).send({ msg: "New excercise added" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err });
  }
});

//GET ROUTE
excerciseRouter.get("/get", async (req, res, next) => {
  const { excercise } = req.query;
  try {
    let excercise_details = await ExcerciseModel.findOne({
      excerciseType: excercise,
    });

    res.status(200).send(excercise_details);
  } catch (err) {
    res.status(404).send({ msg: err });
  }
});
module.exports = { excerciseRouter };
