const express = require("express");
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const { registerUser, loginUser, getAllUser, updateUser, verifyEmail, sendVerificationMail, sendForgetPasswordMail } = require("../controllers/user");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verifyEmail", verifyEmail);
router.post("/sendVerificationMail", sendVerificationMail);
router.post("/sendForgetPasswordMail", sendForgetPasswordMail);
router.route("/").get(verifyToken, verifyAdmin, getAllUser);
router.route("/:id").patch(verifyToken, updateUser);

module.exports = router;