const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true }, // e.g., "CSC101"
    creditLoad: { type: Number, required: true }, // Course credit load
    level: { type: Number, required: true }, // 100, 200, etc.
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    semester: { type: Number, enum: [1, 2], required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("Course", CourseSchema);
  