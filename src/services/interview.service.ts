const nodemailer = require('nodemailer');

const processExpertiseData = async (candidateName: string, expertise: string, candidateEmail: string) => {
    console.log(`[Service] מעבד נתונים עבור: ${candidateName}, מייל: ${candidateEmail}`);

    // 1. הגדרת השירות לשליחת המייל
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // 2. הגדרת תוכן המייל
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: candidateEmail,
        subject: 'אישור קבלת פרטים - תהליך הצטרפות',
        text: `שלום ${candidateName},\n\nשמחנו לשוחח איתך. הפרטים שלך בנושא התמחות ב-${expertise} נקלטו במערכת בהצלחה.\n\nבברכה,\nצוות הגיוס`
    };

    // 3. שליחת המייל בפועל
    try {
        await transporter.sendMail(mailOptions);
        console.log(`[Service] מייל נשלח בהצלחה ל-${candidateEmail}`);
    } catch (mailError) {
        console.error("[Mail Error] שגיאה בשליחת המייל:", mailError);
        // אנחנו לא עוצרים את התהליך אם רק המייל נכשל, אבל מתעדים זאת
    }

    return {
        status: 'success',
        processedAt: new Date().toISOString(),
        candidate: candidateName,
        email: candidateEmail,
        skill: expertise
    };
};

module.exports = { processExpertiseData };