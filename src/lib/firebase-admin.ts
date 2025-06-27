import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// const serviceAccount = JSON.parse(
//   readFileSync(
//     path.join(process.cwd(), "credentials/firebase-credentials.json"),
//     "utf-8"
//   )
// );
const base64 = process.env.FIREBASE_ADMIN_CREDENTIALS_BASE64;

if (!base64) {
  throw new Error("FIREBASE_ADMIN_CREDENTIALS_BASE64 is not set in .env.local");
}

const serviceAccount = JSON.parse(
  Buffer.from(base64, "base64").toString("utf-8")
);

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
      })
    : getApps()[0];

// if (!getApps().length) {
//   initializeApp({
//     credential: cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//   });
// }

export const adminAuth = getAuth();
export const serverDB = getFirestore(app);
