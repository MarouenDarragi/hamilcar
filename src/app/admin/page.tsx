import React from 'react';
import Sidebar from "@/components/Admin/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
          <p className="text-gray-700">Welcome to the admin panel!</p>
          {/* Add more dashboard content here */}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;