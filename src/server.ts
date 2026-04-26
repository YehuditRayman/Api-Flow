require('dotenv').config(); 
const express = require('express');
const cors = require('cors'); // 1. העברתי את הייבוא להתחלה
const connectDB = require('./db/db-connection'); 

const interviewRoutes = require('./routes/interview.routes');
const cvRoutes = require('./routes/cv.routes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// --- תחילת השינוי בהגדרות ה-CORS ---
const allowedOrigins = [
  'http://localhost:5173', // מאפשר לפרונטאנד המקומי שלך (Vite) לגשת במהלך הפיתוח
  'https://storage.googleapis.com/virtual-assistant-app/index.html' // מאפשר לפרונטאנד שיושב ב-Google Cloud Storage לגשת לשרת
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // אופציונלי: מגביל את סוגי הבקשות המותרות
  credentials: true // חשוב מאוד אם את מעבירה טוקנים (Cookies/Authorization Headers) בבקשות
}));
// --- סוף השינוי ---

app.use(express.json());

app.use('/api/tools', interviewRoutes);
app.use('/api/tools/cv', cvRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`CV Tool URL: http://localhost:${PORT}/api/tools/cv/get-cv`);
});