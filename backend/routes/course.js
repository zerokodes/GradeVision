const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const {
    createCourse,
    createMultipleCourses,
    getAllCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
    normalizeSemester,
  } = require("../controllers/course");

router.route("/normalize-semester").patch(verifyToken, verifyAdmin, normalizeSemester);

router.route("/").post(verifyToken, verifyAdmin, createCourse);
router.route("/multiple").post(verifyToken, verifyAdmin, createMultipleCourses);
router.route("/").get(verifyToken, getAllCourse);
router.route("/:id").get(verifyToken, getCourseById);
router.route("/:id").patch(verifyToken, verifyAdmin, updateCourse);
router.route("/:id").delete(verifyToken, verifyAdmin, deleteCourse);


module.exports = router;