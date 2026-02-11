import * as taskModel from "../models/taskModel.js";

export const getTasks = (req, res) => {
  const tasks = taskModel.getAllTasks();
  res.json(tasks);
};

export const createTask = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = taskModel.createTask(title);
  res.status(201).json(newTask);
};

export const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const { done, title } = req.body;

  const updatedTask = taskModel.updateTask(taskId, { done, title });

  if (!updatedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(updatedTask);
};

export const toggleTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = taskModel.toggleTask(taskId);

  if (!updatedTask) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(updatedTask);
};

export const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const deleted = taskModel.deleteTask(taskId);

  if (!deleted) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(204).send();
};
