'use client';

import React, { useState, useEffect } from 'react';
import { ExpertiseType } from '@/type/ExpertiseType';
import AdminForm from '@/components/Admin/AdminForm';
import AdminList from '@/components/Admin/AdminList';
import Sidebar from "@/components/Admin/Sidebar";
import { List, X } from "@phosphor-icons/react";

const DATA_URL = '/api/admin/expertises';
const PAGE_TITLE = 'Expertises';

const MobileMenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="md:hidden absolute top-4 left-4 bg-blue-500 text-black p-2 rounded-md z-10"
  >
    {isOpen ? <X size={24} /> : <List size={24} />}
  </button>
);

export default function AdminExpertisesPage() {
  const [data, setData] = useState<ExpertiseType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ExpertiseType | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(DATA_URL);
    const result = await response.json();
    setData(result);
  };

  const handleCreate = async (item: ExpertiseType) => {
    try {
      const response = await fetch(DATA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        fetchData(); // Refresh data after successful creation
        handleCancelEdit();
      } else {
        console.error('Failed to create item');
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleUpdate = async (item: ExpertiseType) => {
    try {
      const response = await fetch(DATA_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        fetchData(); // Refresh data after successful update
        handleCancelEdit();
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`${DATA_URL}?id=${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchData(); // Refresh data after successful deletion
        } else {
          console.error('Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleEdit = (item: ExpertiseType) => {
    setIsEditing(true);
    setSelectedItem(item);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedItem(null);
  };

  const handleSubmit = async (item: ExpertiseType) => {
    if (isEditing && selectedItem) {
      await handleUpdate(item);
    } else {
      await handleCreate(item);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <MobileMenuButton isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block`}
      >
        <Sidebar />
      </div>

      <main className="flex-1 p-8 md:ml-64">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">{PAGE_TITLE}</h1>

          <AdminForm
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
            initialValues={selectedItem || undefined}
            isEditing={isEditing}
          />

          <AdminList data={data} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </main>
    </div>
  );
}