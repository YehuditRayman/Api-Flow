import type { Request, Response, NextFunction } from 'express';
const { getCandidateCvData } = require('../services/cv.service');

const fetchCv = async (req:Request, res:Response) => {
    try {
        const { candidate_identifier } = req.body;
        
        const cvData = await getCandidateCvData(candidate_identifier);
        
        return res.status(200).json({
            success: true,
            message: "CV data retrieved successfully",
            data: cvData
        });

    } catch (error:any) {
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

module.exports = { fetchCv };