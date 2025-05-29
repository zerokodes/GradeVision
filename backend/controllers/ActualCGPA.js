const ActualCGPA = require("../models/ActualCGPA");
const Course = require("../models/Course");
const mongoose = require("mongoose");
const User = require("../models/User");


// Letter → grade point map on a 5.0 scale
const GRADE_POINT_MAP = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0
};


// @desc    Create actual CGPA record for a student
// @route   POST /api/actualCGPA
// @access  Private
const createActualCGPA = async (req, res) => {
  try {
    const { studentId, records } = req.body;

    // Validate student ID
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(200).json({ success: false, message: "Invalid student ID format" , code:200});
    }

    // Validate records array
    if (!Array.isArray(records) || records.length === 0) {
      return res.status(200).json({ success: false, message: "Records must be a non-empty array" , code:200});
    }

    // Validate each course record
    for (const record of records) {
      if (!mongoose.Types.ObjectId.isValid(record.course)) {
        return res.status(200).json({ success: false, message: "Invalid course ID in records",code:200 });
      }
      if (!record.grade || typeof record.gradePoint !== "number") {
        return res.status(200).json({ success: false, message: "Each record must include grade and gradePoint", code:200 });
      }
    }

    // Fetch credit loads for each course
    let totalGradePoints = 0;
    let totalCreditLoad = 0;

    for (const record of records) {
      const course = await Course.findById(record.course);
      if (!course) {
        return res.status(200).json({ success: false, message: `Course not found: ${record.course}` , code:200});
      }

      totalGradePoints += record.gradePoint * course.creditLoad;
      totalCreditLoad += course.creditLoad;
    }

    // Calculate accumulated CGPA
    const accumulatedCGPA = totalCreditLoad > 0 ? totalGradePoints / totalCreditLoad : 0;

    // Save Actual CGPA record
    const actualCGPA = await ActualCGPA.create({
      student: studentId,
      records,
      accumulatedCGPA,
    });

    res.status(201).json({
      success: true,
      message: "Actual CGPA record created successfully",
      data: actualCGPA,
      code: 201
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message, code:500});
  }
};

// @desc    Get actual CGPA record for a student
// @route   GET /api/actualCGPA/:studentId
// @access  Private
const getActualCGPA = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(200).json({ success: false, message: "Invalid student ID format", code:200});
    }

    const actualCGPA = await ActualCGPA.findOne({ student: studentId }).populate("records.course");

    if (!actualCGPA) {
      return res.status(200).json({ success: false, message: "No actual CGPA record found for this student",code:200 });
    }

    res.status(200).json({
      success: true,
      data: actualCGPA,
      code: 200
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message, code:500});
  }
};

   /**
   * Add a semester's worth of letter-grade records.
   * Params:
   *   - req.params.studentId
   * Body:
   *   - records: [{ course: ObjectId, grade: String }]
   */

