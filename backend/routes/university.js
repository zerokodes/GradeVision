const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const {
    createUniversity,
    getAllUniversity,
    getUniversityById,
    updateUniversity,
    deleteUniversity,
  } = require("../controllers/university");

router.route("/").post(verifyToken, verifyAdmin, createUniversity);
router.route("/").get(verifyToken, getAllUniversity);
router.route("/:id").get(verifyToken, getUniversityById);
router.route("/:id").patch(verifyToken, verifyAdmin, updateUniversity);
router.route("/:id").delete(verifyToken,verifyAdmin, deleteUniversity);

module.exports = router;