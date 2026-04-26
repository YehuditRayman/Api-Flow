import type { Request, Response, NextFunction } from 'express';
const { getCandidateCvData } = require('../services/cv.service');
const { firebaseAdmin } = require('../config/firebase.config');

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
        const db = firebaseAdmin.firestore();
        const snapshot = await db.collection('cvs').get();

        // תיקון: הגדרנו במפורש שזהו מערך שיכול להכיל כל סוג של נתון (any[])
        const cvsList: any[] = [];

        // תיקון: הגדרנו ש-doc הוא מסוג any
        snapshot.forEach((doc: any) => {
            cvsList.push({ id: doc.id, ...doc.data() });
        });

        return res.status(200).json({ success: true, data: cvsList });
    } catch (error: any) {
        // השורה הזו קריטית: היא תדפיס ללוגים של גוגל את השגיאה האמיתית של פיירבייס!
        console.error("🔥 Error fetching CVs:", error);

        return res.status(500).json({
            success: false,
            message: "שגיאה בשליפת קורות החיים"
        });
    }
};

    module.exports = { fetchCv, getAllCvs };