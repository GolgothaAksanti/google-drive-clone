/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";

export const getCurrentUser = async () => {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (err: unknown) {
    return null;
  }
};
