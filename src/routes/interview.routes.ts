const express = require('express');
const router = express.Router();

const { validateExpertise } = require('../validators/interview.validator');
const { saveExpertise } = require('../controllers/interview.controller');

router.post('/extract-expertise', validateExpertise, saveExpertise);

module.exports = router;