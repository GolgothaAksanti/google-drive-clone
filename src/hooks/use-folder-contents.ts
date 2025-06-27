import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import type { Folder, FileItem } from "@/types/folder";

export const useFolderContents = (folderId: string | null) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const foldersQ = query(
        collection(db, "folders"),
        where("ownerId", "==", user.uid),
        where("parentId", "==", folderId ?? null)
      );
      const foldersSnap = await getDocs(foldersQ);
      console.dir(foldersSnap);
      setFolders(
        foldersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Folder))
      );

      const filesQ = query(
        collection(db, "files"),
        where("ownerId", "==", user.uid),
        where("folderId", "==", folderId)
      );
      const filesSnap = await getDocs(filesQ);
      setFiles(
        filesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as FileItem))
      );
    };

    fetchData();
  }, [folderId]);

  return { folders, files };
};
