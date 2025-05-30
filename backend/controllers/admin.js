// controllers/AdminController.js
const User          = require('../models/User');
const University    = require('../models/University');
const Department    = require('../models/Department');
const Course        = require('../models/Course');
const CGPAForecast  = require('../models/CGPAForecast');
const ActualCGPA    = require('../models/ActualCGPA');

  /**
   * GET /admin/stats
   * Returns overall counts for dashboard statistics.
   */
  const getStats = async (req, res) => {
    try {
      // 1. Count users by role
      const totalStudents    = await User.countDocuments({ role: 'student' });
      const totalAdmins      = await User.countDocuments({ role: 'admin' });
      const totalSuperadmins = await User.countDocuments({ role: 'superadmin' });

      // 2. Count academic entities
      const totalUniversities = await University.countDocuments();
      const totalDepartments  = await Department.countDocuments();
      const totalCourses      = await Course.countDocuments();

      // 3. Count forecasting & actual CGPA records
      const totalForecasts    = await CGPAForecast.countDocuments();
      const totalActuals      = await ActualCGPA.countDocuments();

      // 4. Return aggregated stats
      return res.json({
        totalStudents,
        totalAdmins,
        totalSuperadmins,
        totalUniversities,
        totalDepartments,
        totalCourses,
        totalForecasts,
        totalActuals
      });
    } catch (err) {
      console.error('getStats error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = {
    getStats
}