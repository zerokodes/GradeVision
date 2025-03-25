const mongoose = require("mongoose");

const CGPAForecastSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    forecast: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
        grade: { type: String, required: true }, // e.g., A, B, C
        gradePoint: { type: Number, required: true }, // Numeric value for grade
      }
    ],
    accumulatedCGPA: { type: Number, required: true }, // Expected final CGPA
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("CGPAForecast", CGPAForecastSchema);
  