// components/Service/ExpertisePopup.tsx
import React from 'react';
import { ExpertiseType } from "@/type/ExpertiseType";
import * as Icon from "@phosphor-icons/react";

interface Props {
    data: ExpertiseType;
    onClose: () => void;
}

const ExpertisePopup: React.FC<Props> = ({ data, onClose }) => {
    const IconComponent = Icon[data.icon as keyof typeof Icon] as React.FC<any>;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">{data.title}</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        <Icon.X size={24} />
                    </button>
                </div>
                <div className="text-secondary mt-2">{data.desc}</div>
            </div>
        </div>
    );
};

export default ExpertisePopup;