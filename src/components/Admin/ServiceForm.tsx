
// 'use client';

// import React, { useCallback, useState } from 'react';
// import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import * as Icon from "@phosphor-icons/react";
// import { v4 as uuidv4 } from 'uuid';

// // Définir les schémas de validation avec Zod
// const serviceItemSchema = z.object({
//     itemTitle: z.string().min(3),
//     itemDesc: z.string().min(10),
// });

// const serviceQuestionSchema = z.object({
//     qsSubject: z.string().min(3),
//     qsResponse: z.string().min(10),
// });

// const serviceSchema = z.object({
//     id: z.string().optional(),
//     icon: z.string().min(2, { message: "Icon class must be at least 2 characters." }),
//     category: z.string().min(3, { message: "Category must be at least 3 characters." }),
//     title: z.string().min(3, { message: "Title must be at least 3 characters." }),
//     shortDesc: z.string().min(5, { message: "Short description must be at least 5 characters." }),
//     desc: z.string().min(10, { message: "Description must be at least 10 characters." }),
//     serviceItems: z.array(serviceItemSchema).optional(),
//     serviceQuestions: z.array(serviceQuestionSchema).optional(),
//     image: z.string().optional(),
// });

// type ServiceFormValues = z.infer<typeof serviceSchema>;

// interface Props {
//     onSubmit: (data: ServiceFormValues) => Promise<void>;
//     onCancel: () => void;
//     initialValues?: ServiceFormValues;
//     isEditing: boolean;
// }

// const ServiceForm: React.FC<Props> = ({ onSubmit, onCancel, initialValues, isEditing }) => {
//     console.log("Initial Values in ServiceForm:", initialValues); // Afficher les valeurs initiales

//     const { register, handleSubmit, control, formState: { errors }, reset } = useForm<ServiceFormValues>({
//         resolver: zodResolver(serviceSchema),
//         defaultValues: initialValues, // Pré-remplir le formulaire avec les valeurs initiales
//     });

//     // Réinitialiser le formulaire lorsque initialValues change
//     React.useEffect(() => {
//         console.log("Resetting form with:", initialValues); // Afficher les valeurs utilisées pour réinitialiser
//         if (initialValues) {
//             reset(initialValues);
//         }
//     }, [initialValues, reset]);

//     const { fields: serviceItemsFields, append: serviceItemsAppend, remove: serviceItemsRemove } = useFieldArray({
//         control,
//         name: "serviceItems"
//     });

//     const { fields: serviceQuestionsFields, append: serviceQuestionsAppend, remove: serviceQuestionsRemove } = useFieldArray({
//         control,
//         name: "serviceQuestions"
//     });

//     const [selectedImage, setSelectedImage] = useState<File | null>(null);

//     const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             setSelectedImage(event.target.files[0]);
//         }
//     };
//     const onSubmitHandler: SubmitHandler<ServiceFormValues> = useCallback(async (data) => {
//         try {
//             let imageUrl = '';
//             if (selectedImage) {
//                 imageUrl = await new Promise((resolve, reject) => {
//                     const reader = new FileReader();
//                     reader.onload = () => resolve(reader.result as string);
//                     reader.onerror = (error) => reject(error);
//                     reader.readAsDataURL(selectedImage);
//                 });
//             }
    
//             const serviceData = {
//                 ...data,
//                 id: initialValues?.id || uuidv4(),
//                 image: imageUrl,
//             };
    
//             await onSubmit(serviceData);
    
//             // 1. Afficher la toast AVANT la réinitialisation
//             const toastId = toast.success(isEditing ? 'Service updated!' : 'Service added!', {
//                 position: "top-right",
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//             });
    
//             // 2. Réinitialiser APRÈS un léger délai
//             setTimeout(() => {
//                 reset();
//                 setSelectedImage(null);
                
//                 // 3. Fermer manuellement la toast si nécessaire
//                 toast.dismiss(toastId);
//             }, 2000); // Délai minimal pour laisser le temps à la toast de s'afficher
    
//         } catch (error) {
//             console.error("Error:", error);
//             toast.error("Erreur lors de la soumission");
//         }
//     }, [selectedImage, onSubmit, reset, initialValues, isEditing]);


