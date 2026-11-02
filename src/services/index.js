import { getFirebaseConfig, isDemoForced } from "../lib/config";
import { createDemoBackend } from "./demoBackend";

/**
 * Picks the backend once at startup.
 * - Firebase when VITE_FIREBASE_* variables are set (and demo is not forced).
 * - Otherwise the browser-only demo backend.
 */
export async function createBackend() {
  const firebase = getFirebaseConfig();
  if (firebase.configured && !isDemoForced()) {
    const { createFirebaseBackend } = await import("./firebaseBackend");
    return createFirebaseBackend(firebase.config);
  }
  return createDemoBackend();
}

export const isRemoteConfigured = () => getFirebaseConfig().configured;
