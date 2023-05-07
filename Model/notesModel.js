const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const notesModel = mongoose.model("notes", notesSchema);

module.exports = { notesModel };
