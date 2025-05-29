const University = require("../models/University");
const mongoose = require('mongoose');


  const createUniversity = async(req, res) =>{
    try {
      const university = new University(req.body);
      await university.save();
      res.status(201).json({
        success: true,
        message: "University registered successfully",
        data: university,
        code: 201,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while creating a university",
        error: error.message,
        code: 500,
      });
    }
  }

  const getAllUniversity = async(req, res) => {
    try {
      const universities = await University.find();
      res.status(200).json({success: true, message: 'Fetch successful', data:universities, code:200});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while fetching universities",
        error: error.message,
        code: 500,
      });
    }
  }

  const getUniversityById = async(req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(200).json({success: true, message: 'Invalid Id Format',code:200});
      }
      const university = await University.findById(req.params.id);
      if (!university) return res.status(200).json({success: true, message: 'University not found', code:200});
      res.status(200).json({success: true, message: 'Fetch successful', data:university, code:200});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while fetching university",
        error: error.message,
        code: 500,
      });
    }
  }

  const updateUniversity = async(req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(200).json({success: true, message: 'Invalid Id Format',code:200});
      }
      const university = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!university) return res.status(200).json({success: true, message: 'University not found', code:200});
      res.status(200).json({success: true, message: 'Update successful', data:university, code:200});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while updating university",
        error: error.message,
        code: 500,
      });
    }
  }

  const deleteUniversity =  async(req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
       return  res.status(200).json({success: true, message: 'Invalid Id Format',code:200});
      }
      const university = await University.findByIdAndDelete(req.params.id);
      if (!university) return res.status(200).json({success: true, message: 'University not found', code:200});
      res.status(200).json({success: true, message: 'Delete successful', data:university, code:200});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while deleting university",
        error: error.message,
        code: 500,
      });
    }
  }


module.exports = {
  createUniversity,
  getAllUniversity,
  getUniversityById,
  updateUniversity,
  deleteUniversity
}