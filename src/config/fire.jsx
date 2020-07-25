import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA1gBHUqU4HsLnpycHiLcwhhlRpL_pFl6A",
  authDomain: "what-to-make.firebaseapp.com",
  databaseURL: "https://what-to-make.firebaseio.com",
  projectId: "what-to-make",
  storageBucket: "what-to-make.appspot.com",
  messagingSenderId: "131116482191",
  appId: "1:131116482191:web:d7d881cc0fc2c9976cbafa",
};
const fire = firebase.initializeApp(config);

export default fire;
