const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: "Complete assignment", status: "Pending" },
  { id: 2, title: "Submit project", status: "Completed" }
];

app.get("/", (req, res) => {
  res.send("Task Manager Backend is running");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    status: req.body.status
  };

  tasks.push(newTask);
  res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title || task.title;
  task.status = req.body.status || task.status;

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);

  res.json({ message: "Task deleted successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});