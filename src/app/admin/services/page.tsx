// // pages/AdminServicePage.tsx
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import ServiceForm from '@/components/Admin/ServiceForm';
// import ServiceCard from '@/components/Admin/ServiceCard';
// import Sidebar from "@/components/Admin/Sidebar";
// import { List, X } from "@phosphor-icons/react";
// import { v4 as uuidv4 } from 'uuid';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import ConfirmationDialog from '@/components/Admin/ConfirmationDialog';

// const PAGE_TITLE = 'Services';
// const API_URL = '/api/admin/services'; // URL de l'API

// interface ServiceType {
//     id?: string;
//     icon: string;
//     category: string;
//     title: string;
//     shortDesc: string;
//     desc: string;
//     serviceItems?: { itemTitle: string; itemDesc: string; }[];
//     serviceQuestions?: { qsSubject: string; qsResponse: string; }[];
//     image?: string;
// }

// export default function AdminServicePage() {
//     const [data, setData] = useState<ServiceType[]>([]);
//     const [isEditing, setIsEditing] = useState(false);
//     const [selectedItem, setSelectedItem] = useState<ServiceType | null>(null);
//     const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);

//     // Charger les données depuis l'API
//     const fetchData = useCallback(async () => {
//         try {
//             const response = await fetch(API_URL);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch data');
//             }
//             const result = await response.json();
//             setData(result);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     }, []);

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     // Créer un nouvel élément via l'API
//     const handleCreate = useCallback(async (item: ServiceType) => {
//         try {
//             const response = await fetch(API_URL, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(item),
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to create service');
//             }
//             fetchData(); // Recharger les données après la création
//         } catch (error) {
//             console.error("Error creating service:", error);
//         }
//     }, [fetchData]);

//     // Mettre à jour un élément existant via l'API
//     const handleUpdate = useCallback(async (item: ServiceType) => {
//         try {
//             const response = await fetch(API_URL, {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(item),
//             });
//             if (!response.ok) {
//                 throw new Error('Failed to update service');
//             }
//             fetchData(); // Recharger les données après la mise à jour
//         } catch (error) {
//             console.error("Error updating service:", error);
//         }
//     }, [fetchData]);

//     // Supprimer un élément via l'API
//     const handleDelete = useCallback(async (id: string) => {
//         try {
//             const response = await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
//             if (!response.ok) {
//                 throw new Error('Failed to delete service');
//             }
//             fetchData(); // Recharger les données après la suppression
//             toast.success('Service deleted successfully!'); // Afficher un toast de succès
//         } catch (error) {
//             console.error("Error deleting service:", error);
//             toast.error('Failed to delete service'); // Afficher un toast d'erreur
//         } finally {
//             setIsDialogOpen(false); // Fermer la boîte de dialogue
//             setDeleteItemId(null); // Réinitialiser l'ID de l'élément à supprimer
//         }
//     }, [fetchData]);

//     // Gérer l'édition d'un élément
//     const handleEdit = (item: ServiceType) => {
//         setIsEditing(true);
//         setSelectedItem(item);
//     };

//     // Annuler l'édition
//     const handleCancelEdit = () => {
//         setIsEditing(false);
//         setSelectedItem(null);
//     };

//     // Soumettre le formulaire (création ou mise à jour)
//     const handleSubmit = useCallback(async (item: ServiceType) => {
//         if (isEditing && selectedItem) {
//             await handleUpdate(item);
//         } else {
//             await handleCreate(item);
//         }
//         setIsEditing(false);
//         setSelectedItem(null);
//     }, [handleUpdate, handleCreate, isEditing, selectedItem]);

//     // Ouvrir la boîte de dialogue de confirmation
//     const openDeleteDialog = (id: string) => {
//         setDeleteItemId(id);
//         setIsDialogOpen(true);
//     };

//     // Fermer la boîte de dialogue de confirmation
//     const closeDeleteDialog = () => {
//         setIsDialogOpen(false);
//         setDeleteItemId(null);
//     };

//     return (
//         <div className="flex flex-col md:flex-row h-screen bg-gray-100">
//             {/* <div className="fixed top-0 left-0 h-full w-64 bg-blue shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:block">
//                 <Sidebar />
//             </div> */}

