const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const {
    createActualCGPA,
    getActualCGPA,
    addSemesterRecords,
    getCurrentCGPA,
  } = require("../controllers/ActualCGPA");

router.route("/add/:studentId").post(createActualCGPA);
router.route("/getCurrentCGPA/:studentId").get(verifyToken, getCurrentCGPA);

router.route("/addRecords/:studentId").patch(verifyToken,addSemesterRecords);
router.route("/:studentId").get(getActualCGPA);

module.exports = router;