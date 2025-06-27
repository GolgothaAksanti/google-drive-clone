import { Timestamp } from "firebase/firestore";

export type Folder = {
  id: string;
  name: string;
  parentId: string | null;
  ownerId: string;
  createdAt: Timestamp;
};

export type FileItem = {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  ownerId: string;
  folderId: string | null;
  createdAt: Timestamp;
};
export type UploadStatus =
  | "idle"
  | "uploading"
  | "saving"
  | "success"
  | "error";
