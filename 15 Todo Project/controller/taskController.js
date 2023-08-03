import { Task } from "../model/task.js";

// ============== Create Task Controller ================
export const addTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

// ============== Get Task Controller ================
export const getTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  };
};

// ============== Update Task Controller ================
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
        success: true,
        task,
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        error,
    });
  }
};

// ============== Delete Task Controller ================
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};