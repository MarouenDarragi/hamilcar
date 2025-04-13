'use client';

import InfoForm from '@/components/info/InfoForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          General Information Management
        </h1>
        <InfoForm />
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
