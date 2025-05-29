const mongoose = require("mongoose");

const CGPAForecastSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    records: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
        courseName: { type: String, required: true },
        courseCode: { type: String, required: true, unique: true },
        level: { type: Number, required: true },
        semester: { type: Number, enum: [1, 2], required: true },
        grade: { type: String, required: true }, // e.g., A, B, C
        gradePoint: { type: Number, required: true }, // Numeric value for grade
        creditLoad: { type: Number, required: true }
      }
    ],
    accumulatedCGPA: { type: Number, required: true }, // Expected final CGPA
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("CGPAForecast", CGPAForecastSchema);
  