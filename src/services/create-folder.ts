import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { auth } from "@/lib/firebase";

export const createFolder = async (
  name: string,
  parentId: string | null = null
) => {
  const user = auth.currentUser;
  console.dir(user);
  if (!user) throw new Error("Not authenticated");

  await addDoc(collection(db, "folders"), {
    name,
    parentId: parentId ?? null,
    ownerId: user.uid,
    createdAt: Timestamp.now(),
  });
};
