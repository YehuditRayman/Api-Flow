// src/routes/cv.routes.js
const express = require('express');
const router = express.Router();

const { validateCvRequest } = require('../validators/cv.validator');
const { fetchCv } = require('../controllers/cv.controller');

router.post('/get-cv', validateCvRequest, fetchCv);

module.exports = router;