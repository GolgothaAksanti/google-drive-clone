"use client";

import { useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Asterisk, Loader } from "lucide-react";

import { CreateFolderModalStore } from "@/stores/modal-stores";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFolder } from "@/services/create-folder";
import { CurrentFolderStore } from "@/stores/folder-stores";

export const CreateNewFolderModal = () => {
  const [open, setOpen] = useAtom(CreateFolderModalStore);
  const currentFolder = useAtomValue(CurrentFolderStore);
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;

    try {
      setLoading(true);
      await createFolder(folderName, currentFolder);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.dir(error);
    }
    setFolderName("");
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Create a new folder for your files. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1" className="gap-x-0 relative">
                Name
                <Asterisk className="size-3 absolute -top-1 left-10" />
              </Label>
              <Input
                id="name-1"
                name="name"
                className="focus-visible:ring-0"
                placeholder="New Folder"
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleCreateFolder}>
              {loading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
