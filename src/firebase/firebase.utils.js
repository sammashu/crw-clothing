import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBaMlLmQGJqoVkEG4Ss0vIzNoL4bPYq2EE",
    authDomain: "crwn-db-418e5.firebaseapp.com",
    databaseURL: "https://crwn-db-418e5.firebaseio.com",
    projectId: "crwn-db-418e5",
    storageBucket: "crwn-db-418e5.appspot.com",
    messagingSenderId: "73969352958",
    appId: "1:73969352958:web:f8af39a740365b961365af",
    measurementId: "G-F3HECC3VP1"
  };

  export const createUserProfileDocument =  async(userAuth, additionalData) => {
    if(!userAuth) return;
  
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if(!snapShot.exists){
      const { displayName ,email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch (error){
        console.log('error creating user', error.message)
      }
    }

    return userRef;
  }

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '});

export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;