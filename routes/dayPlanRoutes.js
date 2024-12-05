const express = require('express');
const router = express.Router();
const dayPlanController = require('../controllers/dayPlanController');

// Lấy tất cả kế hoạch theo ngày của mục tiêu
router.get('/dayplans/:goalId', dayPlanController.getDayPlans);

// Lấy kế hoạch theo ngày theo ID
router.get('/dayplans/:id', dayPlanController.getDayPlanById);

// Lấy kế hoạch theo ngày theo GoalID
router.get('/dayplans/:goalID', dayPlanController.getDayPlanByGoalID);

// Tạo kế hoạch theo ngày mới
router.post('/dayplans', dayPlanController.createDayPlan);

// Cập nhật kế hoạch theo ngày
router.put('/dayplans/:id', dayPlanController.updateDayPlan);

// Xóa kế hoạch theo ngày
router.delete('/dayplans/:id', dayPlanController.deleteDayPlan);

module.exports = router;
