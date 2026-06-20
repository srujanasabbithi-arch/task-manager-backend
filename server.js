const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Task Planner Backend is running");
});

app.get("/generate-tasks", (req, res) => {
  const days = parseInt(req.query.days);
  const tasks = req.query.tasks?.split(",");

  if (!days || !tasks) {
    return res.json({
      message: "Please provide days and tasks"
    });
  }

  let plan = {};

  for (let i = 1; i <= days; i++) {
    plan[`Day ${i}`] = tasks[(i - 1) % tasks.length];
  }

  res.json(plan);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
