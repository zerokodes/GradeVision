const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true }, // e.g., "CSC101"
    creditLoad: { type: Number, required: true }, // Course credit load
    level: { type: Number, required: true }, // 100, 200, etc.
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    semester: { type: String, enum: ["First", "Second"], required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("Course", CourseSchema);
  