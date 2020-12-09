import firebase from "firebase";
import "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

export function firebaseClient() {
  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }
}

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();