// routes/followerRoutes.js
const express = require('express');
const router = express.Router();
const followerController = require('../controllers/followerController');

// Lấy danh sách các followers của một mục tiêu
router.get('/followers/:goalId', followerController.getFollowersByGoal);

// Theo dõi một mục tiêu
router.post('/follow/:goalId', followerController.followGoal);

// Hủy theo dõi mục tiêu
router.delete('/unfollow/:goalId/:userId', followerController.unfollowGoal);

module.exports = router;