//             <main className="flex-1 p-8 md:ml-64">
//                 <div className="container mx-auto p-4">
//                     <h1 className="text-2xl font-bold mb-4">{PAGE_TITLE}</h1>

//                     <ServiceForm
//                         onSubmit={handleSubmit}
//                         onCancel={handleCancelEdit}
//                         initialValues={selectedItem || undefined}
//                         isEditing={isEditing}
//                     />

//                     <ServiceCard data={data} onEdit={handleEdit} onDelete={openDeleteDialog} />
//                 </div>
//             </main>

//             {/* Boîte de dialogue de confirmation */}
//             <ConfirmationDialog
//                 isOpen={isDialogOpen}
//                 onClose={closeDeleteDialog}
//                 onConfirm={() => deleteItemId && handleDelete(deleteItemId)}
//                 title="Delete Service"
//                 message="Are you sure you want to delete this service?"
//             />

//             {/* ToastContainer pour afficher les notifications */}
//             <ToastContainer />
//         </div>
//     );
// }

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ServiceForm from '@/components/Admin/ServiceForm';
import ServiceCard from '@/components/Admin/ServiceCard';
import Sidebar from "@/components/Admin/Sidebar";
import { List } from "@phosphor-icons/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationDialog from '@/components/Admin/ConfirmationDialog';

const PAGE_TITLE = 'Services';
const API_URL = '/api/admin/services';

interface ServiceType {
    id?: string;
    icon: string;
    category: string;
    title: string;
    shortDesc: string;
    desc: string;
    serviceItems?: { itemTitle: string; itemDesc: string; }[];
    serviceQuestions?: { qsSubject: string; qsResponse: string; }[];
    image?: string;
}

export default function AdminServicePage() {
    const [data, setData] = useState<ServiceType[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ServiceType | null>(null);
    const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCreate = useCallback(async (item: ServiceType) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            if (!response.ok) {
                throw new Error('Failed to create service');
            }
            fetchData();
            toast.success('Service created successfully!');
        } catch (error) {
            console.error("Error creating service:", error);
            toast.error('Failed to create service');
        }
    }, [fetchData]);

    const handleUpdate = useCallback(async (item: ServiceType) => {
        try {
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
            if (!response.ok) {
                throw new Error('Failed to update service');
            }
            fetchData();
            toast.success('Service updated successfully!');
        } catch (error) {
            console.error("Error updating service:", error);
            toast.error('Failed to update service');
        }
    }, [fetchData]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            const response = await fetch(`${API_URL}?id=${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete service');
            }
            fetchData();
            toast.success('Service deleted successfully!');
        } catch (error) {
            console.error("Error deleting service:", error);
            toast.error('Failed to delete service');
        } finally {
            setIsDialogOpen(false);
            setDeleteItemId(null);
        }
    }, [fetchData]);

    const handleEdit = (item: ServiceType) => {
        setIsEditing(true);
        setSelectedItem(item);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setSelectedItem(null);
    };

    const handleSubmit = useCallback(async (item: ServiceType) => {
        if (isEditing && selectedItem) {
            await handleUpdate(item);
        } else {
            await handleCreate(item);
        }
        setIsEditing(false);
        setSelectedItem(null);
    }, [handleUpdate, handleCreate, isEditing, selectedItem]);

    const openDeleteDialog = (id: string) => {
        setDeleteItemId(id);
        setIsDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setIsDialogOpen(false);
        setDeleteItemId(null);
    };

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
                <div className="container mx-auto">
                    <h1 className="text-3xl font-bold text-center mb-8">{PAGE_TITLE}</h1>

                    <ServiceForm
                        onSubmit={handleSubmit}
                        onCancel={handleCancelEdit}
                        initialValues={selectedItem || undefined}
                        isEditing={isEditing}
                    />

                    <ServiceCard 
                        data={data} 
                        onEdit={handleEdit} 
                        onDelete={openDeleteDialog}
                    />

                    <ConfirmationDialog
                        isOpen={isDialogOpen}
                        onClose={closeDeleteDialog}
                        onConfirm={() => deleteItemId && handleDelete(deleteItemId)}
                        title="Delete Service"
                        message="Are you sure you want to delete this service?"
                    />
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}