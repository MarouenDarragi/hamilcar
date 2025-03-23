"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import ServiceFilter from "@/components/Section/Service/ServiceFilter";

import CtaOne from "@/components/Section/CTA/CtaOne";
import FaqsOne from "@/components/Section/FAQs/FaqsOne";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import faqData from "@/data/faqs.json";
import servicesData  from '../../../dataApi/services.json';
import Image from "next/image";
// import { useRouter } from "next/navigation";

export default function ServiceStyleOne() {
  const [faq, setFaq] = useState<number | null>(1);
  const [reverse, setReverse] = useState(false);

  const columnSize = Math.ceil(servicesData.length / 2)
  const handleFaq = (id: number) => {
    setFaq((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <div className="overflow-x-hidden">
        <main className="content">
          <BreadcrumbItem
            link="Our Services"
            img="/images/banner/about1.png"
            title="Nos services"
            desc="Découvrez notre large gamme de services conçus pour accompagner les entreprises dans leur transformation numérique. Nous offrons des solutions adaptées à chaque besoin, allant de l’élaboration de stratégies de transformation à l'intégration de technologies avancées. Quel que soit votre secteur, nos experts sont là pour vous aider à naviguer dans le monde numérique et à améliorer votre performance organisationnelle."
          />
          <div className="content-detail-block lg:py-[100px] sm:py-16 py-10">
            <div className="container">
              <div className="flex max-xl:flex-col gap-y-8">
                <div className="col-12 xl:w-3/4">
                  <div className="content-para xl:pr-[80px]">
                    <div className="heading3">
                      Toute entreprise a besoin d’un accompagnement
                    </div>
                    <div className="body2 text-secondary mt-4">
                      Nous comprenons que chaque entreprise traverse des défis
                      uniques dans sa quête de transformation numérique. Que
                      vous soyez une petite entreprise cherchant à automatiser
                      vos processus ou une grande organisation ayant besoin de
                      moderniser ses systèmes, nous mettons à votre disposition
                      des outils sur mesure et des conseils experts. Notre
                      objectif est de vous offrir les solutions nécessaires pour
                      faire face aux enjeux du numérique, tout en vous
                      permettant d’optimiser vos ressources et d’améliorer vos
                      résultats à long terme.
                    </div>
                    <div className="bg-img mt-8 mb-8">
                      <Image
                        width={5000}
                        height={5000}
                        className="w-full h-full rounded-xl"
                        src="/images/component/960x680.png"
                        alt=""
                      />
                    </div>
                    <div className="heading6">
                      Nous proposons diverses solutions
                    </div>
                    <div className="body2 text-secondary mt-4">{`Notre approche est centrée sur la personnalisation et l’adaptabilité. Nous proposons des solutions variées allant de la mise en place de stratégies numériques, à l’intégration de l’intelligence artificielle, à la gestion de la cybersécurité. Nous vous aidons à créer de nouveaux modèles d'affaires, à optimiser vos processus internes et à développer des solutions innovantes pour rester compétitif dans un environnement numérique en constante évolution.`}</div>
                    <div className="list-feature mt-8">
                    <div className="flex max-lg:flex-col gap-y-3">
  {/* Première colonne */}
  <div className="w-full lg:w-1/2 flex flex-col gap-y-3">
    {servicesData.slice(0, columnSize).map((service, index) => (
      <div key={index} className="flex items-center gap-4">
        <Icon.CheckCircle weight="fill" className="text-xl text-blue flex-shrink-0" />
        <div className="text-button font-bold">{service.title}</div>
      </div>
    ))}
  </div>

  {/* Deuxième colonne */}
  <div className="w-full lg:w-1/2 flex flex-col gap-y-3">
    {servicesData.slice(columnSize).map((service, index) => (
      <div key={index} className="flex items-center gap-4">
        <Icon.CheckCircle weight="fill" className="text-xl text-blue flex-shrink-0" />
        <div className="text-button font-bold">{service.title}</div>
      </div>
    ))}
  </div>
</div>
                      {/* <div className="flex max-lg:flex-col gap-y-3">
                        <div className="w-full lg:w-1/2 gap-y-3 flex flex-col">
                          <div className="item flex items-center gap-4">
                            <Icon.CheckCircle
                              weight="fill"
                              className="text-xl text-blue flex-shrink-0"
                            />
                            <div className="text-button">
                              Transformation numérique
                            </div>
                          </div>
                          <div className="item flex items-center gap-4">
                            <Icon.CheckCircle
                              weight="fill"
                              className="text-xl text-blue flex-shrink-0"
                            />
                            <div className="text-button">
                              Gouvernance du Numérique
                            </div>
                          </div>
                          <div className="item flex items-center gap-4">
                            <Icon.CheckCircle
                              weight="fill"
                              className="text-xl text-blue flex-shrink-0"
                            />
                            <div className="text-button">
                              Conseil Stratégique
                            </div>
                          </div>
                          <div className="item flex items-center gap-4">
                            <Icon.CheckCircle
                              weight="fill"
                              className="text-xl text-blue flex-shrink-0"
                            />
                            <div className="text-button">
                              Développement de Solutions
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-1/2 gap-y-3 flex flex-col">
                          <div className="item flex items-center gap-4">
                            <Icon.CheckCircle
                              weight="fill"
                              className="text-xl text-blue flex-shrink-0"
                            />
                            <div className="text-button">
                              Gouvernance des Données
                            </div>
                          </div>
                          <div className="item flex items-center gap-4">
                            <Icon.CheckCircle
                              weight="fill"
                              className="text-xl text-blue flex-shrink-0"
                            />
                            <div className="text-button">
                              Intelligence Artificielle
                            </div>
                          </div>
                          <div className="item flex items-center gap-4">
                            <Icon.CheckCircle
                              weight="fill"
                              className="text-xl text-blue flex-shrink-0"
                            />
                            <div className="text-button">Cybersécurité</div>
                          </div>
                        </div>
                      </div> */}
                    </div>

                    {/* <div className="list-question lg:mt-[60px] mt-8">
                                            <div className="heading6">Questions sur les services</div>
                                            {faqData.slice(0, 4).map(item => (
                                                <div
                                                    key={item.id}
                                                    className={`question-item hover-box-shadow pointer mt-5 px-7 rounded-lg border border-line cursor-pointer ${faq === item.id ? 'open' : ''}`}
                                                    onClick={() => handleFaq(item.id)}
                                                >
                                                    <div className="question-item-main flex items-center justify-between py-4 heading7">{item.title}
                                                        {faq === item.id ? (
                                                            <Icon.Minus weight="bold" className="text-xl" />
                                                        ) : (
                                                            <Icon.Plus weight="bold" className="text-xl" />
                                                        )}
                                                    </div>
                                                    <div className="content-question">
                                                        <div className="border-line w-full"></div>
                                                        <div className="body3 text-secondary pb-4">{item.desc}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div> */}
                  </div>
                </div>
                <div className="w-full xl:w-1/4">
                  <div className="more-infor border border-line rounded-xl py-8 px-6">
                    <div className="heading6">Le meilleur de nos Services</div>
                    <div className="body3 text-secondary mt-2">
                      Que vous ayez une équipe de 10 ou 100 personnes, nous
                      avons la solution pour vous, et vous aurez toujours des
                      services de qualité.
                    </div>
                    <div className="list-nav mt-4 " >
                      {servicesData.map((service, index) => (
                       <Link 
                       key={index}
                       className={`nav-item rounded-lg flex-between m-5 p-0 ${index > 0 ? 'mt-12' : ''} `}
                       href={`/services/${service.title.toLowerCase().replace(/ /g, '-')}`}
                   >
                          <div className="text-button text-secondary">
                            {service.title}
                          </div>
                          <i className="ph-bold ph-caret-right hidden"></i>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="ads-block rounded-lg md:mt-10 mt-6 relative">
                    <div className="bg-img">
                      <Image
                        width={5000}
                        height={5000}
                        src="/images/component/ads.png"
                        alt=""
                      />
                    </div>
                    <div className="text flex flex-col justify-between absolute left-0 top-0 w-full h-full p-8">
                      <div className="title">
                        <div className="heading5 text-white">Parlons-en</div>
                        <div className="body3 text-white mt-4">
                          Si vous avez un projet,
                          <br />
                          contactez-nous!
                        </div>
                      </div>
                      <div className="button-block md:mt-10 mt-6">
                        <a
                          className="button-main hover:bg-black hover:text-white inline-block bg-white text-button"
                          href="contact-style-one.html"
                        >
                          Consultez!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <FaqsOne />
          </div>
          <CtaOne />
        </main>
      </div>
    </>
  );
}
