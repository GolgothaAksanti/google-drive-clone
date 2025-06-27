"use client";

import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";

const MAX_BYTES = 100 * 1024 * 1024; // 100 MB

export const StorageUsage = () => {
  const { user } = useUser();
  const [used, setUsed] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchStorage = async () => {
      const q = query(
        collection(db, "files"),
        where("ownerId", "==", user.uid)
      );
      const snapshot = await getDocs(q);

      const totalSize = snapshot.docs.reduce(
        (acc, doc) => acc + doc.data().size,
        0
      );
      setUsed(totalSize);
    };

    fetchStorage();
  }, [user]);

  const percent = Math.round((used / MAX_BYTES) * 100);

  return (
    <div className="w-full mt-4">
      <div className="text-sm text-gray-700 mb-1">
        Storage Used: {(used / 1024 / 1024).toFixed(2)} MB / 100 MB
      </div>
      <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full bg-indigo-500"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};
