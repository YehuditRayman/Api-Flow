require('dotenv').config(); 
const express = require('express');
const cors = require('cors'); // 1. העברתי את הייבוא להתחלה
const connectDB = require('./db/db-connection'); 

const interviewRoutes = require('./routes/interview.routes');
const cvRoutes = require('./routes/cv.routes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({ origin: true })); 

app.use(express.json());

app.use('/api/tools', interviewRoutes);
app.use('/api/tools/cv', cvRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`CV Tool URL: http://localhost:${PORT}/api/tools/cv/get-cv`);
});