const express = require("express");
const router = express.Router();


const {
    createUniversity,
    getAllUniversity,
    getUniversityById,
    updateUniversity,
    deleteUniversity,
  } = require("../controllers/university");

router.route("/").post(createUniversity);
router.route("/").get(getAllUniversity);
router.route("/:id").get(getUniversityById);
router.route("/:id").put(updateUniversity);
router.route("/:id").delete(deleteUniversity);

module.exports = router;