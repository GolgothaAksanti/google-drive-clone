"use client";
import { useState } from "react";
import { EllipsisVertical, File, Folder } from "lucide-react";

import { useFolderContents } from "@/hooks/use-folder-contents";
import { Button } from "./ui/button";

export const FolderViewer = ({ rootFolderId = null }) => {
  const [currentFolder, setCurrentFolder] = useState<string | null>(
    rootFolderId
  );
  const { folders, loading, files } = useFolderContents(currentFolder);

  if (loading) return <p>loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">My Drive</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
        {folders.map((folder) => (
          <Button
            variant="outline"
            key={folder.id}
            size="lg"
            onDoubleClick={() => setCurrentFolder(folder.id)}
            className="cursor-pointer justify-between text-muted-foreground shadow-none px-3 hover:underline"
          >
            <span className="flex items-center gap-2">
              <Folder /> <span>{folder.name}</span>
            </span>
            <EllipsisVertical />
          </Button>
        ))}

        {files.map((file) => (
          <div key={file.id} className="flex justify-between items-center">
            <span>
              <File /> {file.name}
            </span>
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 underline"
            >
              Preview
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
