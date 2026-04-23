import type { Request, Response, NextFunction } from 'express';
const Joi = require('joi');

const expertiseSchema = Joi.object({
    candidate_name: Joi.string().required(),
    candidate_email: Joi.string().email().required().messages({
        'string.email': 'יש להזין כתובת מייל תקינה',
        'any.required': 'כתובת מייל היא שדה חובה'
    }),
    expertise: Joi.string()
        .required()
        .custom((value: string, helpers: any) => { 
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount > 2) {
                return helpers.message('ההתמחות חייבת להיות מילה אחת או שתיים בלבד.');
            }
            return value;
        })
});

const validateExpertise = (req: Request, res: Response, next: NextFunction) => {
    const { error } = expertiseSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }
    next();
};

module.exports = { validateExpertise };