const express = require("express");
const { VegetableModel } = require("../../Model/FoodModel/vegetableModel");
const {
  searchFilterSortMiddleware,
} = require("../../Middleware/getFunction.middleware.js");
const recipesRoute = express.Router();
const vegetableRoute = express.Router();
// create vegetable
vegetableRoute.post("/add", async (req, res) => {
  const name = req.body.name;
  try {
    const existingProduct = await VegetableModel.findOne({ name: name });

    if (existingProduct) {
      // If the product already exists in the database, send a response indicating that it is a duplicate entry
      return res.status(409).send({ message: "vegetable already exists" });
    } else {
      let vegetable = new VegetableModel(req.body);
      await vegetable.save();
      res.status(200).send({ msg: "New vegetable added" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err });
  }
});

//read vegetables
vegetableRoute.get("/", searchFilterSortMiddleware, async (req, res) => {
  const { query, sort, page, limit, skip } = req.queryParams;
  try {
    // Fetch products from database based on the query, sort criteria, and pagination
    const vegetables = await VegetableModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const totalvegetables = await VegetableModel.countDocuments(query);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalvegetables / limit);
    res.send({ vegetables, totalvegetables, totalPages, currentPage: page });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});
//update vegetable
vegetableRoute.patch("/update/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    await VegetableModel.findByIdAndUpdate({ _id: Id }, req.body);
    res.status(200).send("vegetable has ben updated");
  } catch (err) {
    console.log(err);
  }
});
//delete vegetable
vegetableRoute.delete("/delete/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    await VegetableModel.findByIdAndDelete({ _id: Id });
    res.status(200).send("vegetable has ben deleted");
  } catch (err) {
    console.log(err);
    res.send("something wrong");
  }
});
module.exports = { vegetableRoute };
