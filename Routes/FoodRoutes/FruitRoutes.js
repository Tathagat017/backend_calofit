const express = require("express");
const { FruitModel } = require("../../Model/FoodModel/FruitModel");
const {
  searchFilterSortMiddleware,
} = require("../../Middleware/getFunction.middleware.js");
const fruitsRoute = express.Router();
// create fruits
fruitsRoute.post("/add", async (req, res) => {
  const name = req.body.name;
  try {
    const existingProduct = await FruitModel.findOne({ name: name });

    if (existingProduct) {
      // If the product already exists in the database, send a response indicating that it is a duplicate entry
      return res.status(409).send({ message: "fruit already exists" });
    } else {
      const fruit = new FruitModel(req.body);
      await fruit.save();
      res.status(200).send({ msg: "New fruit added" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err });
  }
});

//read fruits
fruitsRoute.get("/", searchFilterSortMiddleware, async (req, res) => {
  const { query, sort, page, limit, skip } = req.queryParams;
  try {
    // Fetch products from database based on the query, sort criteria, and pagination
    const fruits = await FruitModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const totalFruits = await FruitModel.countDocuments(query);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalFruits / limit);
    res.send({ fruits, totalFruits, totalPages, currentPage: page });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

//update fruit
fruitsRoute.patch("/update/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    await FruitModel.findByIdAndUpdate({ _id: Id }, req.body);
    res.status(200).send("fruit has ben updated");
  } catch (err) {
    console.log(err);
  }
});
//delete fruit
fruitsRoute.delete("/delete/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    await FruitModel.findByIdAndDelete({ _id: Id });
    res.status(200).send("fruit has ben deleted");
  } catch (err) {
    console.log(err);
    res.send("something wrong");
  }
});
module.exports = { fruitsRoute };
