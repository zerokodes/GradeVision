// controllers/CGPAForecastController.js
const CGPAForecast = require("../models/CGPAForecast");
const ActualCGPA = require("../models/ActualCGPA");
const Course = require("../models/Course");
const User = require("../models/User");



const mapToLevelSemester = (index) => {
  // index 0 → 100-1, 1 → 100-2, 2 → 200-1, 3 → 200-2, 4 → 300-1 ...
  const level = 100 + Math.floor(index / 2) * 100;
  const semester = (index % 2) + 1;
  return { level, semester };
};

  const generateForecast = async(req, res) => {
          try {
            // 1. Extract student
            const { studentId } = req.params;
            const student = await User.findById(studentId);
            if (!student || student.role !== 'student') {
              return res.status(200).json({success:false, message: 'Student not found' , code:200});
            }
            const { department, desiredCGPA } = student;
      
            // 2. Fetch courses
            const courses = await Course.find({ department });
            if (!courses.length) {
              return res.status(200).json({success:false, message: 'No courses for this department', code:200 });
            }
      
            // 3. Flatten all courses (level/semester grouping not needed for total CGPA)
            //    but we'll keep original order grouping for record clarity
            const sortedCourses = [...courses].sort((a, b) => {
              // descending creditLoad
              return b.creditLoad - a.creditLoad;
            });
      
            // 4. Compute totals
            const totalCredits = sortedCourses.reduce((sum, c) => sum + c.creditLoad, 0);
            const desiredTotalPoints = Math.round(desiredCGPA * totalCredits);
            const baseGP = 3;  // minimum C = 3
            const basePoints = baseGP * totalCredits;
            let extraPointsNeeded = desiredTotalPoints - basePoints;
      
            // Validate feasibility
            const maxExtra = 2 * totalCredits; // from 3->5 max 2 points per credit
            if (extraPointsNeeded < 0 || extraPointsNeeded > maxExtra) {
              return res.status(200).json({
                success:false,
                message: `Cannot match desiredCGPA=${desiredCGPA} with only grades A/B/C`,
                code: 200
              });
            }
      
            // 5. Allocate grade points
            /**const forecastedRecords = [];
            for (const course of sortedCourses) {
              const { creditLoad, _id: courseId, title } = course;
      
              // Max extra this course can absorb = 2 * creditLoad
              const maxExtraForCourse = 2 * creditLoad;
              // Allocate as much as possible, but in multiples of creditLoad
              const units = Math.min(
                maxExtraForCourse,
                Math.floor(extraPointsNeeded / creditLoad) * creditLoad
              );
              // Determine grade point: baseGP + (units/creditLoad)
              const gradePoint = baseGP + units / creditLoad;
              // Map to letter
              const letter = gradePoint === 5 ? 'A'
                            : gradePoint === 4 ? 'B'
                            : 'C';**/
      
                            // 5. Allocate grade points with round-robin bumps
                            const forecastedRecords = sortedCourses.map(course => ({
                              course:   course._id,
                              courseName: course.title,
                              courseCode: course.code,
                              level: course.level,
                              semester: course.semester,
                              creditLoad: course.creditLoad,
                              gradePoint: 3 // start everyone at C = 3
                            }));

                            //5.1 Create actualRecords courses without grades
                            const actualRecords = sortedCourses.map(course => ({
                              course:   course._id,
                              courseName: course.title,
                              courseCode: course.code,
                              level: course.level,
                              semester: course.semester,
                              creditLoad: course.creditLoad,
                      
                            }));
                            
                            // Keep bumping until we've allocated all extra points
                            let roundsWithoutAllocation = 0;
                            while (extraPointsNeeded > 0 && roundsWithoutAllocation < forecastedRecords.length) {
                              let allocatedThisRound = false;
                            
                              // Sort records by creditLoad descending each round
                              forecastedRecords.sort((a, b) => b.creditLoad - a.creditLoad);
                            
                              for (const rec of forecastedRecords) {
                                // Can we bump this course?
                                if (rec.gradePoint < 5 && extraPointsNeeded >= rec.creditLoad) {
                                  rec.gradePoint += 1;                 // bump (C→B or B→A)
                                  extraPointsNeeded -= rec.creditLoad; // consume points
                                  allocatedThisRound = true;
                                  break; // restart from highest creditLoad
                                }
                              }
                            
                              if (!allocatedThisRound) {
                                roundsWithoutAllocation++;
                              } else {
                                roundsWithoutAllocation = 0;
                              }
                            }
                            
                            // If we still have leftover, round to nearest by distributing fractions
                            if (extraPointsNeeded > 0) {
                              // Distribute fractional points proportionally (won’t change gp, but affects CGPA)
                              // We'll simply absorb the tiny remainder into accumulatedCGPA calculation.
                              console.warn(`Leftover points: ${extraPointsNeeded}`);
                            }
                            
                            // Map gradePoint → letter
                            forecastedRecords.forEach(rec => {
                              rec.grade = rec.gradePoint === 5 ? 'A'
                                        : rec.gradePoint === 4 ? 'B'
                                        : 'C';
                            });              
              // Record it
             /**forecastedRecords.push({
                course: courseId,
                courseName: title,
                grade: letter,
                gradePoint,
                creditLoad
              });
      
              // Subtract allocated extra from pool
              extraPointsNeeded -= units;
            }
      
            // After the loop, extraPointsNeeded should be 0
            if (extraPointsNeeded !== 0) {
              // This should not happen given our rounding, but guard just in case
              return res.status(500).json({
                error: 'Allocation error: could not distribute grade points exactly'
              });
            }**/
      
            // 6. Compute accumulatedCGPA and save
            const totalPoints = forecastedRecords
              .reduce((sum, r) => sum + r.gradePoint * r.creditLoad, 0);
            const accumulatedCGPA = +(totalPoints / totalCredits).toFixed(2);
      
            const forecast = await CGPAForecast.create({
              student: studentId,
              records: forecastedRecords,
              accumulatedCGPA
            });

            // 6.1 Save actualRecords 
            const actual = await ActualCGPA.create({
              student: studentId,
              records: actualRecords,
              accumulatedCGPA: 0
            })
      
            // 7. Return
            return res.status(201).json({success: true, message: 'Forecasted grades generated successful', data:forecast, code:201});
          } catch (err) {
            console.error('generateForecast error:', err);
            return res.status(500).json({
              success: false,
              message: "Error while generating forecasted grades",
              error: err.message,
              code: 500,
            });
          }
        }


