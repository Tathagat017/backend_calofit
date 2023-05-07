const mongoose = require("mongoose");
const userPlanSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    mo_no: { type: Number, required: true },
    plan: { type: String, required: true },
    str_date: { type: String, required: true },
    end_date: { type: String, required: true },
    userID: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
const UserPlanModel = mongoose.model("user_plan", userPlanSchema);
module.exports = { UserPlanModel };
