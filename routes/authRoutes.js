const express = require('express');
const authController = require('../controllers/authController');  // Import controller
const router = express.Router();

// Route đăng ký người dùng
router.post('/register', authController.register);

// Route đăng nhập người dùng
router.post('/login', authController.login);

module.exports = router;
