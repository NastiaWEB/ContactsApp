import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAjyd2XBE-CCy4AOERxjHaF4VkRKqsAf7A",
  authDomain: "contacts-react-890d5.firebaseapp.com",
  databaseURL: "https://contacts-react-890d5.firebaseio.com",
  projectId: "contacts-react-890d5",
  storageBucket: "contacts-react-890d5.appspot.com",
  messagingSenderId: "501489946389",
  appId: "1:501489946389:web:4862e651daf5a4c949631c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
