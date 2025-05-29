const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const {
    generateForecast,
    getForecastByStudent,
    generateForecastFromALevel,
    updateForecastRecords
  } = require("../controllers/CGPAForecast");

router.route("/generate/:studentId").post(verifyToken, generateForecast);
router.route("/generateFromALevel/:studentId").post(verifyToken, generateForecastFromALevel);
router.route("/updateForecastRecords/:studentId").patch(verifyToken, updateForecastRecords);
router.route("/:studentId").get(verifyToken, getForecastByStudent);


module.exports = router;