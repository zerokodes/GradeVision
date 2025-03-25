const Department = require("../models/Department");
const mongoose = require('mongoose');


  const createDepartment = async(req, res) =>{
    try {
      const department = new Department(req.body);
      await department.save();
      res.status(201).json({
        success: true,
        message: "Department registered successfully",
        data: department,
        code: 201,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while creating a department",
        error: error.message,
        code: 500,
      });
    }
  }

  const getAllDepartment = async(req, res) => {
    try {
      const departments = await Department.find();
      res.status(200).json({success: true, message: 'Fetch successful', data:departments, code:200});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while fetching departments",
        error: error.message,
        code: 500,
      });
    }
  }

  const getDepartmentById = async(req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(200).json({success: true, message: 'Invalid Id Format',code:200});
      }
      const department = await Department.findById(req.params.id);
      if (!department) return res.status(200).json({success: true, message: 'Department not found', code:200});
      res.status(200).json({success: true, message: 'Fetch successful', data:department, code:200});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while fetching department",
        error: error.message,
        code: 500,
      });
    }
  }

  const updateDepartment = async(req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(200).json({success: true, message: 'Invalid Id Format',code:200});
      }
      const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!department) return res.status(200).json({success: true, message: 'Department not found', code:200});
      res.status(200).json({success: true, message: 'Update successful', data:department, code:200});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while updating department",
        error: error.message,
        code: 500,
      });
    }
  }

  const deleteDepartment =  async(req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(200).json({success: true, message: 'Invalid Id Format',code:200});
      }
      const department = await Department.findByIdAndDelete(req.params.id);
      if (!department) return res.status(200).json({success: true, message: 'Department not found', code:200});
      res.status(200).json({success: true, message: 'Delete successful', data:department, code:200});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while deleting department",
        error: error.message,
        code: 500,
      });
    }
  }


module.exports = {
  createDepartment,
  getAllDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
}