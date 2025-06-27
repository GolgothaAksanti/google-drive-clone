// import { TableDemo } from "@/components/data-table";
import { FolderViewer } from "@/components/folder-viewer";
// import { FilePreview } from "@/components/file-preview";
import { StorageUsage } from "@/components/storage-usage";

export const iframeHeight = "800px";

export const description = "A sidebar with a header and a search form.";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* <TableDemo /> */}
      <StorageUsage />
      <FolderViewer />
      {/* <FilePreview/> */}
    </div>
  );
}
