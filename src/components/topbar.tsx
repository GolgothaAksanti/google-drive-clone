import React from "react";

export const Topbar = () => {
  return (
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
  );
};
