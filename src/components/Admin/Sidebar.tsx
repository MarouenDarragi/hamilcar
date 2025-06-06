// "use client";

// import React from 'react';
// import {
//   Gauge,
//   Wrench,
//   PresentationChart,
//   Handshake,
//   Heart,
//   ChatCircleDots,
//   AirplaneTilt,
//   Info
// } from "@phosphor-icons/react";
// import Link from 'next/link';
// import Image from 'next/image'; // Import the Image component

// const Sidebar = () => {
//   const menuItems = [
//     { name: 'Outils', icon: <Gauge size={24} />, link: '/admin/tools' },
//     { name: 'Infos', icon: <Info size={24} />, link: '/admin/info' },
//     { name: 'Expertise', icon: <Wrench size={24} />, link: '/admin/expertises' },
//     { name: 'Service', icon: <PresentationChart size={24} />, link: '/admin/services' },
//     { name: 'Action Sociale', icon: <Heart size={24} />, link: '/admin/social' },
//     { name: 'Feedback', icon: <AirplaneTilt size={24} />, link: '/admin/feedback' },
//   ];

//   return (
//     <div className="fixed top-0 left-0 h-full w-64 bg-blue text-white shadow-lg">
//      <div className="p-4 flex justify-center items-center bg-white"  >
//         <Image
//           src="/images/logo.png" // Path to your logo in the public directory
//           alt="Logo"
//           width={150} // Adjust the width as needed
//           height={50} // Adjust the height as needed
//           className="mb-2" // Add margin below the logo
//         />

//       </div>
//       <nav className="mt-6">
//         <ul>
//           {menuItems.map((item) => (
//             <li key={item.name} className="p-4 hover:bg-blue-700 transition-colors duration-200">
//               <Link href={item.link} className="flex items-center space-x-3 text-white">
//                 <span>{item.icon}</span>
//                 <span>{item.name}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

"use client";

import React from 'react';
import {
  Gauge,
  Wrench,
  PresentationChart,
  Handshake,
  Heart,
  ChatCircleDots,
  AirplaneTilt,
  Info,
  List,
  X
} from "@phosphor-icons/react";
import Link from 'next/link';
import Image from 'next/image';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: 'Outils', icon: <Gauge size={24} />, link: '/admin/tools' },
    { name: 'Infos', icon: <Info size={24} />, link: '/admin/info' },
    { name: 'Expertise', icon: <Wrench size={24} />, link: '/admin/expertises' },
    { name: 'Service', icon: <PresentationChart size={24} />, link: '/admin/services' },
    { name: 'Action Sociale', icon: <Heart size={24} />, link: '/admin/social' },
    { name: 'Feedback', icon: <AirplaneTilt size={24} />, link: '/admin/feedback' },
  ];

  return (
    <div 
      className={`fixed top-0 left-0 h-full w-64 bg-blue text-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 z-30`}
    >
      <div className="p-4 flex justify-between items-center bg-white">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={150}
          height={50}
          className="mb-2"
        />
        <button 
          onClick={onClose}
          className="md:hidden text-blue hover:text-blue-700 transition-colors"
        >
          <X size={24} />
        </button>
      </div>
      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="p-4 hover:bg-blue-700 transition-colors duration-200">
              <Link href={item.link} className="flex items-center space-x-3 text-white">
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;