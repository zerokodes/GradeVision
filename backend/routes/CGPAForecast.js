const express = require("express");
const router = express.Router();

const {
    generateForecast,
    getForecastByStudent,
  } = require("../controllers/CGPAForecast");

router.route("/generate/:studentId").post(generateForecast);
router.route("/:studentId").get(getForecastByStudent);

module.exports = router;