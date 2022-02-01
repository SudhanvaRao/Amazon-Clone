import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdMc_3in4vM0uWe3EufWuZH3u_oiGUVDA",
  authDomain: "clone-9ec02.firebaseapp.com",
  projectId: "clone-9ec02",
  storageBucket: "clone-9ec02.appspot.com",
  messagingSenderId: "101675169372",
  appId: "1:101675169372:web:79124bb5ab5383dcd85899",
  measurementId: "G-QVGB2PLWSF",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
