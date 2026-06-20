const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [
  { id: 1, name: "Ravi", course: "BCA", marks: 85 },
  { id: 2, name: "Priya", course: "BCA", marks: 90 }
];

// Home Route
app.get("/", (req, res) => {
  res.send("Student Management Backend is running");
});

// Get All Students
app.get("/students", (req, res) => {
  res.json(students);
});

// Add New Student
app.post("/students", (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    course: req.body.course,
    marks: req.body.marks
  };

  students.push(newStudent);
  res.json(newStudent);
});

// Update Student
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  student.name = req.body.name || student.name;
  student.course = req.body.course || student.course;
  student.marks = req.body.marks || student.marks;

  res.json(student);
});

// Delete Student
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  students = students.filter(student => student.id !== id);

  res.json({
    message: "Student deleted successfully"
  });
});

// Start Server (Render Compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});