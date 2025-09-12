import Task from "../models/task.js";
import { validateTask } from "../utils/validation.js";

export const addTask = async (req, res) => {
  try {
    validateTask(req);
    const { taskName, description, dueDate } = req.body;
    const task = new Task({
      userId: req.user._id,
      taskName,
      description,
      dueDate,
    });
    await task.save();
    res.json({ msg: "Task added successfully" });
  } catch (err) {
    res.json({ msg: err.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) throw new Error("Task id not found");
    validateTask(req);
    const { taskName, description, dueDate } = req.body;
    const task = await Task.findByIdAndUpdate(
      taskId,
      { taskName, description, dueDate },
      { runValidators: true }
    );
    if (!task) throw new Error("Task not found");
    res.json({ msg: "Task updated successfully" });
  } catch (err) {
    res.json({ msg: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) throw new Error("Task id not found");
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) throw new Error("Task not found");
    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    res.json({ msg: err.message });
  }
};

export const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) throw new Error("Task id not found");
    const task = await Task.findByIdAndUpdate(
      taskId,
      { completed: true },
      { runValidators: true }
    );
    if (!task) throw new Error("Task not found");
    res.json({ msg: "Task marked completed" });
  } catch (err) {
    res.json({ msg: err.message });
  }
};

export const dashboard = async (req, res) => {
  try {
    const user = req.user;
    const today = new Date().toISOString().split("T")[0];
    const completedTask = await Task.find({ userId: user._id, completed: true })
      .sort({ updatedAt: -1 })
      .limit(5);
    const todaysTask = await Task.find({
      userId: user._id,
      completed: false,
      dueDate: today,
    }).sort({ createdAt: -1 });
    const upcomingTask = await Task.find({
      userId: user._id,
      completed: false,
      dueDate: { $gt: today },
    }).sort({ dueDate: 1 });

    res.json({
      completedTask,
      todaysTask,
      upcomingTask,
      msg: "Tasks attached",
    });
  } catch (err) {
    res.json({ msg: err.message });
  }
};
