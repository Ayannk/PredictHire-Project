const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Resume = require('../models/resumeModel');
const verifyToken = require('../middlewares/verifyToken');

// Get dashboard statistics
router.get('/stats', verifyToken, async (req, res) => {
    try {
        // Get total users count
        const totalUsers = await User.countDocuments();
        
        // Get total resumes count
        const totalResumes = await Resume.countDocuments();
        
        // Get active users (users who logged in within last 24 hours)
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const activeUsers = await User.countDocuments({
            lastLogin: { $gte: twentyFourHoursAgo }
        });
        
        // Get recent uploads (last 10)
        const recentUploads = await Resume.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('userId', 'name')
            .select('originalName createdAt userId')
            .lean()
            .then(uploads => uploads.map(upload => ({
                userName: upload.userId.name,
                fileName: upload.originalName,
                date: upload.createdAt
            })));

        res.json({
            totalUsers,
            totalResumes,
            activeUsers,
            recentUploads
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Error fetching dashboard statistics' });
    }
});

module.exports = router;