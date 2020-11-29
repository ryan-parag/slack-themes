import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDt1Ge9NRBJ36xlutw3AxUc5I-N6PQa6e8",
  authDomain: "slack-themes.firebaseapp.com",
  databaseURL: "https://slack-themes.firebaseio.com",
  projectId: "slack-themes",
  storageBucket: "slack-themes.appspot.com",
  messagingSenderId: "979998890276",
  appId: "1:979998890276:web:4d29051641af07efd73bb1"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase