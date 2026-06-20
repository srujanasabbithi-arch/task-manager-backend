const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Home Page
app.get("/", (req, res) => {
  res.send("Task Planner Backend is running");
});

// Generate Task Plan
app.get("/generate-tasks", (req, res) => {
  const days = parseInt(req.query.days);
  const tasks = req.query.tasks?.split(",");

  // Default output if no parameters are provided
  if (!days || !tasks) {
    return res.json({
      "Day 1": "Java",
      "Day 2": "Python",
      "Day 3": "SQL",
      "Day 4": "Java",
      "Day 5": "Python"
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