const getForecastByStudent = async(req,res) => {
  try {
    const { studentId } = req.params;
    const forecast = await CGPAForecast.findOne({ student: studentId }).populate("records.course");
    if (!forecast) {
      return res.status(200).json({success:false, message: "Forecast not found for this student" , code:200});
    }
    res.status(200).json({success:true, message: "Fetch successful", data:forecast, code:200});
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message, code:500});
  }
}

 /**
   * Forecast only the remaining semesters, given the GPAs of past semesters.
   * Params:
   *  - req.params.studentId
   *  - req.body.numOfPreviousSemesters (integer)
   *  - req.body.previousGPAs (array of numbers, length = numOfPreviousSemesters)
   */

const generateForecastFromALevel = async (req, res) => {
  try {
      const { studentId } = req.params;
      const { numOfPreviousSemesters, previousGPAs } = req.body;

      // 1. Load student & validate
      const student = await User.findById(studentId);
      if (!student || student.role !== 'student') {
        return res.status(200).json({success:false, message: 'Student not found' , code:200});
      }

      // 1.1 Check if student already have a goal
      
      const { department, desiredCGPA } = student;

      // 2. Fetch and sort all department courses
      const allCourses = await Course.find({ department })
        .sort({ level: 1, semester: 1 });
      if (!allCourses.length) {
        return res.status(200).json({success:false, message: 'No courses found for this department', code:200 });
      }

      // 2.1. Flatten all courses (level/semester grouping not needed for total CGPA)
            //    but we'll keep original order grouping for record clarity
        const sortedCourses = [...allCourses].sort((a, b) => {
              // descending creditLoad
              return b.creditLoad - a.creditLoad;
        });

      // 3. Group courses by semester into an array of arrays
      const semesterGroups = [];
      let lastKey = null;
      for (const c of allCourses) {
        const key = `${c.level}-${c.semester}`;
        if (key !== lastKey) {
          semesterGroups.push([]);
          lastKey = key;
        }
        semesterGroups[semesterGroups.length - 1].push(c);
      }

      // Validate inputs
      if (numOfPreviousSemesters !== previousGPAs.length
          || numOfPreviousSemesters > semesterGroups.length) {
        return res.status(200).json({ 
          success:false,
          message: 'Invalid numOfPreviousSemesters or previousGPAs length' ,
          code:200
        });
      }

      // 4. Compute credits & points from previous semesters
      let prevTotalCredits = 0,
          prevTotalPoints  = 0;
      for (let i = 0; i < numOfPreviousSemesters; i++) {
        const semCourses = semesterGroups[i];
        const semCredits = semCourses.reduce((sum, c) => sum + c.creditLoad, 0);
        prevTotalCredits += semCredits;
        prevTotalPoints  += semCredits * previousGPAs[i];
      }

      // 5. Compile future courses
      const futureGroups = semesterGroups.slice(numOfPreviousSemesters);
      const futureCourses = futureGroups.flat();
      const futureTotalCredits = futureCourses.reduce((sum, c) => sum + c.creditLoad, 0);


      // 6. Determine total points needed overall, then subtract prev points
      const overallCredits       = prevTotalCredits + futureTotalCredits;
      const desiredTotalPoints   = desiredCGPA * overallCredits;
      let remainingPointsNeeded  = desiredTotalPoints - prevTotalPoints;

      // Feasibility check: 
      // base all future at C=3, max bump per credit=2 → max extra = 2*futureTotalCredits
      const baseFuturePoints     = 3 * futureTotalCredits;
      const maxExtraFuturePoints = 2 * futureTotalCredits;
      const extraNeeded = remainingPointsNeeded - baseFuturePoints;
      if (extraNeeded < 0 || extraNeeded > maxExtraFuturePoints) {
        return res.status(200).json({
          success:false,
          message: `Cannot achieve desiredCGPA=${desiredCGPA} from this point with only A/B/C`,
          code: 200
        });
      }

      // 7. Initialize forecast records for future courses at C (3 points)
      const forecastedRecords = futureCourses
        .sort((a,b) => b.creditLoad - a.creditLoad)  // highest-credit first
        .map(c => ({
          course:   c._id,
          courseName: c.title,
          courseCode: c.code,
          creditLoad: c.creditLoad,
          level: c.level,
          semester: c.semester,
          gradePoint: 3  // start at C
        }));

        //7.1 Create actualRecords courses without grades
        const actualRecords = sortedCourses.map(c => ({
          course:   c._id,
          courseName: c.title,
          courseCode: c.code,
          level: c.level,
          semester: c.semester,
          creditLoad: c.creditLoad,
        }));

         // 7.2 Build semesterGPA array
    const semesterGPA = previousGPAs.map((gpa, idx) => {
      const { level, semester } = mapToLevelSemester(idx);
      return { level, semester, gradePointAverage: gpa };
    });

    // 7.3. Calculate accumulated CGPA over those past semesters
let actualAccumulatedCGPA = 0;
if (semesterGPA.length > 0) {
  const totalGPA = semesterGPA
    .reduce((sum, entry) => sum + entry.gradePointAverage, 0);
  actualAccumulatedCGPA = parseFloat((totalGPA / semesterGPA.length).toFixed(2));
}

      

      // 8. Round-robin bumping: allocate extra points for future courses
      let pool = extraNeeded;  // how many points above base(3) we need
      let noAllocRounds = 0;
      while (pool > 0 && noAllocRounds < forecastedRecords.length) {
        let allocated = false;
        for (const rec of forecastedRecords) {
          if (rec.gradePoint < 5 && pool >= rec.creditLoad) {
            rec.gradePoint += 1;      // bump C→B or B→A
            pool -= rec.creditLoad;
            allocated = true;
            break;                    // restart from largest creditLoad
          }
        }
        if (!allocated) noAllocRounds++;
        else noAllocRounds = 0;
      }
      // any leftover pool is small (< smallest creditLoad) and will be absorbed in CGPA calc

      // 9. Map numeric gradePoint → letter grade
      forecastedRecords.forEach(rec => {
        rec.grade = rec.gradePoint === 5 ? 'A'
                  : rec.gradePoint === 4 ? 'B'
                  : 'C';
      });

      // 10. Compute new total points & final CGPA
      const futurePoints   = forecastedRecords
        .reduce((sum, r) => sum + r.gradePoint * r.creditLoad, 0);
      const finalTotalPts  = prevTotalPoints + futurePoints;
      const accumulatedCGPA = +(finalTotalPts / overallCredits).toFixed(2);

      // 11. Save forecast for future courses
      const forecast = await CGPAForecast.create({
        student:       studentId,
        records:       forecastedRecords,
        accumulatedCGPA
      });

      // 11.1 Save actualRecords 
      const actual = await ActualCGPA.create({
        student: studentId,
        records: actualRecords,
        semesterGPA,
        accumulatedCGPA: actualAccumulatedCGPA
      })

      return res.status(201).json({success: true, message: 'Forecasted grades generated successful', data:forecast, code:201});
    } catch (err) {
      console.error('generateForecastFromALevel error:', err);
      return res.status(500).json({
        success: false,
        message: "Error while generating forecasted grades",
        error: err.message,
        code: 500,
      });
    }

}

