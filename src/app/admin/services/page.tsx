'use client';

import React, { useState, useEffect } from 'react';
import { ServiceType } from '@/type/ServiceType';
import AdminForm from '@/components/Admin/AdminForm';
import AdminList from '@/components/Admin/AdminList';

const DATA_URL = '/api/admin/services';
const PAGE_TITLE = 'Services';

export default function AdminServicesPage() {
  const [data, setData] = useState<ServiceType[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ServiceType | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(DATA_URL);
    const result = await response.json();
    setData(result);
  };

  const handleCreate = async (item: ServiceType) => {
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

  const handleUpdate = async (item: ServiceType) => {
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

  const handleEdit = (item: ServiceType) => {
    setIsEditing(true);
    setSelectedItem(item);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedItem(null);
  };


  const handleSubmit = async (item: ServiceType) => {
    if (isEditing && selectedItem) {
      await handleUpdate(item);
    } else {
      await handleCreate(item);
    }
  };

  return (
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
  );
}