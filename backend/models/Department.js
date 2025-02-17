const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    university: { type: mongoose.Schema.Types.ObjectId, ref: "University", required: true },
    totalLevels: { type: Number, required: true }, // e.g., 4 for a 4-year program
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model("Department", DepartmentSchema);
  