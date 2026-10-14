// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { FirebaseApp } from "@firebase/app";
import { Analytics, getAnalytics } from "@firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpT6hl4LKbUQ57IgmJQrajnKPdoGoeXRY",
  authDomain: "polymaze18.firebaseapp.com",
  projectId: "polymaze18",
  storageBucket: "polymaze18.appspot.com",
  messagingSenderId: "10653681502",
  appId: "1:10653681502:web:25df5f678e5432f63731cf",
  measurementId: "G-434JPYYNYJ",
};

// Initialize Firebase
export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
export const analytics: (app: FirebaseApp) => Analytics = (firebaseApp) =>
  getAnalytics(firebaseApp);

export const auth = getAuth(firebaseApp);
// Auto-detect long polling: the default WebChannel stream hangs behind some VPNs/proxies.
export const db = initializeFirestore(firebaseApp, {
  experimentalAutoDetectLongPolling: true,
});
