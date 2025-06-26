const Home = () => {
  const files = [
    {
      name: "Project Proposal.pdf",
      type: "PDF",
      modified: "June 20, 2025",
      owner: "John Doe",
    },
    {
      name: "Budget.xlsx",
      type: "Excel",
      modified: "June 18, 2025",
      owner: "Jane Smith",
    },
    {
      name: "Design Mockup.fig",
      type: "Figma",
      modified: "June 15, 2025",
      owner: "You",
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6 py-4 h-auto sm:h-16 border-b bg-white shadow-sm">
        <input
          type="text"
          placeholder="Search in Drive"
          className="w-full sm:w-1/2 border px-3 py-1.5 rounded-md text-sm"
        />
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">John Doe</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </header>

      <main className="p-4 sm:p-6 overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border shadow-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-2 text-sm font-semibold">
                  Name
                </th>
                <th className="text-left px-4 py-2 text-sm font-semibold">
                  Type
                </th>
                <th className="text-left px-4 py-2 text-sm font-semibold">
                  Modified
                </th>
                <th className="text-left px-4 py-2 text-sm font-semibold">
                  Owner
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.name} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm whitespace-nowrap">
                    {file.name}
                  </td>
                  <td className="px-4 py-2 text-sm whitespace-nowrap">
                    {file.type}
                  </td>
                  <td className="px-4 py-2 text-sm whitespace-nowrap">
                    {file.modified}
                  </td>
                  <td className="px-4 py-2 text-sm whitespace-nowrap">
                    {file.owner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Home;
