// // AdminList.tsx
// 'use client';

// import React from 'react';
// import { ExpertiseType } from '@/type/ExpertiseType';
// import * as Icon from "@phosphor-icons/react";

// interface Props {
//     data: ExpertiseType[];
//     onEdit: (item: ExpertiseType) => void;
//     onDelete: (id: string) => void;
// }

// const AdminList: React.FC<Props> = ({ data, onEdit, onDelete }) => {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {data.map((item, index) => (
//                 <div
//                     key={item.id}
//                     className="service-item p-8 bg-white rounded-lg border border-line hover-box-shadow"
//                 >
//                     <div className="heading flex items-center justify-between">
//                         {/* Dynamic Icon Rendering */}
//                             <>{Icon[item.icon as keyof typeof Icon] && React.createElement(Icon[item.icon as keyof typeof Icon] as React.ComponentType<any>, { className: "text-blue md:text-6xl text-5xl" })}</>
//                         <div className="number heading3 text-placehover">{index + 1}</div>
//                     </div>
//                     <div className="heading6 hover:text-blue duration-300 mt-6">{item.title}</div>
//                     <div className="text-secondary mt-2">{item.desc}</div>

//                     <div className="mt-4 flex justify-end">
//                         <button
//                             onClick={() => onEdit(item)}
//                             className="bg-blue hover:bg-dark-blue text-white font-bold py-2 px-4 rounded mr-2"
//                         >
//                             Edit
//                         </button>
//                         <button
//                             onClick={() => onDelete(item.id ?? "")}
//                             className="bg-critical hover:bg-orange text-white font-bold py-2 px-4 rounded"
//                         >
//                             Delete
//                         </button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default AdminList;
// AdminList.tsx
'use client';

import React from 'react';
import { ExpertiseType } from '@/type/ExpertiseType';
import ExpertiseItem from "@/components/Service/ExpertiseItem"; // Import ExpertiseItem
import * as Icon from "@phosphor-icons/react";

interface Props {
    data: ExpertiseType[];
    onEdit: (item: ExpertiseType) => void;
    onDelete: (id: string) => void;
}

const AdminList: React.FC<Props> = ({ data, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, index) => (
                <div
                    key={item.id}
                    className="relative" // Make this a relative container for positioning
                >
                    <ExpertiseItem
                        data={item}
                        style="style-two"
                        number={index}
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                            onClick={() => onEdit(item)}
                            className="bg-blue hover:bg-dark-blue text-white font-bold py-1 px-2 rounded text-xs"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(item.id ?? "")}
                            className="bg-critical hover:bg-orange text-white font-bold py-1 px-2 rounded text-xs"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminList;