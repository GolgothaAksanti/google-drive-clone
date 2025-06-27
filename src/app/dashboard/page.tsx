import { FolderViewer } from "@/components/folder-viewer";
import { StorageUsage } from "@/components/storage-usage";

const Page = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <StorageUsage />
      <FolderViewer />
    </div>
  );
};

export default Page;
