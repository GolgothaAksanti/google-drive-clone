"use client";

import { SidebarIcon } from "lucide-react";

import { SearchForm } from "@/components/search-form";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { ProfileBtn } from "./profile-btn";
import { GoogleDriveIcon } from "./widgets/google-drive-icon";

export const SiteHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <GoogleDriveIcon />
              <span className="text-xl font-bold">Clone</span>
            </div>
            <SearchForm className="w-full sm:ml-auto sm:w-auto" />
          </div>

          <div className="">
            <ProfileBtn />
          </div>
        </div>
      </div>
    </header>
  );
};
