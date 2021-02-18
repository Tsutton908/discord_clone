import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBCMe8kVWS6L8P0aMoBG2zlXaVjKbxNM-A",
    authDomain: "discord-clone-e3336.firebaseapp.com",
    projectId: "discord-clone-e3336",
    storageBucket: "discord-clone-e3336.appspot.com",
    messagingSenderId: "566234023681",
    appId: "1:566234023681:web:ed07446a9016293ade3d00",
    measurementId: "G-FCY66CXELQ"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;