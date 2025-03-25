const Course = require("../models/Course");
const mongoose = require('mongoose');


  const createCourse = async(req, res) =>{
    try {
      const course = new Course(req.body);
      await course.save();
      res.status(201).json({
        success: true,
        message: "Course registered successfully",
        data: course,
        code: 201,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while creating a course",
        error: error.message,
        code: 500,
      });
    }
  }

  const getAllCourse = async(req, res) => {
    try {
      const courses = await Course.find();
      res.status(200).json({success: true, message: 'Fetch successful', data:courses, code:200});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while fetching courses",
        error: error.message,
        code: 500,
      });
    }
  }

  const getCourseById = async(req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(200).json({success: true, message: 'Invalid Id Format',code:200});
      }
      const course = await Course.findById(req.params.id);
      if (!course) return res.status(200).json({success: true, message: 'Course not found', code:200});
      res.status(200).json({success: true, message: 'Fetch successful', data:course, code:200});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while fetching course",
        error: error.message,
        code: 500,
      });
    }
  }

  const updateCourse = async(req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(200).json({success: true, message: 'Invalid Id Format',code:200});
      }
      const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!course) return res.status(200).json({success: true, message: 'Course not found', code:200});
      res.status(200).json({success: true, message: 'Update successful', data:course, code:200});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while updating course",
        error: error.message,
        code: 500,
      });
    }
  }

  const deleteCourse =  async(req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(200).json({success: true, message: 'Invalid Id Format',code:200});
      }
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) return res.status(200).json({success: true, message: 'Course not found', code:200});
      res.status(200).json({success: true, message: 'Delete successful', data:course, code:200});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while deleting course",
        error: error.message,
        code: 500,
      });
    }
  }


module.exports = {
  createCourse,
  getAllCourse,
  getCourseById,
  updateCourse,
  deleteCourse
}