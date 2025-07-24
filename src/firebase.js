import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAkltZNV-2N3bb5KbyRxw5r74et7cNcpCQ",
  authDomain: "ecommerce2-4a5e2.firebaseapp.com",
  projectId: "ecommerce2-4a5e2",
  storageBucket: "ecommerce2-4a5e2.firebasestorage.app",
  messagingSenderId: "124185036129",
  appId: "1:124185036129:web:901363e118d7d985e3f120",
  measurementId: "G-4VBBH48H2D",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
