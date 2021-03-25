import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAvtmq__H2P4EqxDTnrLzmprpw-WSb3VAM',
  authDomain: 'journal-react-app-a0f14.firebaseapp.com',
  projectId: 'journal-react-app-a0f14',
  storageBucket: 'journal-react-app-a0f14.appspot.com',
  messagingSenderId: '306062118893',
  appId: '1:306062118893:web:49deb6ec1f833e2cfe61e4',
  measurementId: 'G-WKXH9B5DFE',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//Provider
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
