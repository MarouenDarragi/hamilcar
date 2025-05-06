"use client";

import Image from "next/image";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";

const SliderOne = () => {
  return (
    <>
      <div className="slider-block style-one">
        <div className="prev-arrow flex items-center justify-center">
          <Icon.CaretLeft className="text-white heading6" weight="bold" />
        </div>
        <div className="slider-main">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              prevEl: ".prev-arrow",
              nextEl: ".next-arrow",
            }}
            loop={true}
            pagination={{ clickable: true }}
            speed={400}
            modules={[Pagination, Autoplay, Navigation]}
            className="h-full relative"
            autoplay={{
              delay: 8000,
            }}
          >

            {/* <SwiperSlide>
              <div className="slider-item slider-first">
                <div className="bg-img">
                  <Image
                    src={"/images/slider/1920x874.mp4"}
                    width={4000}
                    height={3000}
                    alt="bgslider"
                    priority={true}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="container">
                  <div className="text-content flex-columns-between">
                    <div className="heading2">
                      <div className="relative overflow-hidden">
                        <span className="block relative overflow-hidden">
                        Évaluez votre niveau
                        </span>
                        <span className="block absolute top-0 left-0 w-full h-full">
                        Évaluez votre niveau
                        </span>
                      </div>
                      <div className="relative overflow-hidden">
                        <span className="block relative overflow-hidden">
                        de numérisation et
                        </span>
                        <span className="block absolute top-0 left-0 w-full h-full">
                        de numérisation et
                        </span>
                      </div>
                      <div className="relative overflow-hidden">
                        <span className=" text-blue block relative overflow-hidden">
                        identifiez vos axes d'amélioration
                        </span>
                        <span className=" text-blue block absolute top-0 left-0 w-full h-full">
                        identifiez vos axes d'amélioration
                        </span>
                      </div>
                    </div>
                    <div className="body2 mt-3 text-secondary">
                    Notre outil d'évaluation gratuit vous aide à déterminer <br />
                    où vous vous situez dans votre parcours numérique et à repérer les domaines nécessitant des améliorations. 
                    </div>
                    <div className="button-block md:mt-10 mt-6">
                      <Link
                        className="button-main bg-blue text-white"
                        href="/service/service-one"
                      >
                        Commencez l'évaluation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide> */}
            <SwiperSlide>
  <div className="slider-item slider-first">
    <div className="bg-img w-full h-full">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/images/slider/1920x874.jpg" // optionnel : miniature avant lecture
      >
        <source src="/images/slider/videos/slider_1.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo HTML5.
      </video>
    </div>
    <div className="container">
    <div className="text-content flex-columns-between">
                    <div className="heading2">
                      <div className="relative overflow-hidden">
                        <span className="block relative overflow-hidden">
                        Évaluez votre niveau
                        </span>
                        <span className="block absolute top-0 left-0 w-full h-full">
                        Évaluez votre niveau
                        </span>
                      </div>
                      <div className="relative overflow-hidden">
                        <span className="block relative overflow-hidden">
                        de numérisation et
                        </span>
                        <span className="block absolute top-0 left-0 w-full h-full">
                        de numérisation et
                        </span>
                      </div>
                      <div className="relative overflow-hidden">
                        <span className=" text-blue block relative overflow-hidden">
                        identifiez vos axes d'amélioration
                        </span>
                        <span className=" text-blue block absolute top-0 left-0 w-full h-full">
                        identifiez vos axes d'amélioration
                        </span>
                      </div>
                    </div>
                    <div className="body2 mt-3 text-secondary">
                    Notre outil d'évaluation gratuit vous aide à déterminer <br />
                    où vous vous situez dans votre parcours numérique et à repérer les domaines nécessitant des améliorations. 
                    </div>
                    <div className="button-block md:mt-10 mt-6">
                      <Link
                        className="button-main bg-blue text-white"
                        href="/service/service-one"
                      >
                        Commencez l'évaluation
                      </Link>
                    </div>
                  </div>
    </div>
  </div>
</SwiperSlide>
            <SwiperSlide>
              <div className="slider-item slider-second">
              <div className="bg-img w-full h-full">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/images/slider/1920x874.jpg" // optionnel : miniature avant lecture
      >
        <source src="/images/slider/videos/slider_2.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo HTML5.
      </video>
    </div>

                <div className="container">
                  <div className="text-content flex-columns-between">
                    <div className="heading2">
                      <div className="relative overflow-hidden">
                        <span className="block relative overflow-hidden">
                        Comparez vous
                        </span>
                        <span className="block absolute top-0 left-0 w-full h-full">
                        Comparez vous
                        </span>
                      </div>
                      <div className="relative overflow-hidden">
                        <span className="block relative overflow-hidden">
                          aux autres en matière
                        </span>
                        <span className="block absolute top-0 left-0 w-full h-full">
                          aux autres en matière
                        </span>
                      </div>
                      <div className="relative overflow-hidden">
                        <span className=" text-blue block relative overflow-hidden">
                          de Maturité Numérique
                        </span>
                        <span className=" text-blue block absolute top-0 left-0 w-full h-full">
                        de Maturité Numérique
                        </span>
                      </div>
                    </div>
                    <div className="body2 mt-3 text-secondary">
                    Découvrez comment votre entreprise se positionne <br />
                    par rapport à vos concurrents et identifiez les opportunités pour renforcer votre compétitivité.
                    </div>
                    <div className="button-block md:mt-10 mt-6">
                      <Link
                        className="button-main bg-blue text-white"
                        href="/service/service-one"
                      >
                        Comparez maintenant
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-item slider-third">
              <div className="bg-img w-full h-full">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster="/images/slider/1920x874.jpg" // optionnel : miniature avant lecture
      >
        <source src="/images/slider/videos/slider_3.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la vidéo HTML5.
      </video>
    </div>
                <div className="container">
                  <div className="text-content flex-columns-between">
                    <div className="heading2">
                      <div className="relative overflow-hidden">
                        <span className="block relative overflow-hidden">
                        Découvrez votre 
                        </span>
                        <span className="block absolute top-0 left-0 w-full h-full">
                        Découvrez votre 
                        </span>
                      </div>
                      <div className="relative overflow-hidden">
                        <span className="block relative overflow-hidden">
                        potentiel d’amélioration et
                        </span>
                        <span className="block absolute top-0 left-0 w-full h-full">
                        potentiel d’amélioration et
                        </span>
                      </div>
                      <div className="relative overflow-hidden">
                        <span className=" text-blue block relative overflow-hidden">
                        optimisez vos processus numériques
                        </span>
                        <span className=" text-blue block absolute top-0 left-0 w-full h-full">
                        optimisez vos processus numériques
                        </span>
                      </div>
                    </div>
                    <div className="body2 mt-3 text-secondary">
                    Identifiez les domaines où la transformation numérique
                      <br />
                      peut avoir le plus grand impact et élaborez des stratégies pour améliorer l'efficacité de vos opérations. 
                    </div>
                    <div className="button-block md:mt-10 mt-6">
                      <Link
                        className="button-main bg-blue text-white"
                        href="/service/service-one"
                      >
                        Explorez l'opportunité
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="next-arrow flex items-center justify-center">
          <Icon.CaretRight className="text-white heading6" weight="bold" />
        </div>
      </div>
    </>
  );
};

export default SliderOne;
