import type { ICV } from '../models/cv.model';
const CV = require('../models/cv.model');

// הוספת הטיפוס string לפרמטר identifier
const getCandidateCvData = async (identifier: string): Promise<ICV> => {
    console.log(`[Service] Fetching CV from MongoDB for: ${identifier}`);
    
    // מציינים ל-Mongoose מה סוג הנתון שחוזר (ICV)
    const cvData = await CV.findOne({
        $or: [
            { candidate_id: identifier },
            { name: identifier }
        ]
    });
    
    if (!cvData) {
        throw new Error('CV_NOT_FOUND');
    }
    
    return cvData;
};

module.exports = { getCandidateCvData };