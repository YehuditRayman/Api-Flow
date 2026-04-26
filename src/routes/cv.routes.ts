const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/auth.middleware');

const { validateCvRequest } = require('../validators/cv.validator');
const { fetchCv,getAllCvs } = require('../controllers/cv.controller');

router.post('/get-cv', verifyToken, validateCvRequest, fetchCv);
router.get('/get-all-cvs', verifyToken, getAllCvs);

module.exports = router;