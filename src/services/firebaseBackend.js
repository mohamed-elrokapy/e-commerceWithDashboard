// Firebase backend: Firebase Auth for sign-in, Cloud Firestore for data.
//
//   users/{uid}     { fullName, email, phone, role, createdAt }
//   products/{id}   { title, productDescription, price, img, createdAt }
//
// This module is imported lazily (see services/index.js) so the Firebase SDK
// is only downloaded when the environment variables are configured.
//
// Roles live in the Firestore user document. To make "admin" mean something
// the Firestore security rules must stop users from writing their own `role`.

import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { DEMO_PRODUCTS } from "./demoSeed";
import { ApiError, normalizeProduct, normalizeUser } from "./shared";

const AUTH_MESSAGES = {
  "auth/invalid-credential": "Invalid email or password.",
  "auth/wrong-password": "Invalid email or password.",
  "auth/user-not-found": "Invalid email or password.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Choose a stronger password.",
  "auth/too-many-requests": "Too many attempts. Try again in a few minutes.",
  "auth/network-request-failed": "Network error. Check your connection.",
  "auth/popup-closed-by-user": "Google sign-in was cancelled.",
  "auth/operation-not-allowed":
    "This sign-in method is not enabled for the Firebase project.",
};

function wrap(error) {
  if (error instanceof ApiError) return error;
  const code = error?.code ?? "";
  if (code === "permission-denied")
    return new ApiError(
      "Firestore denied this request. Check the project's security rules.",
      { status: 403, cause: error }
    );
  if (code === "unavailable")
    return new ApiError("Firebase is unreachable. Check your connection.", {
      cause: error,
    });
  return new ApiError(AUTH_MESSAGES[code] ?? error?.message ?? "Request failed.", {
    cause: error,
  });
}

const guard = (fn) => async (...args) => {
  try {
    return await fn(...args);
  } catch (error) {
    throw wrap(error);
  }
};

export function createFirebaseBackend(config) {
  const app = initializeApp(config);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();

  const userDoc = (id) => doc(db, "users", id);

  async function readProfile(firebaseUser) {
    const snap = await getDoc(userDoc(firebaseUser.uid));
    if (snap.exists()) return normalizeUser({ id: snap.id, ...snap.data() });
    // Signed in but no profile yet (for example Google sign-in): create one.
    const profile = {
      fullName: firebaseUser.displayName ?? "",
      email: firebaseUser.email ?? "",
      phone: firebaseUser.phoneNumber ?? "",
      role: "user",
      createdAt: new Date().toISOString(),
    };
    await setDoc(userDoc(firebaseUser.uid), profile);
    return normalizeUser({ id: firebaseUser.uid, ...profile });
  }

  return {
    id: "firebase",
    label: "Firebase",
    description: `Connected to Firebase project ${config.projectId}.`,
    capabilities: { google: true, seedCatalog: true, resetDemo: false },

    listProducts: guard(async () => {
      const snap = await getDocs(collection(db, "products"));
      return snap.docs
        .map((d) => normalizeProduct({ id: d.id, ...d.data() }))
        .sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
    }),

    createProduct: guard(async (values) => {
      const data = {
        title: values.title,
        productDescription: values.description,
        price: Number(values.price),
        img: values.image,
        createdAt: new Date().toISOString(),
      };
      const ref = await addDoc(collection(db, "products"), data);
      return normalizeProduct({ id: ref.id, ...data });
    }),

    updateProduct: guard(async (id, values) => {
      const data = {
        title: values.title,
        productDescription: values.description,
        price: Number(values.price),
        img: values.image,
      };
      await updateDoc(doc(db, "products", id), data);
      const snap = await getDoc(doc(db, "products", id));
      return normalizeProduct({ id, ...snap.data() });
    }),

    deleteProduct: guard(async (id) => {
      await deleteDoc(doc(db, "products", id));
    }),

    seedCatalog: guard(async () => {
      const batch = writeBatch(db);
      for (const p of DEMO_PRODUCTS) {
        const { id: _id, ...data } = p;
        batch.set(doc(collection(db, "products")), data);
      }
      await batch.commit();
    }),

    listUsers: guard(async () => {
      const snap = await getDocs(collection(db, "users"));
      return snap.docs.map((d) => normalizeUser({ id: d.id, ...d.data() }));
    }),

    updateUser: guard(async (id, patch) => {
      const data = {};
      for (const key of ["fullName", "phone", "role"]) {
        if (patch[key] !== undefined) data[key] = patch[key];
      }
      await updateDoc(userDoc(id), data);
      const snap = await getDoc(userDoc(id));
      return normalizeUser({ id, ...snap.data() });
    }),

    // Removes the Firestore profile only. Deleting the Firebase Auth account
    // itself needs the Admin SDK or the Firebase console.
    deleteUser: guard(async (id) => {
      await deleteDoc(userDoc(id));
    }),

    register: guard(async ({ fullName, email, phone, password }) => {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(cred.user, { displayName: fullName.trim() });
      const profile = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role: "user",
        createdAt: new Date().toISOString(),
      };
      await setDoc(userDoc(cred.user.uid), profile);
      return normalizeUser({ id: cred.user.uid, ...profile });
    }),

    login: guard(async ({ email, password, remember }) => {
      await setPersistence(
        auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      );
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      return readProfile(cred.user);
    }),

    loginWithGoogle: guard(async () => {
      const cred = await signInWithPopup(auth, googleProvider);
      return readProfile(cred.user);
    }),

    restoreSession: guard(async () => {
      await auth.authStateReady();
      return auth.currentUser ? readProfile(auth.currentUser) : null;
    }),

    logout: guard(async () => {
      await signOut(auth);
    }),
  };
}
