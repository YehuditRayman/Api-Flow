# 1. בחירת תמונת הבסיס - הגרסה של Node.js
FROM node:18-slim

# 2. יצירת תיקיית עבודה בתוך הקונטיינר
WORKDIR /usr/src/app

# 3. העתקת קבצי הגדרות התלויות (Dependencies)
# אנחנו מעתיקים אותם קודם כדי לנצל את מנגנון ה-Cache של Docker
COPY package*.json ./

# 4. התקנת הספריות (רק אלו שדרושות לייצור)
RUN npm install --only=production

# 5. העתקת שאר קוד המקור של האפליקציה
COPY . .

# 6. הגדרת הפורט שהקונטיינר יחשוף (בדרך כלל 8080 ב-Google Cloud)
EXPOSE 8080

# 7. פקודת ההרצה של האפליקציה
CMD ["node", "app.js"]