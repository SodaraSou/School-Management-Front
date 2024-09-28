"use client";

import { useState } from "react";

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <aside
      className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } relative translate-x-0 transition duration-200 ease-in-out z-20 xl:w-72`}
    >
      Sidebar
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </aside>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
        {children}
      </div>
    </div>
  );
}
