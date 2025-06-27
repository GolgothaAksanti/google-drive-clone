import { adminAuth } from "./firebase-admin";

export const verifyFirebaseToken = async (token: string): Promise<string> => {
  const decoded = await adminAuth.verifyIdToken(token);
  return decoded.uid;
};