/**
   * Recompute forecast for all future courses based on ActualCGPA records.
   * - Pulls completedRecords from ActualCGPA documents for this student.
   * - Builds completedRecords as { course, gradePoint, creditLoad }.
   * - Forecasts remaining courses so overall CGPA = desiredCGPA.
   */

/**const updateForecastRecords = async(req,res) => {
  try {
    const { studentId } = req.params;

    // 1. Load student & validate
    const student = await User.findById(studentId);
    if (!student || student.role !== 'student') {
      return res.status(404).json({ error: 'Student not found' });
    }
    const { department, desiredCGPA } = student;

    // 2. Fetch all ActualCGPA entries for this student
    const actualEntries = await ActualCGPA.find({ student: studentId });
    if (!actualEntries.length) {
      return res.status(400).json({ error: 'No actual CGPA records found' });
    }

    // 3. Flatten completedRecords from ActualCGPA
    //    Each entry.records: [{ course, gradePoint }]
    //    We need each record's creditLoad: fetch all courses once
    const allDeptCourses = await Course.find({ department });
    const courseMap = {};
    allDeptCourses.forEach(c => { courseMap[c._id] = c.creditLoad; });

    const completedRecords = [];
    actualEntries.forEach(entry => {
      entry.records.forEach(r => {
        // Skip duplicates if any
        if (!completedRecords.some(cr => String(cr.course) === String(r.course))) {
          completedRecords.push({
            course:     r.course,
            gradePoint: r.gradePoint,
            creditLoad: courseMap[r.course] || 0
          });
        }
      });
    });

    // 4. Compute completed credits & points
    const prevTotalCredits = completedRecords
      .reduce((sum, r) => sum + r.creditLoad, 0);
    const prevTotalPoints  = completedRecords
      .reduce((sum, r) => sum + r.gradePoint * r.creditLoad, 0);

    // 5. Fetch all department courses, determine future courses
    const allCourses = allDeptCourses;
    const doneIds = new Set(completedRecords.map(r => String(r.course)));
    const futureCourses = allCourses
      .filter(c => !doneIds.has(String(c._id)))
      .sort((a, b) => b.creditLoad - a.creditLoad);

    // 6. Compute points needed for remaining courses
    const futureTotalCredits  = futureCourses
      .reduce((sum, c) => sum + c.creditLoad, 0);
    const overallCredits       = prevTotalCredits + futureTotalCredits;
    const desiredTotalPoints   = Math.round(desiredCGPA * overallCredits);
    const remainingPoints      = desiredTotalPoints - prevTotalPoints;

    // Feasibility check: base all future at C=3, max bump = 2 points per credit
    const baseFuturePoints     = 3 * futureTotalCredits;
    const maxExtraFuturePoints = 2 * futureTotalCredits;
    const extraNeeded          = remainingPoints - baseFuturePoints;
    if (extraNeeded < 0 || extraNeeded > maxExtraFuturePoints) {
      return res.status(400).json({
        error: `Cannot re-forecast to meet CGPA ${desiredCGPA} with only A/B/C grades`
      });
    }

    // 7. Initialize forecast records at C=3
    const forecastedRecords = futureCourses.map(c => ({
      course:     c._id,
      courseName: c.name,
      creditLoad: c.creditLoad,
      gradePoint: 3
    }));

    // 8. Distribute extraNeeded via round-robin bumping
    let pool = extraNeeded, noAlloc = 0;
    while (pool > 0 && noAlloc < forecastedRecords.length) {
      let allocated = false;
      for (const rec of forecastedRecords) {
        if (rec.gradePoint < 5 && pool >= rec.creditLoad) {
          rec.gradePoint += 1;      // bump C→B or B→A
          pool -= rec.creditLoad;
          allocated = true;
          break;
        }
      }
      noAlloc = allocated ? 0 : noAlloc + 1;
    }

    // 9. Map numeric gradePoint → letter grade
    forecastedRecords.forEach(r => {
      r.grade = r.gradePoint === 5 ? 'A'
              : r.gradePoint === 4 ? 'B'
              : 'C';
    });

    // 10. Compute new accumulated CGPA
    const futurePoints    = forecastedRecords
      .reduce((sum, r) => sum + r.gradePoint * r.creditLoad, 0);
    const totalPointsAll  = prevTotalPoints + futurePoints;
    const accumulatedCGPA = +(totalPointsAll / overallCredits).toFixed(2);

    // 11. Update (or create) CGPAForecast for this student
    const forecast = await CGPAForecast.findOneAndUpdate(
      { student: studentId },
      {
        student,
        records:       forecastedRecords,
        accumulatedCGPA
      },
      { new: true, upsert: true }
    );

    return res.status(200).json(forecast);
  } catch (err) {
    console.error('updateForecastRecords error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }

  }**/


