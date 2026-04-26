import type { Request, Response, NextFunction } from 'express';
const { getCandidateCvData } = require('../services/cv.service');
const { firebaseAdmin } = require('../config/firebase.config');
const CV = require('../models/cv.model');

const fetchCv = async (req: Request, res: Response) => {
    try {
        const { candidate_identifier } = req.body;

        const cvData = await getCandidateCvData(candidate_identifier);

        return res.status(200).json({
            success: true,
            message: "CV data retrieved successfully",
            data: cvData
        });

    } catch (error: any) {
        if (error.message === 'CV_NOT_FOUND') {
            return res.status(404).json({
                success: false,
                message: "Candidate CV not found in the database"
            });
        }

        console.error("[Controller Error]:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while fetching CV"
        });
    }
};

const getAllCvs = async (req: Request, res: Response) => {
    try {
        const cvsList = await CV.find({}).lean();

        return res.status(200).json({ 
            success: true, 
            data: cvsList 
        });
    } catch (error: any) {
        // מדפיס ללוגים בגוגל קלאוד במקרה של קריסה
        console.error("🔥 Error fetching CVs from MongoDB:", error);

        return res.status(500).json({
            success: false,
            message: "שגיאה בשליפת קורות החיים"
        });
    }
};

module.exports = { fetchCv, getAllCvs };