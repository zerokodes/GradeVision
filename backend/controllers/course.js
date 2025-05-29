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

const createMultipleCourses = async (req, res) => {
  try {
    const courses = req.body;

    if (!Array.isArray(courses) || courses.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Request body must be a non-empty array of courses",
        code: 200,
      });
    }

    const createdCourses = await Course.insertMany(courses);

    return res.status(201).json({
      success: true,
      message: "Courses created successfully",
      data: createdCourses,
      code: 201,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating courses",
      error: error.message,
      code: 500,
    });
  }
};


  const getAllCourse = async(req, res) => {
    try {
      const courses = await Course.find();
      return res.status(200).json({success: true, message: 'Fetch successful', data:courses, code:200});
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
        return res.status(200).json({success: true, message: 'Invalid Id Format',code:200});
      }
      const course = await Course.findById(req.params.id);
      if (!course) return res.status(200).json({success: true, message: 'Course not found', code:200});
      return res.status(200).json({success: true, message: 'Fetch successful', data:course, code:200});
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
        return res.status(200).json({success: true, message: 'Invalid Id Format',code:200});
      }
      const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!course) return res.status(200).json({success: true, message: 'Course not found', code:200});
      return res.status(200).json({success: true, message: 'Update successful', data:course, code:200});
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
        return res.status(200).json({success: true, message: 'Invalid Id Format',code:200});
      }
      const course = await Course.findByIdAndDelete(req.params.id);
      if (!course) return res.status(200).json({success: true, message: 'Course not found', code:200});
      return res.status(200).json({success: true, message: 'Delete successful', data:course, code:200});
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error while deleting course",
        error: error.message,
        code: 500,
      });
    }
  }


  const normalizeSemester = async (req, res) => {
      try {
        // 1. Fetch raw documents (so we see "First"/"Second")
        const rawCourses = await Course.collection.find({}).toArray();
  
        const semesterMap = { First: 1, Second: 2 };
        const ops = [];
  
        // 2. Build bulk operations for those that need updating
        rawCourses.forEach(doc => {
          const oldSem = doc.semester;
          const newSem = semesterMap[oldSem];
          if (newSem && oldSem !== newSem) {
            ops.push({
              updateOne: {
                filter: { _id: doc._id },
                update: { $set: { semester: newSem } }
              }
            });
          }
        });
  
        // 3. Execute bulkWrite if there are updates
        let result = { modifiedCount: 0 };
        if (ops.length) {
          result = await Course.collection.bulkWrite(ops);
        }
  
        // 4. Return updated courses list
        const updatedCourses = await Course.find(); // now with numeric semesters
        res.status(200).json({
          message: 'Semester normalization completed',
          updatedCount: result.modifiedCount,
          courses: updatedCourses
        });
    } catch (error) {
      console.error('normalizeSemester error:', error);
      res.status(500).json({
        success: false,
        message: "Error while normalizing  semester",
        error: error.message,
        code: 500,
      });
    }
  }
    

module.exports = {
  createCourse,
  createMultipleCourses,
  getAllCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
  normalizeSemester,
}