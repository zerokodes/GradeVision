const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

const registerUser = async (req, res) => {
  try {
    const { firstName,lastName,username,email,password,university,department,role, currentLevel, currentSemester, gender } = req.body;

    const generateOtp = () =>
      Math.floor(100000 + Math.random() * 900000).toString();

    // Validate input
  if (!email) {
    res.status(200).json({success: false, message: "Email is required", code:200});
  }

  // Check if the user already exists
  let user = await User.findOne({ $or: [{ email }, { username }] });
  if (user) return res.status(200).json({success: false, message: 'User already exist', code:200});

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ firstName,lastName,username,email, password: hashedPassword, university,department,role, currentLevel, currentSemester, gender });
    // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const otp = generateOtp();

  user.otp = otp;

  if (email) {
    const mailOptions = {
      from: `"${process.env.SMTP_USERNAME}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify Your Email Address",
      text: `Verification code:${otp}`,
    };
    console.log("sending mail");
    //await transporter.sendMail(mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(200).json({success: false, message: "Error sending email",error:error, data:info,  code:200});
        
      }
    });
  }
  
    await user.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully. Check your email for verification code.",
      data: user,
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

const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username or email is provided
    if (!username && !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide a username or email",
        code: 400,
      });
    }

    // Find user by username or email
    const user = await User.findOne({ 
      $or: [{ username }, { email }] 
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        code: 400,
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        code: 400,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role},
      process.env.JWT_SEC,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "User login successful",
      data: token,
      code: 200,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while logging in user",
      error: error.message,
      code: 500,
    });
  }
};

const getAllUser = async (req,res) => {
  try {
    const users = await User.find();
    res.status(200).json({success: true, message: 'Fetch Successful', data: users, code:200});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while fetching departments",
      error: error.message,
      code: 500,
    });
  }

}

const updateUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(200).json({success: true, message: 'Invalid Id Format',code:200});
    }
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(200).json({success: true, message: 'User not found', code:200});
    return res.status(200).json({success: true, message: 'Update successful', data:user, code:200});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while updating user",
      error: error.message,
      code: 500,
    });
  }
}




const verifyEmail = async (req, res) => {
  try{

     const { email, otp } = req.body;

  if (!otp) {
    return res.status(200).json({
      success: false,
      message: "OTP code is required",
      code: 200,
    });
  }

  if (!email) {
   return res.status(200).json({
      success: false,
      message: "Email Address required",
      code: 200,
    });
  }

  // Find the user by email
  const user = await User.findOne({ email });

  if (!user) {
     return res.status(200).json({
      success: false,
      message: `User not found this email: ${email}`,
      code: 200,
    });
  }

  // Verify the email
  if (user.isEmailVerified) {
    const isEmailVerified = true;
    return res.status(200).json({
      success: false,
      message: "Email is already verified",
      data: isEmailVerified,
      code: 200,
    });
  }

  if (user.otp !== otp) {
   return res.status(200).json({
    success: false,
    message: "Invalid OTP code",
    code: 200,
  });
  }

  user.isEmailVerified = true;
  user.otp = null;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Email is Successfully Verified",
    code: 200,
  });
  }catch(error){
     res.status(500).json({
      success: false,
      message: "Error while verifying email",
      error: error.message,
      code: 500,
    });
  }
};


const sendVerificationMail = async (req, res) => {
  try{
    const email = req.body.email;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(200).json({
      success: false,
      message: "Please enter the email address you used when registering",
      code: 200,
    });
  }

  if (user.isEmailVerified === true) {
    return res.status(200).json({
      success: false,
      message: "Email address is verified already",
      code: 200,
    });
  }

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const otp = generateOtp();

  user.otp = otp;

  // Send verification email
  const mailOptions = {
    from: `"${process.env.SMTP_USERNAME}" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify Your Email Address",
    text: `Verification code:${otp}`,
  };

  user.save();
  await transporter.sendMail(mailOptions);

  return res.status(200).json({
    success: true,
    message: "Check your email for verification code",
    code: 200,
  });
  }catch(error){
    res.status(500).json({
      success: false,
      message: "Error while sending verification email",
      error: error.message,
      code: 500,
    });
  }
  
};



const sendForgetPasswordMail = async(req, res) => {
  try{
  const email = req.body.email;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(200).json({
        success: false,
        message: `Please enter the email address(${email}), you used when registering`,
        code: 200,
    });
  }

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });



  //Generate OTP code
  const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const otp = generateOtp();

  user.otp = otp;

  // Send verification email
  const mailOptions = {
    from: `"${process.env.SMTP_USERNAME}" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Password Reset",
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
    Verification code:${otp}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };

  user.save();
  await transporter.sendMail(mailOptions);

  res.status(200).json({
    success: true,
    message: "Check your email for verification code to reset password",
    code: 200,
  });
  }catch(error){
    res.status(500).json({
      success: false,
      message: "Error while sending forget password verification email",
      error: error.message,
      code: 500,
    });
}
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * To identify the currently authenticated user (and fetch their profile data) 
 * without requiring them to re-submit credentials.
 *  It relies solely on a valid token.
 * @returns 
 */
const me = async(req, res) => {
  try {
    // `verifyToken` should already have set req.userId
    const userId = req.user.id;
    if (!userId) {
      return res.status(200).json({success:false, message: 'Not authenticated', code: 200 });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(200).json({success:false, message: 'User not found', code:200 });
    }

    // Return the user data (minus sensitive fields)
    return res.json({ user });
  } catch (err) {
    console.error('AuthController.me error:', err);
    return res.status(500).json({success:false, error:err.message, message: 'Internal server error', code:500 });
  }
}


  module.exports = {
    registerUser,
    loginUser,
    getAllUser,
    updateUser,
    verifyEmail,
    sendVerificationMail,
    sendForgetPasswordMail,
    me,
  }