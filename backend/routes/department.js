const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const {
    createDepartment,
    getAllDepartment,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
  } = require("../controllers/department");

router.route("/").post(verifyToken, verifyAdmin,createDepartment);
router.route("/").get(verifyToken, getAllDepartment);
router.route("/:id").get(verifyToken, getDepartmentById);
router.route("/:id").patch(verifyToken, verifyAdmin, updateDepartment);
router.route("/:id").delete(verifyToken, verifyAdmin, deleteDepartment);

module.exports = router;