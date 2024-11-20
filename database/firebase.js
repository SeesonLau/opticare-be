// firebase.js
const admin = require('firebase-admin');

const serviceAccount = require('./firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Access Firestore
module.exports = db; // Export the Firestore instance
