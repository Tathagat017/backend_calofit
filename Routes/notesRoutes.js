const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { notesModel } = require("../Model/notesModel");

const notesRouter = express.Router();

notesRouter.use(express.json());

notesRouter.get("/", async (req, res) => {
  const searchID = req.body.userID;

  try {
    const notes = await notesModel.find({ userID: searchID });
    res.send(notes);
  } catch (err) {
    console.log("Error:", err);
  }
});

notesRouter.post("/add", async (req, res) => {
  const payload = req.body;

  try {
    const notes = new notesModel(payload);
    await notes.save();
    res.send("Notes created.");
  } catch (err) {
    console.log("Error:", err);
  }
});

notesRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const note = await notesModel.findById(id);
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;

  try {
    if (userID_making_req !== userID_in_note) {
      res.send("You are not authorized.");
    } else {
      await notesModel.findByIdAndDelete(id);
      res.send("Notes deleted.");
    }
  } catch (err) {
    console.log("Error:", err);
  }
});

notesRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const note = await notesModel.findById(id);
  const userID_in_note = note.userID;
  const userID_making_req = req.body.userID;

  try {
    if (userID_making_req !== userID_in_note) {
      res.send("You are not authorized.");
    } else {
      await notesModel.findByIdAndUpdate(id, payload);
      res.send("Notes updated.");
    }
  } catch (err) {
    console.log("Error:", err);
  }
});

module.exports = { notesRouter };
