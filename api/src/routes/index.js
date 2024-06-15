const express = require('express');
const router = express.Router();
const { getIndex, createUser, loginUser } = require('../controllers');

// Define a simple GET route
router.get('/', getIndex);
router.post('/users', createUser);
router.post('/login', loginUser);

module.exports = router;