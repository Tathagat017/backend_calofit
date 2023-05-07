const mongoose = require("mongoose");
const env = require("env2")("./.env");
const mongo_url = process.env.DB_Mongo_URL;
const connection = mongoose.connect(mongo_url);
module.exports = { connection };
