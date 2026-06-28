const express = require("express");
const router = express.Router();

const Task = require("../models/Task");


// GET All Tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// CREATE Task
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Task title is required",
      });
    }

    const task = new Task({
      title: title.trim(),
    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// UPDATE Task
router.put("/:id", async (req, res) => {
  try {

    const updatedTask = await Task.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true,
        runValidators: true,
      }

    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(updatedTask);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE Task
router.delete("/:id", async (req, res) => {
  try {

    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;