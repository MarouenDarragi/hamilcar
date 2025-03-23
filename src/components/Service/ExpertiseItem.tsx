// components/Service/ExpertiseItem.tsx
"use client";

import React, { useState } from 'react';
import Link from "next/link";
import { ExpertiseType } from "@/type/ExpertiseType";
import * as Icon from "@phosphor-icons/react";
import ExpertisePopup from "../Section/Service/ExpertisePopup";

interface Props {
    data: ExpertiseType;
    style: string;
    number: number;
}

const ExpertiseItem: React.FC<Props> = ({ data, style, number }) => {
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
        {style === 'style-two' &&
            <div className="service-item py-7 px-6 bg-white rounded-lg border border-line box-shadow-sm hover-box-shadow">
                <div className="service-item-main flex items-center gap-8 h-full">
                    <div className="icon">
                        {IconComponent && <IconComponent className="text-blue md:text-6xl text-5xl" />}
                    </div>
                    <div className="infor">
                        <div className="heading7 hover:text-blue duration-300">{data.title}</div>
                        <br />
                        <div className="text-secondary mt-2">{data.shortDesc}</div>
                        <div className="read-more flex items-center gap-1 mt-2">
                            <Link
                                href={"/service/service-detail/[slug]"}
                                as={`/service/service-detail/${data.title.toLowerCase().replace(/ /g, '-')}`}
                                onClick={handleExploreClick}
                                className="flex items-center" // Added flex alignment
                            >
                                <Icon.CaretRight weight="bold" className="text-blue text-sm duration-300" />
                                <div className="text-button-sm">Voir plus</div>
                            </Link>
                        </div>
                    </div>
                </div>
                {isPopupOpen && <ExpertisePopup data={data} onClose={handleClosePopup} />}
            </div>
        }

    </>
    )
}

export default ExpertiseItem