"use client";

import { useRef, useState } from "react";
import { Check, FileUp, FolderPlus, FolderUp, Plus } from "lucide-react";

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
// import { createFolder } from "@/services/create-folder";
import { useAtomValue, useSetAtom } from "jotai";
import { CreateFolderModalStore } from "@/stores/modal-stores";
import { CurrentFolderStore } from "@/stores/folder-stores";
import { auth } from "@/lib/firebase";

const data = [
  { title: "New folder", icon: FolderPlus },
  { title: "File upload", icon: FileUp },
  { title: "Folder upload", icon: FolderUp },
];

export const NewButton = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedVersion, setSelectedVersion] = useState(data[0].title);
  const setOpenCreateFolder = useSetAtom(CreateFolderModalStore);
  const currentFolder = useAtomValue(CurrentFolderStore);
  const user = auth.currentUser;

  const handleOnclick = (index: number) => {
    handleOpenCreateFolder(index);
    handleOpenUploadFile(index);
  };

  const handleOpenCreateFolder = (index: number) => {
    if (index !== 0) return;
    setOpenCreateFolder(true);
  };

  const handleOpenUploadFile = (index: number) => {
    if (index !== 1) return;
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (index !== 1) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const token = await user?.getIdToken();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folderId", currentFolder || "");

    await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  };

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
                {item.title}
                {item.title === selectedVersion && (
                  <Check className="ml-auto" />
                )}
              </DropdownMenuItem>
            ))}
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={handleFileUpload}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
