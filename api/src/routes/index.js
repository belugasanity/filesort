const express = require('express');
const router = express.Router();
const { getIndex, createUser, loginUser } = require('../controllers');
const upload = require('../google/upload');

// Define a simple GET route
router.get('/', getIndex);
router.post('/users', createUser);
router.post('/login', loginUser);

router.get('/auth/google', (req, res) => {
    const authUrl = getAuthUrl();
    res.redirect(authUrl);
  });
  router.get('/auth/google/callback', async (req, res) => {
    const code = req.query.code;
    const tokens = await getAccessToken(code);
    // Save tokens in session or database for user
    res.json(tokens);
  });
  router.post('/upload', authenticate, upload.single('file'), uploadFile);
  router.get('/files', authenticate, getFiles);

module.exports = router;