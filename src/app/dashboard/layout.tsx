import { Toaster } from "sonner";

import { AppSidebar } from "@/components/app-sidebar";
import { ContextProvider } from "@/components/context-provider";
import { CreateNewFolderModal } from "@/components/modal/create-folder-modal";
import ProtectedRoute from "@/components/protect-route";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = async ({ children }: Props) => {
  return (
    <ProtectedRoute>
      <Toaster />
      <div className="[--header-height:calc(--spacing(14))]">
        <SidebarProvider className="flex flex-col">
          <CreateNewFolderModal />
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              <ContextProvider>{children}</ContextProvider>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
