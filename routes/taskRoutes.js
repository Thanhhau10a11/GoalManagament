const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Lấy tất cả nhiệm vụ theo kế hoạch ngày
router.get('/tasks/:dayPlanId', taskController.getTasks);

// Lấy nhiệm vụ theo ID
router.get('/tasks/:id', taskController.getTaskById);

// Tạo nhiệm vụ mới
router.post('/tasks', taskController.createTask);

// Cập nhật nhiệm vụ
router.put('/tasks/:id', taskController.updateTask);

// Xóa nhiệm vụ
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
