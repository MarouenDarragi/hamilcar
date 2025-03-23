

'use client';

import React, { useState, useEffect } from 'react';
import { ExpertiseType } from '@/type/ExpertiseType';
import ExpertiseForm from '@/components/Admin/ExpertiseForm';
import ExpertiseCard from '@/components/Admin/ExpertiseCard';
import Sidebar from "@/components/Admin/Sidebar";
import { List, X } from "@phosphor-icons/react";
import { toast, ToastContainer } from 'react-toastify';
import ConfirmationDialog from '@/components/Admin/ConfirmationDialog';
import 'react-toastify/dist/ReactToastify.css';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(DATA_URL);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    }
  };

  const handleCreate = async (item: ExpertiseType) => {
    try {
      const response = await fetch(DATA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        await fetchData();
        handleCancelEdit();
        toast.success('Expertise created successfully!');
      }
    } catch (error) {
      console.error('Error creating item:', error);
      toast.error('Failed to create expertise');
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
        await fetchData();
        handleCancelEdit();
        toast.success('Expertise updated successfully!');
      }
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Failed to update expertise');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${DATA_URL}?id=${id}`, { method: 'DELETE' });
      if (response.ok) {
        await fetchData();
        toast.success('Expertise deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete expertise');
    } finally {
      setIsDialogOpen(false);
      setDeleteItemId(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setDeleteItemId(id);
    setIsDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDialogOpen(false);
    setDeleteItemId(null);
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

          <ExpertiseForm
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
            initialValues={selectedItem || undefined}
            isEditing={isEditing}
          />

          <ExpertiseCard 
            data={data} 
            onEdit={handleEdit} 
            onDelete={openDeleteDialog} // Modification ici
          />

          <ConfirmationDialog
            isOpen={isDialogOpen}
            onClose={closeDeleteDialog}
            onConfirm={() => deleteItemId && handleDelete(deleteItemId)}
            title="Delete Expertise"
            message="Are you sure you want to delete this expertise?"
          />

          <ToastContainer />
        </div>
      </main>
    </div>
  );
}