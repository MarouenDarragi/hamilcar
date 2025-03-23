// components/Service/ExpertiseItem.tsx
"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { ServiceType } from "@/type/ServiceType";
import * as Icon from "@phosphor-icons/react";
import ExpertisePopup from "../Section/Service/ExpertisePopup";

interface Props {
    data: ServiceType;
    style: string;
    number: number;
}

const ServiceItem: React.FC<Props> = ({ data, style, number }) => {
    const IconComponent = Icon[data.icon as keyof typeof Icon] as React.FC<any>;
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleExploreClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
 

{style === 'style-five' &&
                <div className="service-item p-8 bg-white rounded-lg border border-line hover-box-shadow">
                    <Link
                        className="service-item-main h-full"
                        href={"/services/[slug]"}
                        as={`/services/${data.title.toLowerCase().replace(/ /g, '-')}`}
                    >
                        <div className="heading flex items-center justify-between">
                            {IconComponent && 
                                <IconComponent className="text-blue md:text-6xl text-5xl" />
                            }
                            <div className="number heading3 text-placehover">{number + 1}</div>
                        </div>
                        <div className="heading7 hover:text-blue duration-300 mt-6">{data.title}</div>
                        <div className="text-secondary mt-2">{data.shortDesc}</div>
                        <div className="read-more flex items-center gap-1 mt-4">
                            <div className="text-button-sm">Voir Plus</div>
                            <Icon.CaretRight weight="bold" className="text-blue text-sm duration-300" />
                        </div>
                    </Link>
                </div>
            }
        </>
    );
}

export default ServiceItem;