// routes/adminRoutes.js
const express = require('express');
const router  = express.Router();
const { verifyToken, verifyAdmin, verifySuperadmin } = require('../middleware/auth');
const {
    getStats
}= require('../controllers/admin');

// Only admins and superadmins can view stats
router.route("/stats").get(verifyToken,verifyAdmin,getStats)

module.exports = router;