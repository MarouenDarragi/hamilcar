// import React from 'react';
// import Sidebar from "@/components/Admin/Sidebar";

// const AdminDashboard = () => {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-8 ml-64">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
//           <p className="text-gray-700">Welcome to the admin panel!</p>
//           {/* Add more dashboard content here */}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

'use client';

import { useState } from 'react';
import Sidebar from "@/components/Admin/Sidebar";
import { List } from "@phosphor-icons/react";

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-20 p-2 rounded-md bg-blue text-white hover:bg-blue-700 transition-colors"
      >
        <List size={24} />
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
          <p className="text-gray-700">Welcome to the admin panel!</p>
        </div>
      </div>
    </div>
  );
}