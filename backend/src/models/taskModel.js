import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_FILE = path.join(__dirname, "../data/tasks.json");

const readTasks = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveTasks = (tasks) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), "utf8");
};

const getNextId = (tasks) => {
  if (tasks.length === 0) return 1;
  return Math.max(...tasks.map((t) => t.id)) + 1;
};

export const getAllTasks = () => readTasks();

export const createTask = (title) => {
  const tasks = readTasks();
  const newTask = {
    id: getNextId(tasks),
    title,
    done: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

export const findTaskById = (id) => {
  const tasks = readTasks();
  return tasks.find((t) => t.id === id);
};

export const updateTask = (id, updates) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;

  if (updates.title !== undefined) task.title = updates.title;
  if (updates.done !== undefined) task.done = updates.done;

  saveTasks(tasks);
  return task;
};

export const toggleTask = (id) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) return null;

  task.done = !task.done;
  saveTasks(tasks);
  return task;
};

export const deleteTask = (id) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  saveTasks(tasks);
  return true;
};
