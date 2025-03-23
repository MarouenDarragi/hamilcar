"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const PartnerAbout = () => {

  const partnerAdvantages = [
    {
      advantageName: "Diversification des Services :",
      advantageDesc:
        "En collaborant avec des experts de différents secteurs, nous élargissons notre gamme de services pour mieux répondre aux attentes de nos clients.",
    },
    {
      advantageName: "Innovation Continue :",
      advantageDesc:
        "Les partenariats nous permettent de rester à la pointe de l'innovation en intégrant les dernières technologies et pratiques du marché.",
    },
    {
      advantageName: "Solutions Complètes :",
      advantageDesc:
        "En travaillant ensemble, nous pouvons offrir des solutions intégrées et sur mesure qui couvrent tous les aspects des projets de transformation numérique. ",
    },
  ];

  return (
    <>
      <section className="service-block lg:mt-[100px] sm:mt-16 mt-10">
        <div className="container items-center justify-center">
          <div className="pl-[72px] w-full flex flex-col gap-4 flex-shrink-0">
            <div className="text-sub-heading2 text-blue">
            Partenariats Stratégiques
            </div>

            <h3 className="heading3">
            Collaboration pour l'Innovation
            </h3>
            <div className="body3 text-secondary">
            Chez Hamilcar, nous croyons en la force des partenariats pour diversifier et enrichir notre offre de services. Nous collaborons avec des firmes spécialisées dans divers domaines pour offrir des solutions complètes et innovantes à nos clients. Ces partenariats nous permettent de combiner notre expertise avec celle de nos partenaires pour répondre aux besoins spécifiques de chaque projet.

            </div>

            <div className="list-feature mt-8">
                            <div className="flex max-lg:flex-col">
                              <div className="w-full flex flex-col">
                                {partnerAdvantages.map((item, index) => (
                                  <div
                                    key={`service-item-l-${index}`}
                                    className="item flex items-start gap-4"
                                  >
                                    <Icon.CheckCircle
                                      weight="fill"
                                      className="text-xl text-blue flex-shrink-0 mt-1"
                                    />
                                    <div>
                                      <div className="text-button">{item.advantageName}</div>
                                      <div className="text-secondary mb-2">
                                        {item.advantageDesc}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>



          </div>

            <div className="partner-block md:py-[100px] py-[32px] px-12">
              <div className="container">
                <div className="list-partner">
                  <Swiper
                    spaceBetween={12}
                    slidesPerView={2}
                    loop={true}
                    modules={[Autoplay]}
                    autoplay={{
                      delay: 3000,
                    }}
                    breakpoints={{
                      500: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                      },
                      680: {
                        slidesPerView: 3,
                        spaceBetween: 16,
                      },
                      992: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                      },
                      1280: {
                        slidesPerView: 4,
                        spaceBetween: 16,
                      },
                    }}
                  >
                    <SwiperSlide>
                      <div className="partner-item relative flex items-center justify-center md:h-16 h-10">
                        <Image
                          src={"/images/partner/140x32.png"}
                          width={500}
                          height={500}
                          alt="1"
                          className="h-full w-auto duration-500 relative object-cover"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="partner-item relative flex items-center justify-center md:h-16 h-10">
                        <Image
                          src={"/images/partner/140x32.png"}
                          width={500}
                          height={500}
                          alt="1"
                          className="h-full w-auto duration-500 relative object-cover"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="partner-item relative flex items-center justify-center md:h-16 h-10">
                        <Image
                          src={"/images/partner/140x32.png"}
                          width={500}
                          height={500}
                          alt="1"
                          className="h-full w-auto duration-500 relative object-cover"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="partner-item relative flex items-center justify-center md:h-16 h-10">
                        <Image
                          src={"/images/partner/140x32.png"}
                          width={500}
                          height={500}
                          alt="1"
                          className="h-full w-auto duration-500 relative object-cover"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="partner-item relative flex items-center justify-center md:h-16 h-10">
                        <Image
                          src={"/images/partner/140x32.png"}
                          width={500}
                          height={500}
                          alt="1"
                          className="h-full w-auto duration-500 relative object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>

        </div>
      </section>
    </>
  );
};

export default PartnerAbout;
