const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { firstName,lastName,username,email,password,university,department,role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName,lastName,username,email, password: hashedPassword, university,department,role });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
      code: 201,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating a user",
      error: error.message,
      code: 500,
    });
  }
};

exports.loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res.status(400).json({
          success: true,
          message: "Invalid credentials",
          error: error.message,
          code: 400,
        });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          success: true,
          message: "Invalid credentials",
          error: error.message,
          code: 400,
        });
      const token = jwt.sign(
        { id: user._id, role: user.role , city: user.city},
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(201).json({
        success: true,
        message: "User login successfully",
        data: token,
        code: 201,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while login a user",
        error: error.message,
        code: 500,
      });
    }
  };
