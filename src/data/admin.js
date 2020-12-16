import firebase from "firebase/app";
import "firebase/auth"
const admin = require("firebase-admin")
const serviceAccount = require("../data/service")

export const verifyIdToken = (token) => {
  if(!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(JSON.stringify(serviceAccount))),
      databaseURL: process.env.DATABASE_URL,
    })
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error
    })
}