'use client'

import Image from "next/image"
import Link from "next/link"
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import achievementsData from '@/data/achievementsData.json'
import 'swiper/css/bundle';

const ProjectTwo = () => {
    return (
        <div className="our-project-block lg:mt-[100px] sm:mt-16 mt-10">
            <div className="container">
                <div className="heading3 text-center">Réalisations majeures</div>
                <div className="body2 text-secondary mt-3 text-center">En voici un échantillon de nos projets majeurs, et bien plus encore... <br />Nous souhaitons, vous voir le bienvenue chez Hamilcar.</div>
            </div>
            <div className="list-project md:mt-10 mt-7">
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                    speed={400}
                    modules={[Pagination, Autoplay]}
                    className='h-full relative'
                    autoplay={{
                        delay: 4000,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        }
                    }}
                >
                    {achievementsData.length > 0 && achievementsData.map((item, index) => (
                        <SwiperSlide key={index}>
                        <div className="item">
                            <div className="bg-img overflow-hidden">
                                <Image width={5000} height={5000} className="w-full h-full" src={item.img} alt="" />
                            </div>
                            <Link className="text" href={`/achievements/${item.slug}`}>
                                <div className="heading5 text-white">{item.title}</div>
                                <div className="body3 text-white mt-1">{item.client}</div>
                            </Link>
                            <Link className="arrow w-[52px] h-[52px] flex items-center justify-center bg-white rounded-full hover:text-white" href={`/achievements/${item.slug}`}>
                                <Icon.ArrowRight className="text-3xl" />
                            </Link>
                        </div>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
export default ProjectTwo