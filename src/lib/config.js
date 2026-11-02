// Central place for environment-driven settings and demo store rules.

const env = import.meta.env;

// Copy that differs between deployments of this storefront.
export const STORE = {
  name: "Sufra",
  eyebrow: "Pizza, shawarma, koshari and sweets",
  heroTitle: "A short menu, a full table.",
  heroText:
    "Browse the menu, build a cart and check out. This is a demo storefront, so there is no real kitchen behind it, but every screen works.",
  footerText: "A demo storefront with a cart, checkout and an admin dashboard.",
  description:
    "Sufra is a demo online food shop with a storefront, cart, checkout and an admin dashboard, built with React, Vite and Tailwind CSS.",
};
export const STORE_NAME = STORE.name;

// Demo store rules used by the cart and checkout. Not real business logic.
export const TAX_RATE = 0.05;
export const SHIPPING_FLAT = 5;
export const FREE_SHIPPING_OVER = 50;

const FORCE_DEMO_KEY = "shopdemo.forceDemo";

export function isDemoForced() {
  try {
    return (
      env.VITE_BACKEND === "demo" || localStorage.getItem(FORCE_DEMO_KEY) === "1"
    );
  } catch {
    return env.VITE_BACKEND === "demo";
  }
}

export function setDemoForced(value) {
  try {
    if (value) localStorage.setItem(FORCE_DEMO_KEY, "1");
    else localStorage.removeItem(FORCE_DEMO_KEY);
  } catch {
    /* storage unavailable */
  }
}

export function getFirebaseConfig() {
  const config = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  };
  const configured = Boolean(config.apiKey && config.projectId && config.appId);
  return { configured, config };
}
