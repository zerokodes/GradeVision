const express = require("express");
const router = express.Router();

const {
    createCourse,
    getAllCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
  } = require("../controllers/course");

router.route("/").post(createCourse);
router.route("/").get(getAllCourse);
router.route("/:id").get(getCourseById);
router.route("/:id").put(updateCourse);
router.route("/:id").delete(deleteCourse);

module.exports = router;