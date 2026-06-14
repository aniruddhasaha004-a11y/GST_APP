const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, getAllUsers, createStaff } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// Admin only routes
router.get('/users', protect, admin, getAllUsers);
router.post('/staff', protect, admin, createStaff);

module.exports = router;
