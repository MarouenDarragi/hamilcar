// components/Service/ServiceCard.tsx
'use client';

import React from 'react';
import { ServiceType } from '@/type/ServiceType';
import * as Icon from "@phosphor-icons/react";

interface Props {
    data: ServiceType[];
    onEdit: (item: ServiceType) => void;
    onDelete: (id: string) => void;
}

const ServiceCard: React.FC<Props> = ({ data, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, index) => (
                <div
                    key={item.id}
                    className="service-item p-8 bg-white rounded-lg border border-line hover-box-shadow"
                >
                    <div className="heading flex items-center justify-between">
                        {/* Dynamic Icon Rendering */}
                        <>{Icon[item.icon as keyof typeof Icon] && React.createElement(Icon[item.icon as keyof typeof Icon] as React.ComponentType<any>, { className: "text-blue md:text-6xl text-5xl", size: 32 })}</>
                        <div className="number heading3 text-placehover">{index + 1}</div>
                    </div>
                    <div className="heading7 hover:text-blue duration-300 mt-6">{item.title}</div>
                    <div className="text-secondary mt-2">{item.shortDesc}</div>

                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => onEdit(item)}
                            className="bg-blue hover:bg-dark-blue text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(item.id ?? "")}
                            className="bg-critical hover:bg-orange text-white font-bold py-2 px-4 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServiceCard;