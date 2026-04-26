const express = require('express');
const router = express.Router();

const { validateExpertise } = require('../validators/interview.validator');
const { saveExpertise } = require('../controllers/interview.controller');

const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/extract-expertise', verifyToken, validateExpertise, saveExpertise);

module.exports = router;