import type { Request, Response, NextFunction } from 'express';
const { processExpertiseData } = require('../services/interview.service');

const saveExpertise = async (req:Request, res:Response) => {
    try {
        const { candidate_name, expertise, candidate_email } = req.body;

        const serviceResult = await processExpertiseData(candidate_name, expertise, candidate_email);

        return res.status(200).json({
            success: true,
            message: "הנתונים נשמרו והמייל נשלח בהצלחה",
            data: serviceResult
        });

    } catch (error) {
        console.error("[Controller Error]:", error);
        return res.status(500).json({
            success: false,
            message: "שגיאה פנימית בשרת בעת עיבוד הנתונים"
        });
    }
};

module.exports = { saveExpertise };