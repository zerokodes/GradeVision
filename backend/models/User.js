const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  role: { type: String, enum: ["student", "admin"], default: "student" }, // User role
  university: { type: mongoose.Schema.Types.ObjectId, ref: "University" },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  currentLevel: { type: Number }, // 100, 200, etc. (only for students)
  desiredCGPA: { type: Number }, // The goal CGPA (only for students)
  isEmailVerified: { type: Boolean, default: false},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
