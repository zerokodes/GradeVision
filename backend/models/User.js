const mongoose = require("mongoose");
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  gender: {
    type: String,
    enum: ["Male","Female"],
    default: null
},
  email:{
    type:String,
    required:[true,'Please provide your mail'],
    unique:true,
    lowercase:true,
    validate:[validator.isEmail,'Please provide valid email'],
},
  password: { type: String, required: true }, // Hashed password
  role: { type: String, enum: ["student", "admin", "superAdmin"], default: "student" }, // User role
  university: { type: mongoose.Schema.Types.ObjectId, ref: "University" },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  currentLevel: { type: Number }, // 100, 200, etc. (only for students)
  currentSemester: { type: Number, enum: [1, 2], required: true },
  desiredCGPA: { type: Number }, // The goal CGPA (only for students)
  isEmailVerified: { type: Boolean, default: false},
  otp: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
