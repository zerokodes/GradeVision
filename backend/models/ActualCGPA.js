const mongoose = require("mongoose");

const ActualCGPASchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  records: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
      courseName: { type: String, required: true },
      courseCode: { type: String, required: true, unique: true },
      level: { type: Number, required: true },
      semester: { type: Number, enum: [1, 2], required: true },
      grade: { type: String }, // e.g., A, B, C
      gradePoint: { type: Number }, // Numeric value for grade
      creditLoad: { type: Number, required: true }
    }
  ],
  semesterGPA: [{
    level: { type: Number },
    semester: { type: Number, enum: [1, 2] },
    gradePointAverage: { type: Number },
  }],
  accumulatedCGPA: { type: Number }, // The CGPA after this semester
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ActualCGPA", ActualCGPASchema);
