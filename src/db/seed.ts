require('dotenv').config(); 
const mongoose = require('mongoose');
const CV = require('../models/cv.model'); 

// נתוני הדמה שלנו
const mockData = [
    {
        candidate_id: "12345",
        name: "שירה",
        email:"y0556741787@gmail.com",
        experience: "3 שנות ניסיון בפיתוח צד לקוח עם React.",
        education: "תואר ראשון במדעי המחשב",
        skills: ["React", "JavaScript"]
    },
    {
        candidate_id: "67890",
        name: "רבקה",
        email: "r0556741787@gmail.com",
        experience: "5 שנות ניסיון ב-NodeJS ו-Python.",
        education: "בוגרת קורס תכנות אינטנסיבי",
        skills: ["Node.js", "Python"]
    }
];

const seedDatabase = async () => {
    try {
        // 1. התחברות למסד הנתונים
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB...');

        // 2. ניקוי האוסף הישן (כדי שלא יהיו כפילויות אם נריץ שוב)
        await CV.deleteMany({});
        console.log('Cleared old data...');

        // 3. הכנסת הנתונים החדשים בבת אחת
        await CV.insertMany(mockData);
        console.log('Mock data inserted successfully!');

        // 4. סגירת החיבור וסיום
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDatabase();