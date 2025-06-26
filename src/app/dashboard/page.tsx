import { TableDemo } from "@/components/data-table";

export const iframeHeight = "800px";

export const description = "A sidebar with a header and a search form.";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <TableDemo />
    </div>
  );
}
