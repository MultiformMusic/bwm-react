const express = require('express');
const UserController = require('../controllers/user');
const router = express.Router();

router.post('/auth', UserController.auth);

router.post('/register', UserController.register);

module.exports = router;