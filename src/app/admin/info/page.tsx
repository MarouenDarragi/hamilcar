
'use client';

import { useState } from 'react';
import InfoForm from '@/components/info/InfoForm';
import Sidebar from '@/components/Admin/Sidebar';
import { ToastContainer } from 'react-toastify';
import { List } from "@phosphor-icons/react";
import 'react-toastify/dist/ReactToastify.css';

export default function InfoPage() {
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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            General Information Management
          </h1>
          <InfoForm />
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}