const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

// Lấy tất cả mục tiêu của ứng dụng
router.get('/allGoals', goalController.getAllGoals);

// Lấy tất cả mục tiêu của người dùng
router.get('/goals/:userId', goalController.getGoals);

// Lấy mục tiêu theo ID
router.get('/goalsById/:id', goalController.getGoalById);

// Tạo mục tiêu mới
router.post('/goals', goalController.createGoal);

// Cập nhật mục tiêu
router.put('/goals/:id', goalController.updateGoal);

// Xóa mục tiêu
router.delete('/goals/:id', goalController.deleteGoal);

module.exports = router;
