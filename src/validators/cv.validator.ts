import type { Request, Response, NextFunction } from 'express';
const Joi = require('joi');

const getCvSchema = Joi.object({
    candidate_identifier: Joi.string().required().messages({
        'string.empty': 'Candidate identifier cannot be empty',
        'any.required': 'Candidate identifier is required'
    })
});

// שימוש ב-NextFunction עבור הפרמטר השלישי
const validateCvRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = getCvSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};

module.exports = { validateCvRequest };