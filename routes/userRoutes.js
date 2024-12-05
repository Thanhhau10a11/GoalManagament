const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Lấy tất cả người dùng
router.get('/users', userController.getAllUsers);

// Lấy một người dùng theo ID
router.get('/users/:id', userController.getUserById);

// Tạo người dùng mới
router.post('/users', userController.createUser);

// Cập nhật người dùng
router.put('/users/:id', userController.updateUser);

// Xóa người dùng
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
