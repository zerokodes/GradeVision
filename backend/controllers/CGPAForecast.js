// controllers/CGPAForecastController.js
const CGPAForecast = require("../models/CGPAForecast");
const Course = require("../models/Course");
const User = require("../models/User");

// Grade point scale for a 5.0 system
const GRADE_POINTS = {
  A: 5.0,
  B: 4.0,
  C: 3.0,
  D: 2.0,
  E: 1.0,
  F: 0.0,
};

  const generateForecast = async(req, res) => {
    try {
      //Extract Student ID from Request Params & Fetch Student from Database
      const { studentId } = req.params;
      const student = await User.findById(studentId);
      if (!student || student.role !== "student") {
        return res.status(404).json({ error: "Student not found" });
      }
       
      // Extract Student Details &  Retrieve All Courses for the Student’s Department
      const { department, desiredCGPA, currentLevel } = student;
      const courses = await Course.find({ department }).sort({ level: 1, semester: 1 });
      
      //Initialize Variables
      let totalCreditHours = 0;
      let totalGradePointsNeeded = 0;
      const forecastedRecords = [];
      let accumulatedCGPA = 0;
      
      // Group courses by semester
      const semesters = {};
      courses.forEach(course => {
        const key = `${course.level}-${course.semester}`;
        if (!semesters[key]) semesters[key] = [];
        semesters[key].push(course);
      });

      // Iterate Through Each Semester,Get All Courses for the Semester and Forecast Grades
      Object.keys(semesters).forEach((semesterKey, index) => {
        //Get All Courses for the Semester
        const semesterCourses = semesters[semesterKey];
        const semesterCreditLoad = semesterCourses.reduce((sum, course) => sum + course.creditLoad, 0);
        
        //Update Total Credit Hours and Grade Points Needed
        totalCreditHours += semesterCreditLoad;
        totalGradePointsNeeded = desiredCGPA * totalCreditHours;
        
        // Calculate required GPA for this semester
        let semesterGradePoints = totalGradePointsNeeded - accumulatedCGPA * totalCreditHours;
        let requiredGPA = semesterGradePoints / semesterCreditLoad;

        // Assign grades based on required GPA
        semesterCourses.forEach(course => {
          let grade = "A"; // Default highest grade
          if (requiredGPA >= 4.5) grade = "A";
          else if (requiredGPA >= 3.5) grade = "B";
          else if (requiredGPA >= 2.5) grade = "C";
          else if (requiredGPA >= 1.5) grade = "D";
          else if (requiredGPA >= 1.0) grade = "E";
          else grade = "F";
          
          forecastedRecords.push({
            course: course._id,
            grade,
            gradePoint: GRADE_POINTS[grade],
          });
        });

        // Update accumulated CGPA
        accumulatedCGPA = totalGradePointsNeeded / totalCreditHours;
      });

      // Save forecast to database
      const forecast = new CGPAForecast({
        student: studentId,
        records: forecastedRecords,
        accumulatedCGPA,
      });
      await forecast.save();
      res.status(201).json(forecast);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

const getForecastByStudent = async(req,res) => {
  try {
    const { studentId } = req.params;
    const forecast = await CGPAForecast.findOne({ student: studentId }).populate("records.course");
    if (!forecast) {
      return res.status(404).json({ error: "Forecast not found for this student" });
    }
    res.status(200).json(forecast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  generateForecast,
  getForecastByStudent
}
