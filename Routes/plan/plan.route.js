const express = require("express");
const { PlanModel } = require("../../Model/plan/plan.model.js");
const planRoute = express.Router();
// create plans
planRoute.post("/add", async (req, res) => {
  const name = req.body.name;
  try {
    const existingProduct = await PlanModel.findOne({ name: name });

    if (existingProduct) {
      // If the product already exists in the database, send a response indicating that it is a duplicate entry
      return res.status(409).send({ message: "plan already exists" });
    } else {
      const plan = new PlanModel(req.body);
      await plan.save();
      res.status(200).send({ msg: "New plan added" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err });
  }
});

//read plans
planRoute.get("/", async (req, res) => {
  try {
    const plans = await PlanModel.find();
    res.send(plans);
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

//update plan
planRoute.patch("/update/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    await PlanModel.findByIdAndUpdate({ _id: Id }, req.body);
    res.status(200).send("plan has ben updated");
  } catch (err) {
    console.log(err);
  }
});
//delete plan
planRoute.delete("/delete/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    await PlanModel.findByIdAndDelete({ _id: Id });
    res.status(200).send("plan has ben deleted");
  } catch (err) {
    console.log(err);
    res.send("something wrong");
  }
});
module.exports = { planRoute };
