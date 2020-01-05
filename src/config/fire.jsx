import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: process.env.REACT_APP_RECIPE_SEARCH_ENGINE_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_RECIPE_SEARCH_ENGINE_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_RECIPE_SEARCH_ENGINE_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_RECIPE_SEARCH_ENGINE_FIREBASE_PROJECTID,
  storageBucket:
    process.env.REACT_APP_RECIPE_SEARCH_ENGINE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_RECIPE_SEARCH_ENGINE_CLIENTID
};
const fire = firebase.initializeApp(config);

export default fire;
