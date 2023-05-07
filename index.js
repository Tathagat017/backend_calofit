const express = require("express");
const app = express();
const cors = require("cors");
const env = require("env2")("./.env");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 8080;
//config - db.js

const { connection } = require("./config/db.js");
//Routers
const { userRouter } = require("./Routes/UserRoutes.js");
const { notesRouter } = require("./Routes/notesRoutes.js");
const { excerciseRouter } = require("./Routes/excerciseRoutes.js");
const { nutritionRouter } = require("./Routes/NutritionIntake.js");
const { dairysRoute } = require("./Routes/FoodRoutes/dairyRoutes.js");
const { fruitsRoute } = require("./Routes/FoodRoutes/FruitRoutes.js");
const { meatsRoute } = require("./Routes/FoodRoutes/meatRoutes.js");
const { recipesRoute } = require("./Routes/FoodRoutes/receipeRoutes.js");
const { vegetableRoute } = require("./Routes/FoodRoutes/vegetableRoutes.js");
const { planRoute } = require("./Routes/plan/plan.route.js");
const { userPlanRoute } = require("./Routes/plan/userPlan.route.js");
//MIDDLEWARES
const { auth } = require("./Middleware/authenticator.js");

//CORS - middleware
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

//FOOD ROUTERS

app.use("/food/fruits", fruitsRoute);
app.use("/food/meat", meatsRoute);
app.use("/food/dairy", dairysRoute);
app.use("/food/vegetable", vegetableRoute);
app.use("/food/recipes", recipesRoute);

//EXCERCISE ROUTER
app.use("/excercise", excerciseRouter);

//USERS ROUTERS
app.use("/users", userRouter);

//GENERAL PLAN ROUTER
app.use("/plan", planRoute);

//PROTECTED ROUTES WITH AUTH MIDDLWARE
app.use(auth);
//NUTRITION DATA ROUTERS
app.use("/notes", notesRouter);
app.use("/nutrition/", nutritionRouter);

//USER PLAN ROUTER

app.use("/userplan", userPlanRoute);

app.listen(port, "localhost", async () => {
  try {
    console.log("listening on port " + port);
    console.log("connecting to MongoDB Atlas...");
    await connection;
    console.log("connected to MongoDB Atlas...");
  } catch (err) {
    console.log("The error while connecting to MongoDB Atlas", err);
  }
});
