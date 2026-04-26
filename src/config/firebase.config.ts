const admin = require('firebase-admin');

try {
  // בניית האובייקט בזהירות עם בדיקות למניעת קריסה
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // אם המפתח קיים, אנחנו מתקנים את ירידות השורה ומוודאים שאין גרשיים מיותרים
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n').replace(/"/g, '')
      : undefined,
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase initialized successfully");
  }
} catch (error) {
  // בודקים אם השגיאה היא אובייקט שגיאה סטנדרטי
  if (error instanceof Error) {
    console.error("Firebase initialization failed:", error.message);
  } else {
    // אם זו סתם שגיאה כללית (כמו טקסט)
    console.error("Firebase initialization failed:", String(error));
  }
}

module.exports = { firebaseAdmin: admin };