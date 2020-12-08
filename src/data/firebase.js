import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.DB_API_TOKEN,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();