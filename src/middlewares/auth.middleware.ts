import type { Request, Response, NextFunction } from 'express';
const { firebaseAdmin } = require('../config/firebase.config');

export interface AuthenticatedRequest extends Request {
    user?: any; 
}

const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'חסר טוקן אימות (Unauthorized)' });
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next(); 
    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        return res.status(403).json({ success: false, message: 'טוקן לא תקין או פג תוקף (Forbidden)' });
    }
};

// ייצוא בשיטת CommonJS
module.exports = { verifyToken };