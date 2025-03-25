const express = require("express");
const ActualCGPAController = require("../controllers/ActualCGPAController");
const router = express.Router();

router.post("/add/:studentId", ActualCGPAController.addActualCGPA);
router.get("/:studentId", ActualCGPAController.getActualCGPA);

module.exports = router;