const GRADE_POINT_BASE    = 3;  // 'C' = 3
const MAX_BUMP_PER_CREDIT = 2;  // can go up to 'A' = 5

  const updateForecastRecords = async (req, res) => {
    try {
      const { studentId } = req.params;
  
      // 1. Load student & validate
      const student = await User.findById(studentId);
      if (!student || student.role !== 'student') {
        return res.status(200).json({success: false, message: 'Student not found', code:200 });
      }
      const { department, desiredCGPA } = student;
  
      // 2. Load the ActualCGPA doc
      const actualDoc = await ActualCGPA.findOne({ student: studentId });
      if (!actualDoc || !Array.isArray(actualDoc.semesterGPA) || !actualDoc.semesterGPA.length) {
        return res.status(200).json({success:false, message: 'No past semester GPAs found', code:200 });
      }
      const semesterGPAs = actualDoc.semesterGPA; 
      const numPastSemesters = semesterGPAs.length;
  
      // 3. Fetch & sort all department courses
      const allCourses = await Course.find({ department }).sort({ level: 1, semester: 1 });
      if (!allCourses.length) {
        return res.status(200).json({success:false, message: 'No courses found for this department', code:200 });
      }
  
      // 4. Group courses into semester buckets
      //    Array of arrays, each entry = one semester’s courses
      const semesterGroups = [];
      let lastKey = null;
      for (const c of allCourses) {
        const key = `${c.level}-${c.semester}`;
        if (key !== lastKey) {
          semesterGroups.push([]);
          lastKey = key;
        }
        semesterGroups[semesterGroups.length - 1].push(c);
      }
  
      if (numPastSemesters > semesterGroups.length) {
        return res.status(200).json({success:false, message: 'Recorded semesters exceed curriculum length', code:200 });
      }
  
      // 5. Compute credits & points from past semesters using semesterGPA
      let prevTotalCredits = 0;
      let prevTotalPoints  = 0;
      for (let i = 0; i < numPastSemesters; i++) {
        const semCourses = semesterGroups[i];
        const semCredits = semCourses.reduce((sum, c) => sum + c.creditLoad, 0);
        prevTotalCredits += semCredits;
        prevTotalPoints  += semCredits * semesterGPAs[i].gradePointAverage;
      }
  
      // 6. Identify future courses
      const futureCourses = semesterGroups
        .slice(numPastSemesters)
        .flat()
        .sort((a, b) => b.creditLoad - a.creditLoad);
  
      const futureTotalCredits = futureCourses.reduce((sum, c) => sum + c.creditLoad, 0);
  
      // 7. Calculate extra points needed above all-C baseline
      const overallCredits     = prevTotalCredits + futureTotalCredits;
      const desiredTotalPoints = Math.round(desiredCGPA * overallCredits);
      const baseFuturePoints   = GRADE_POINT_BASE * futureTotalCredits;
      const extraNeeded        = desiredTotalPoints - prevTotalPoints - baseFuturePoints;
      const maxExtraPossible   = MAX_BUMP_PER_CREDIT * futureTotalCredits;
  
      if (extraNeeded < 0 || extraNeeded > maxExtraPossible) {
        return res.status(200).json({
          success: false,
          message: `Cannot re-forecast to meet desired CGPA ${desiredCGPA} with only A/B/C grades`,
          code: 200
        });
      }
  
      // 8. Initialize forecast at C=3 for all future courses
      const forecastedRecords = futureCourses.map(c => ({
        course:     c._id,
        courseName: c.name,
        creditLoad: c.creditLoad,
        level:      c.level,
        semester:   c.semester,
        gradePoint: GRADE_POINT_BASE
      }));
  
      // 9. Distribute extraNeeded via greedy round-robin (highest credit first)
      let pool = extraNeeded, noAlloc = 0;
      while (pool > 0 && noAlloc < forecastedRecords.length) {
        let allocated = false;
        for (const rec of forecastedRecords) {
          if (rec.gradePoint < GRADE_POINT_BASE + MAX_BUMP_PER_CREDIT
              && pool >= rec.creditLoad) {
            rec.gradePoint += 1;      // bump C→B or B→A
            pool -= rec.creditLoad;
            allocated = true;
            break;
          }
        }
        noAlloc = allocated ? 0 : noAlloc + 1;
      }
  
      // 10. Map numeric gradePoint → letter grade
      forecastedRecords.forEach(r => {
        r.grade = r.gradePoint === 5 ? 'A'
                : r.gradePoint === 4 ? 'B'
                : 'C';
      });
  
      // 11. Compute new accumulated CGPA
      const futurePointsAll = forecastedRecords
        .reduce((sum, r) => sum + r.gradePoint * r.creditLoad, 0);
      const totalPointsAll  = prevTotalPoints + futurePointsAll;
      const accumulatedCGPA = +(totalPointsAll / overallCredits).toFixed(2);
  
      // 12. Update or create the student’s CGPAForecast
      const forecast = await CGPAForecast.findOneAndUpdate(
        { student: studentId },
        {
          student,
          records:           forecastedRecords,
          accumulatedCGPA
        },
        { new: true, upsert: true }
      );
  
      return res.status(200).json({success: true, message: 'Updated Forecasted grades successfully', data:forecast, code:200});
  
    } catch (err) {
      console.error('updateForecastRecords error:', err);
      return res.status(500).json({ success: false, message: "Server error", error: error.message, code:500});
    }
  };

module.exports = {
  generateForecast,
  getForecastByStudent,
  generateForecastFromALevel,
  updateForecastRecords,
}
