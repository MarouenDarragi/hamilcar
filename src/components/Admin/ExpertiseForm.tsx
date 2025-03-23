// AdminForm.tsx
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ExpertiseType } from '@/type/ExpertiseType';
import * as Icon from "@phosphor-icons/react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const expertiseSchema = z.object({
    id: z.string().optional(),
    icon: z.string().min(2, { message: "Icon class must be at least 2 characters." }),
    category: z.string().min(3, { message: "Category must be at least 3 characters." }),
    title: z.string().min(3, { message: "Title must be at least 3 characters." }),
    shortDesc: z.string().min(5, { message: "Short description must be at least 5 characters." }),
    desc: z.string().min(10, { message: "Description must be at least 10 characters." }),

});

type ExpertiseFormValues = z.infer<typeof expertiseSchema>;

interface Props {
    onSubmit: (data: ExpertiseFormValues) => Promise<void>;
    onCancel: () => void;
    initialValues?: ExpertiseType;
    isEditing: boolean;
}

const ExpertiseForm: React.FC<Props> = ({ onSubmit, onCancel, initialValues, isEditing }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ExpertiseFormValues>({
        resolver: zodResolver(expertiseSchema),
        defaultValues: initialValues,
    });

    const onSubmitHandler = async (data: ExpertiseFormValues) => {
        await onSubmit(data);
        toast.success('Expertise item added successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        reset(); // Clear the form fields after submission
    };

    React.useEffect(() => {
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)} className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
                {/* Icon */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="icon">Icon (Phosphor Icon Name):</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="icon"
                        type="text"
                        placeholder="e.g., AirplaneTilt"
                        {...register("icon")}
                    />
                    {errors.icon && <p className="text-red-500 text-xs italic">{errors.icon.message}</p>}
                    <p className="text-gray-500 text-xs italic">
                        Enter the Phosphor Icon name (e.g., AirplaneTilt). Make sure it matches the one on the{" "}
                        <a
                            href="https://phosphoricons.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 underline"
                        >
                            Phosphor Icons website
                        </a>
                        .
                    </p>
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        type="text"
                        {...register("category")}
                    />
                    {errors.category && <p className="text-red-500 text-xs italic">{errors.category.message}</p>}
                </div>

                {/* Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        {...register("title")}
                    />
                    {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
                </div>
                {/* Short Description */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shortDesc">Short Description:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="shortDesc"
                        type="text"
                        {...register("shortDesc")}
                    />
                    {errors.shortDesc && <p className="text-red-500 text-xs italic">{errors.shortDesc.message}</p>}
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        {...register("desc")}
                    />
                    {errors.desc && <p className="text-red-500 text-xs italic">{errors.desc.message}</p>}
                </div>


                {/* Buttons */}
                <div className="flex items-center justify-center">
                    <button
                       className="bg-blue hover:bg-white border-2 text-white hover:text-blue font-bold py-3 px-12 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {isEditing ? 'Update' : 'Add'}
                    </button>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default ExpertiseForm;