//     return (
//         <>
//             <form onSubmit={handleSubmit(onSubmitHandler)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//                 {/* Icon */}
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="icon">Icon (Phosphor Icon Name):</label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="icon"
//                         type="text"
//                         placeholder="e.g., AirplaneTilt"
//                         {...register("icon")}
//                     />
//                     {errors.icon && <p className="text-red-500 text-xs italic">{errors.icon.message}</p>}
//                     <p className="text-gray-500 text-xs italic">
//                         Enter the Phosphor Icon name (e.g., AirplaneTilt). Make sure it matches the one on the{" "}
//                         <a
//                             href="https://phosphoricons.com/"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-500 hover:text-blue-700 underline"
//                         >
//                             Phosphor Icons website
//                         </a>
//                         .
//                     </p>
//                 </div>

//                 {/* Category */}
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category:</label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="category"
//                         type="text"
//                         {...register("category")}
//                     />
//                     {errors.category && <p className="text-red-500 text-xs italic">{errors.category.message}</p>}
//                 </div>

//                 {/* Title */}
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title:</label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="title"
//                         type="text"
//                         {...register("title")}
//                     />
//                     {errors.title && <p className="text-red-500 text-xs italic">{errors.title.message}</p>}
//                 </div>

//                 {/* Short Description */}
//                 <div className="mb-6">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shortDesc">Short Description:</label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="shortDesc"
//                         type="text"
//                         {...register("shortDesc")}
//                     />
//                     {errors.shortDesc && <p className="text-red-500 text-xs italic">{errors.shortDesc.message}</p>}
//                 </div>

//                 {/* Description */}
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
//                     <textarea
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="description"
//                         {...register("desc")}
//                     />
//                     {errors.desc && <p className="text-red-500 text-xs italic">{errors.desc.message}</p>}
//                 </div>

//                 {/* Image Upload */}
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image:</label>
//                     <input
//                         type="file"
//                         id="image"
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         onChange={handleImageChange}
//                         accept="image/*"
//                     />
//                     {selectedImage && (
//                         <p className="text-gray-500 text-xs italic mt-1">Selected Image: {selectedImage.name}</p>
//                     )}
//                 </div>

//                 {/* Service Items */}
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Service Items:</label>
//                     {serviceItemsFields.map((item, index) => (
//                         <div key={item.id} className="mb-2 p-4 border rounded">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`serviceItems.${index}.itemTitle`}>Item Title:</label>
//                             <input
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 {...register(`serviceItems.${index}.itemTitle` as const)}
//                             />
//                             {errors.serviceItems?.[index]?.itemTitle && <p className="text-red-500 text-xs italic">{(errors.serviceItems[index].itemTitle as any)?.message}</p>}

//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`serviceItems.${index}.itemDesc`}>Item Description:</label>
//                             <textarea
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 {...register(`serviceItems.${index}.itemDesc` as const)}
//                             />
//                             {errors.serviceItems?.[index]?.itemDesc && <p className="text-red-500 text-xs italic">{(errors.serviceItems[index].itemDesc as any)?.message}</p>}

//                             <div className="flex justify-between">
//                                 <button
//                                     type="button"
//                                     onClick={() => serviceItemsRemove(index)}
//                                     className="bg-red-500 hover:bg-red-700 text-black font-bold py-1 px-2 rounded mt-2"
//                                 >
//                                     -
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => serviceItemsAppend({ itemTitle: "", itemDesc: "" })}
//                                     className="bg-green-500 hover:bg-green-700 text-black font-bold py-1 px-2 rounded mt-2"
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                     <button
//                         type="button"
//                         onClick={() => serviceItemsAppend({ itemTitle: "", itemDesc: "" })}
//                         className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
//                     >
//                         Add Item
//                     </button>
//                 </div>

//                 {/* Service Questions */}
//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Service Questions:</label>
//                     {serviceQuestionsFields.map((item, index) => (
//                         <div key={item.id} className="mb-2 p-4 border rounded">
//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`serviceQuestions.${index}.qsSubject`}>Question:</label>
//                             <input
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 {...register(`serviceQuestions.${index}.qsSubject` as const)}
//                             />
//                             {errors.serviceQuestions?.[index]?.qsSubject && <p className="text-red-500 text-xs italic">{(errors.serviceQuestions[index].qsSubject as any)?.message}</p>}

//                             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`serviceQuestions.${index}.qsResponse`}>Response:</label>
//                             <textarea
//                                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                                 {...register(`serviceQuestions.${index}.qsResponse` as const)}
//                             />
//                             {errors.serviceQuestions?.[index]?.qsResponse && <p className="text-red-500 text-xs italic">{(errors.serviceQuestions[index].qsResponse as any)?.message}</p>}

//                             <div className="flex justify-between">
//                                 <button
//                                     type="button"
//                                     onClick={() => serviceQuestionsRemove(index)}
//                                     className="bg-red-500 hover:bg-red-700 text-black font-bold py-1 px-2 rounded mt-2"
//                                 >
//                                     -
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={() => serviceQuestionsAppend({ qsSubject: "", qsResponse: "" })}
//                                     className="bg-green-500 hover:bg-green-700 text-black font-bold py-1 px-2 rounded mt-2"
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                     <button
//                         type="button"
//                         onClick={() => serviceQuestionsAppend({ qsSubject: "", qsResponse: "" })}
//                         className="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
//                     >
//                         Add Question
//                     </button>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex items-center justify-center">
//                     <button
//                         className="bg-blue hover:bg-dark-blue text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
//                         type="submit"
//                     >
//                         {isEditing ? 'Update' : 'Add'}
//                     </button>
//                 </div>
//             </form>
//             <ToastContainer />
//         </>
//     );
// };

// export default ServiceForm;


'use client';

import React, { useCallback, useState } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Icon from "@phosphor-icons/react";
import { v4 as uuidv4 } from 'uuid';

// Définir les schémas de validation avec Zod
const serviceItemSchema = z.object({
    itemTitle: z.string().min(3),
    itemDesc: z.string().min(10),
});

const serviceQuestionSchema = z.object({
    qsSubject: z.string().min(3),
    qsResponse: z.string().min(10),
});

const serviceSchema = z.object({
    id: z.string().optional(),
    icon: z.string().min(2, { message: "Icon class must be at least 2 characters." }),
    category: z.string().min(3, { message: "Category must be at least 3 characters." }),
    title: z.string().min(3, { message: "Title must be at least 3 characters." }),
    shortDesc: z.string().min(5, { message: "Short description must be at least 5 characters." }),
    desc: z.string().min(10, { message: "Description must be at least 10 characters." }),
    serviceItems: z.array(serviceItemSchema).optional(),
    serviceQuestions: z.array(serviceQuestionSchema).optional(),
    image: z.string().optional(),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface Props {
    onSubmit: (data: ServiceFormValues) => Promise<void>;
    onCancel: () => void;
    initialValues?: ServiceFormValues;
    isEditing: boolean;
}

const ServiceForm: React.FC<Props> = ({ onSubmit, onCancel, initialValues, isEditing }) => {
    console.log("Initial Values in ServiceForm:", initialValues); // Afficher les valeurs initiales

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceSchema),
        defaultValues: initialValues, // Pré-remplir le formulaire avec les valeurs initiales
    });

    // Réinitialiser le formulaire lorsque initialValues change
    React.useEffect(() => {
        console.log("Resetting form with:", initialValues); // Afficher les valeurs utilisées pour réinitialiser
        if (initialValues) {
            reset(initialValues);
        }
    }, [initialValues, reset]);

    const { fields: serviceItemsFields, append: serviceItemsAppend, remove: serviceItemsRemove } = useFieldArray({
        control,
        name: "serviceItems"
    });

    const { fields: serviceQuestionsFields, append: serviceQuestionsAppend, remove: serviceQuestionsRemove } = useFieldArray({
        control,
        name: "serviceQuestions"
    });

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };
  // ServiceForm.tsx
