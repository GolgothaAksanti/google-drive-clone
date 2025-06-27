"use client";

import { useEffect, useRef, useState } from "react";
import { Check, FileUp, FolderPlus, FolderUp, Plus } from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CreateFolderModalStore } from "@/stores/modal-stores";
import { CurrentFolderStore } from "@/stores/folder-stores";
import { auth } from "@/lib/firebase";
import { Label } from "./ui/label";

const data = [
  { title: "New folder", icon: FolderPlus },
  { title: "File upload", icon: FileUp },
  { title: "Folder upload", icon: FolderUp },
];

export const NewButton = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedVersion, setSelectedVersion] = useState(data[0].title);
  const [isDragging, setIsDragging] = useState(false);
  const setOpenCreateFolder = useSetAtom(CreateFolderModalStore);
  const currentFolder = useAtomValue(CurrentFolderStore);
  const user = auth.currentUser;

  const handleOnclick = (index: number) => {
    handleOpenCreateFolder(index);
    handleOpenUploadFile(index);
    handleUploadFolder(index);
  };

  const handleUploadFolder = (index: number) => {
    if (index !== 2) return;
  };

  const handleOpenCreateFolder = (index: number) => {
    if (index !== 0) return;
    setOpenCreateFolder(true);
  };

  const handleOpenUploadFile = (index: number) => {
    if (index !== 1) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file) {
      await uploadFile(file);
    }
    e.target.value = "";
  };

  const uploadFile = async (file: File) => {
    const token = await user?.getIdToken();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", currentFolder ?? "");

    try {
      await toast.promise(
        fetch("/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }).then(async (res) => {
          const data = await res.json();

          if (data.error) {
            throw new Error("Upload failed");
          }
        }),
        {
          loading: "Uploading file...",
          success: "File upload successfully",
          error: "upload failed",
          richColors: true,
          closeButton: true,
        }
      );
    } catch (error) {
      console.dir(error);
    }
  };

  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer?.files?.[0];
      if (file) {
        await uploadFile(file);
      }
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  // const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const token = await user?.getIdToken();
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("folderId", currentFolder ?? "");

  //   try {
  //     await toast.promise(
  //       fetch("/api/upload", {
  //         method: "POST",
  //         headers: { Authorization: `Bearer ${token}` },
  //         body: formData,
  //       }).then(async (res) => {
  //         const data = await res.json();

  //         if (data.error) {
  //           throw new Error("Upload failed");
  //         }
  //       }),
  //       {
  //         loading: "Uploading file...",
  //         success: "File upload successfully",
  //         error: "upload failed",
  //         richColors: true,
  //         closeButton: true,
  //       }
  //     );
  //   } catch (error) {
  //     console.dir(error);
  //   }
  // };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              variant="outline"
              className="bg-zinc-100 border cursor-pointer"
            >
              <Plus className="size-10" />
              <div className=" leading-none">New</div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <input
            ref={fileInputRef}
            type="file"
            className="h-0 w-0"
            hidden
            onChange={handleFileChange}
          />
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {data.map((item, i) => (
              <DropdownMenuItem
                key={item.title}
                onClick={() => handleOnclick(i)}
                onSelect={() => setSelectedVersion(item.title)}
              >
                <item.icon />
                {i === 1 ? (
                  <Label htmlFor="file-upload"> {item.title}</Label>
                ) : (
                  item.title
                )}

                {item.title === selectedVersion && (
                  <Check className="ml-auto" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
