import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyA1gBHUqU4HsLnpycHiLcwhhlRpL_pFl6A",
  authDomain: "what-to-make.firebaseapp.com",
  databaseURL: "https://what-to-make.firebaseio.com",
  projectId: "what-to-make",
  storageBucket: "what-to-make.appspot.com",
  messagingSenderId: "131116482191"
};
const fire = firebase.initializeApp(config);

export default fire;
