const express = require("express");
const { RecipeModel } = require("../../Model/FoodModel/receipeModel.js");
const {
  searchFilterSortMiddleware,
} = require("../../Middleware/getFunction.middleware.js");
const recipesRoute = express.Router();
// create recipes
recipesRoute.post("/add", async (req, res) => {
  const name = req.body.name;
  try {
    const existingProduct = await RecipeModel.findOne({ name: name });

    if (existingProduct) {
      // If the product already exists in the database, send a response indicating that it is a duplicate entry
      return res.status(409).send({ message: "recipe already exists" });
    } else {
      const recipe = new RecipeModel(req.body);
      await recipe.save();
      res.status(200).send({ msg: "New recipe added" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ msg: err });
  }
});

//read recipes
recipesRoute.get("/", searchFilterSortMiddleware, async (req, res) => {
  const { query, sort, page, limit, skip } = req.queryParams;
  try {
    // Fetch products from database based on the query, sort criteria, and pagination
    const recipes = await RecipeModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    const totalRecipes = await RecipeModel.countDocuments(query);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalRecipes / limit);
    res.send({ recipes, totalRecipes, totalPages, currentPage: page });
  } catch (err) {
    res.status(400).send({ msg: err });
  }
});

//update recipes
recipesRoute.patch("/update/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    await RecipeModel.findByIdAndUpdate({ _id: Id }, req.body);
    res.status(200).send("recipe has ben updated");
  } catch (err) {
    console.log(err);
  }
});
//delete recipe
recipesRoute.delete("/delete/:Id", async (req, res) => {
  const { Id } = req.params;
  try {
    await RecipeModel.findByIdAndDelete({ _id: Id });
    res.status(200).send("recipe has ben deleted");
  } catch (err) {
    console.log(err);
    res.send("something wrong");
  }
});
module.exports = { recipesRoute };