const onSubmitHandler: SubmitHandler<ServiceFormValues> = useCallback(async (data) => {
    try {
        let imageBase64 = '';
        
        // Conversion en base64 uniquement si nouvelle image
        if (selectedImage ) {
            imageBase64 = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(selectedImage);
            });
        }

        const serviceData = {
            ...data,
            id: initialValues?.id || uuidv4(),
            image: imageBase64 || data.image // Envoie le base64 ou l'URL existante
        };

        await onSubmit(serviceData);
    
            // 1. Afficher la toast AVANT la réinitialisation
            const toastId = toast.success(isEditing ? 'Service updated!' : 'Service added!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
    
            // 2. Réinitialiser APRÈS un léger délai
            setTimeout(() => {
                reset();
                setSelectedImage(null);
                
                // 3. Fermer manuellement la toast si nécessaire
                toast.dismiss(toastId);
            }, 2000); // Délai minimal pour laisser le temps à la toast de s'afficher
    
        } catch (error) {
            console.error("Error:", error);
            toast.error("Erreur lors de la soumission");
        }
    }, [selectedImage, onSubmit, reset, initialValues, isEditing]);


    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                    {selectedImage && (
                        <p className="text-gray-500 text-xs italic mt-1">Selected Image: {selectedImage.name}</p>
                    )}
                </div>

                {/* Service Items */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Service Items:</label>
                    {serviceItemsFields.map((item, index) => (
                        <div key={item.id} className="mb-2 p-4 border rounded">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`serviceItems.${index}.itemTitle`}>Item Title:</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register(`serviceItems.${index}.itemTitle` as const)}
                            />
                            {errors.serviceItems?.[index]?.itemTitle && <p className="text-red-500 text-xs italic">{(errors.serviceItems[index].itemTitle as any)?.message}</p>}

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`serviceItems.${index}.itemDesc`}>Item Description:</label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register(`serviceItems.${index}.itemDesc` as const)}
                            />
                            {errors.serviceItems?.[index]?.itemDesc && <p className="text-red-500 text-xs italic">{(errors.serviceItems[index].itemDesc as any)?.message}</p>}
                            <div className="flex justify-center gap-6 mt-2">
    <button
        type="button"
        onClick={() => serviceItemsRemove(index)}
        className="bg-white  hover:bg-blue border-2 border-blue-500 text-blue hover:text-white font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-100"
    >
        -
    </button>
    <button
        type="button"
        onClick={() => serviceItemsAppend({ itemTitle: "", itemDesc: "" })}
        className="bg-white  hover:bg-blue border-2 border-blue-500 text-blue hover:text-white font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-100"
    >
        +
    </button>
</div>


                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => serviceItemsAppend({ itemTitle: "", itemDesc: "" })}
                        className="bg-white hover:bg-blue border-2 border-blue  text-blue hover:text-white font-bold py-2 px-4 rounded-full"
                    >
                        Add Item
                    </button>
                </div>

                {/* Service Questions */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Service Questions:</label>
                    {serviceQuestionsFields.map((item, index) => (
                        <div key={item.id} className="mb-2 p-4 border rounded">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`serviceQuestions.${index}.qsSubject`}>Question:</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register(`serviceQuestions.${index}.qsSubject` as const)}
                            />
                            {errors.serviceQuestions?.[index]?.qsSubject && <p className="text-red-500 text-xs italic">{(errors.serviceQuestions[index].qsSubject as any)?.message}</p>}

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`serviceQuestions.${index}.qsResponse`}>Response:</label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register(`serviceQuestions.${index}.qsResponse` as const)}
                            />
                            {errors.serviceQuestions?.[index]?.qsResponse && <p className="text-red-500 text-xs italic">{(errors.serviceQuestions[index].qsResponse as any)?.message}</p>}

                            <div className="flex justify-center gap-6 mt-2">
                                <button
                                    type="button"
                                    onClick={() => serviceQuestionsRemove(index)}
                                    className="bg-white  hover:bg-blue border-2 border-blue-500 text-blue hover:text-white font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-100"
                                >
                                    -
                                </button>
                                <button
                                    type="button"
                                    onClick={() => serviceQuestionsAppend({ qsSubject: "", qsResponse: "" })}
                                   className="bg-white  hover:bg-blue border-2 border-blue-500 text-blue hover:text-white font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => serviceQuestionsAppend({ qsSubject: "", qsResponse: "" })}
                        className="bg-white hover:bg-blue border-2 border-blue  text-blue hover:text-white font-bold py-2 px-4 rounded-full"
                    >
                        Add Question
                    </button>
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

export default ServiceForm;