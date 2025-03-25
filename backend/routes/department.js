const express = require("express");
const router = express.Router();

const {
    createDepartment,
    getAllDepartment,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
  } = require("../controllers/department");

router.route("/").post(createDepartment);
router.route("/").get(getAllDepartment);
router.route("/:id").get(getDepartmentById);
router.route("/:id").put(updateDepartment);
router.route("/:id").delete(deleteDepartment);

module.exports = router;