const addSemesterRecords = async(req,res) => {
    try {
      const { studentId } = req.params;
      const { records }   = req.body; // [{ course: ObjectId, grade: 'A' }, ...]

      // 1. Validate input
      if (!Array.isArray(records) || records.length === 0) {
        return res.status(200).json({success:false, message: 'records must be a non-empty array', code:200 });
      }

      // 2. Verify student exists
      const student = await User.findById(studentId);
      if (!student || student.role !== 'student') {
        return res.status(200).json({success:false, message: 'Student not found' , code:200});
      }

      // 3. Fetch existing ActualCGPA of the student
      let actualDoc = await ActualCGPA.findOne({ student: studentId });
      if (!actualDoc) {
        // If none exists, create a new document
        actualDoc = new ActualCGPA({
          student,
          records: [],
          semesterGPA: [],
          accumulatedCGPA: 0
        });
      }

      // Fetch course metadata for each submitted course
      const courseIds = records.map(r => r.course);
      const courses   = await Course.find({ _id: { $in: courseIds } });
      const courseMap = courses.reduce((m, c) => {
        m[c._id.toString()] = c;
        return m;
      }, {});

      // 4. Attach grade & gradePoint to those courses the user input in existing records
      for (const { course: cid, grade } of records) {
        const id        = cid.toString();
        const courseDoc = courseMap[id];
        const letter    = (grade || '').toUpperCase();
        const gp        = GRADE_POINT_MAP[letter];

        if (!courseDoc) {
          return res.status(200).json({success:false, message: `Course not found: ${id}`, code:200});
        }
        if (gp == null) {
          return res.status(200).json({success: false, message: `Invalid grade '${grade}' for course ${id}`, code:200 });
        }

        // Find the record in actualDoc.records
        const recIndex = actualDoc.records.findIndex(r => r.course.toString() === id);
        if (recIndex === -1) {
          return res.status(200).json({success: false, message: `Course ${id} not initialized in records` , code:200});
        }

        // Update the existing record
        actualDoc.records[recIndex].grade      = letter;
        actualDoc.records[recIndex].gradePoint = gp;
      }

      // 5. Determine level & semester from one of the input courses
      const sampleCourse = courseMap[records[0].course.toString()];
      const semLevel     = sampleCourse.level;
      const semNum       = sampleCourse.semester;

      // 6. Calculate the GPA for this semester,
      //    merging any existing entries for the same level & semester

      // Filter records for this semester
      const semRecs = actualDoc.records.filter(r =>
        r.level === semLevel && r.semester === semNum && typeof r.gradePoint === 'number'
      );

      // Sum credits & points
      const semCredits = semRecs.reduce((sum, r) => sum + r.creditLoad, 0);
      const semPoints  = semRecs.reduce((sum, r) => sum + r.gradePoint * r.creditLoad, 0);
      const semGPA     = semCredits > 0
        ? parseFloat((semPoints / semCredits).toFixed(2))
        : 0;

      // Update or append the semesterGPA entry
      const existingGPAIndex = actualDoc.semesterGPA.findIndex(
        e => e.level === semLevel && e.semester === semNum
      );
      const newEntry = { level: semLevel, semester: semNum, gradePointAverage: semGPA };

      if (existingGPAIndex >= 0) {
        actualDoc.semesterGPA[existingGPAIndex] = newEntry;
      } else {
        actualDoc.semesterGPA.push(newEntry);
      }

      // 7. Recalculate overall accumulatedCGPA
      //    (sum over all records with valid gradePoint & creditLoad)
      const valid = actualDoc.records.filter(r =>
        typeof r.gradePoint === 'number' && typeof r.creditLoad === 'number'
      );
      const totalCredits = valid.reduce((s, r) => s + r.creditLoad, 0);
      const totalPoints  = valid.reduce((s, r) => s + r.gradePoint * r.creditLoad, 0);
      actualDoc.accumulatedCGPA = totalCredits > 0
        ? parseFloat((totalPoints / totalCredits).toFixed(2))
        : 0;

      // 8. Update the database
      const updated = await ActualCGPA.findOneAndUpdate(
        { student: studentId },
        {
          $set: {
            records:         actualDoc.records,
            semesterGPA:     actualDoc.semesterGPA,
            accumulatedCGPA: actualDoc.accumulatedCGPA
          }
        },
        { new: true, upsert: true }
      );

      return res.status(200).json(updated);
    } catch (err) {
      console.error('addSemesterRecords error:', err);
      return res.status(500).json({ success: false, message: "Server error", error: error.message, code:500});
    }
  }


const getCurrentCGPA = async (req,res) => {
  try {
    const { studentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(200).json({ success: false, message: "Invalid student ID format", code:200 });
    }

    const actualCGPA = await ActualCGPA.findOne({ student: studentId }).populate("records.course");

    if (!actualCGPA) {
      return res.status(200).json({ success: false, message: "No actual CGPA record found for this student", code:200 });
    }

    res.status(200).json({
      success: true,
      message: "Fetch successfully",
      data: actualCGPA.accumulatedCGPA,
      code: 200
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching current semester CGPA", error: error.message, code:200 });
  }
}
module.exports = { createActualCGPA, getActualCGPA, addSemesterRecords , getCurrentCGPA};
