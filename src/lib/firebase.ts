// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserLocalPersistence, browserSessionPersistence, debugErrorMap, initializeAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  // Enter your Firebase configuration
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, { persistence: [browserLocalPersistence, browserSessionPersistence],errorMap: debugErrorMap });

// To apply the default browser preference instead of explicitly setting it.
auth.useDeviceLanguage();