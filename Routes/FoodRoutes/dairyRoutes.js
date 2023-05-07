const express = require("express");
const { DairyModel } = require("../../Model/FoodModel/dairyModel");
const {
  searchFilterSortMiddleware,
} = require("../../Middleware/getFunction.middleware.js");
const dairysRoute = express.Router();
// create dairys
dairysRoute.post("/add", async (req, res) => {
  const name = req.body.name;
  try {
    const existingProduct = await DairyModel.findOne({ name: name });

    if (existingProduct) {
      // If the product already exists in the database, send a response indicating that it is a duplicate entry
      return res.status(409).send({ message: "dairy already exists" });
    } else {
      const dairy = new DairyModel(req.body);
      await dairy.save();
      res.status(200).send({ msg: "New dairy added" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err });
  }
});

//read dairys
dairysRoute.get("/", searchFilterSortMiddleware, async (req, res) => {
  const { query, sort, page, limit, skip } = req.queryParams;
  try {
    // Fetch products from database based on the query and sort criteria
    const dairys = await DairyModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const totaldairys = await DairyModel.countDocuments(query);
    const totalPages = Math.ceil(totaldairys / limit);
    res.send({ dairys, totaldairys, totalPages, currentPage: page });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

//update dairy
dairysRoute.patch("/update/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    await DairyModel.findByIdAndUpdate({ _id: Id }, req.body);
    res.status(200).send("dairy has ben updated");
  } catch (err) {
    console.log(err);
  }
});
//delete dairy
dairysRoute.delete("/delete/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    await DairyModel.findByIdAndDelete({ _id: Id });
    res.status(200).send("dairy has ben deleted");
  } catch (err) {
    console.log(err);
    res.send("something wrong");
  }
});
module.exports = { dairysRoute };
