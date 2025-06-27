/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import { FileUp, FolderPlus, Plus } from "lucide-react";
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
];

export const NewButton = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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
    const files = e.target.files;
    if (!files) return;

    if (files) {
      await uploadFile(files);
    }
    e.target.value = "";
  };

  const uploadFile = async (files: FileList) => {
    const token = await user?.getIdToken();

    try {
      const uploadPromise = async () => {
        const uploads = Array.from(files).map((file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folderId", currentFolder ?? "");

          return fetch("/api/upload", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }).then((res) => {
            if (!res.ok) throw new Error("Upload failed!");
            return res.json();
          });
        });

        const results = await Promise.all(uploads);
        const hasError = results.some((res) => res.error);
        if (hasError) throw new Error("One or more uploads failed");
      };

      toast.promise(uploadPromise(), {
        loading: "Uploading file...",
        success: "File upload successfully",
        error: "upload failed",
        richColors: true,
        closeButton: true,
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast.error("An Error occured, Contact the support", {
        richColors: true,
        closeButton: true,
        position: "top-center",
      });
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
      const file = e.dataTransfer?.files;
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
            multiple
            onChange={handleFileChange}
          />

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {data.map((item, i) => (
              <DropdownMenuItem
                className="h-12"
                key={item.title}
                onClick={() => handleOnclick(i)}
              >
                <item.icon />
                {i === 1 ? (
                  <Label htmlFor="file-upload"> {item.title}</Label>
                ) : (
                  item.title
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      {isDragging && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center text-lg font-semibold border-2 border-dashed border-gray-300">
            Drop file to upload
          </div>
        </div>
      )}
    </SidebarMenu>
  );
};
