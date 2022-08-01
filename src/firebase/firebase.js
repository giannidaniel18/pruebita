
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDtKoDpwKbtMPvVdoxStaJvol8xyFWOLe4",
  authDomain: "scriptingpoc2022.firebaseapp.com",
  projectId: "scriptingpoc2022",
  storageBucket: "scriptingpoc2022.appspot.com",
  messagingSenderId: "746771111231",
  appId: "1:746771111231:web:03748f7c6ea0bca954c78a"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)