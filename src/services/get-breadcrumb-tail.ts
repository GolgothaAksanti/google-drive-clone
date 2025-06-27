// import { db } from "@/lib/firebase";
// import type { Folder } from "@/types/folder";
// import { doc, getDoc } from "firebase/firestore";

// export const getBreadcrumbTrail = async (
//   folderId: string | null
// ): Promise<Folder[]> => {
//   const trail: Folder[] = [];

//   while (folderId) {
//     const docs = await getDoc(doc(db, "folders", folderId));
//     if (!docs.exists()) break;

//     const folder = { id: doc.id, ...doc.data() } as Folder;
//     trail.unshift(folder);
//     folderId = folder.parentId;
//   }

//   return trail;
// };
