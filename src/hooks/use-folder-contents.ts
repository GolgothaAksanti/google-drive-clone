import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import type { Folder, FileItem } from "@/types/folder";

export const useFolderContents = (folderId: string | null) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const foldersQ = query(
      collection(db, "folders"),
      where("ownerId", "==", user.uid),
      where("parentId", "==", folderId ?? null)
      // orderBy("createdAt", "desc")
    );

    const unsubscribeFolders = onSnapshot(foldersQ, (snapshot) => {
      const folderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Folder[];
      setFolders(folderList);
      setLoading(false);
    });

    const filesQ = query(
      collection(db, "files"),
      where("ownerId", "==", user.uid),
      where("folderId", "==", folderId ?? null)
      // orderBy("createdAt", "desc")
    );

    const unsubscribeFiles = onSnapshot(filesQ, (snapshot) => {
      const fileList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FileItem[];
      setFiles(fileList);
      setLoading(false);
    });

    return () => {
      unsubscribeFolders();
      unsubscribeFiles();
    };
  }, [folderId, files]);

  return { folders, loading, files };
};
