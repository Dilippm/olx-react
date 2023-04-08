import firebase from 'firebase';

import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "fir-c96c8.firebaseapp.com",
  projectId: "fir-c96c8",
  storageBucket: "fir-c96c8.appspot.com",
  messagingSenderId: "919982099304",
  appId: "1:919982099304:web:48c4a6a799bbfe6d45a4dd",
  measurementId: "G-M74Q6RPBD9"
};

 export default firebase.initializeApp(firebaseConfig)