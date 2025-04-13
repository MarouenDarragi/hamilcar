"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import ServiceFilter from "@/components/Section/Service/ServiceFilter";

import CtaOne from "@/components/Section/CTA/CtaOne";
import FaqsOne from "@/components/Section/FAQs/FaqsOne";
import * as Icon from "@phosphor-icons/react/dist/ssr";
// import faqData from "@/data/faqs.json";
// import servicesData  from '../../../dataApi/services.json';
import Image from "next/image";
// import { useRouter } from "next/navigation";

export default function ServiceStyleOne() {
  const [faq, setFaq] = useState<number | null>(1);
  const [reverse, setReverse] = useState(false);

  const toolsData = [
    {
      id: 1,
      title: "Evaluation de la mturité numérique",
      desc: "..."
    },
    {
      id: 2,
      title: "Evaluation de l'Intégration IA",
      desc: "..."
    },
    {
      id: 3,
      title: "Evaluation de l'incidence algorithmique",
      desc: "..."
    },
    {
      id: 4,
      title: "Etat de santé en cybersécurité",
      desc: "..."
    }
  ]

  const columnSize = Math.ceil(toolsData.length / 2)
  const handleFaq = (id: number) => {
    setFaq((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <div className="overflow-x-hidden">
        <main className="content">
          <BreadcrumbItem
            link="Boite à outils"
            img="/images/banner/about1.png"
            title="Boite à outils"
            desc="Découvrez notre gamme d'outils adaptés pour évaluer et diagnostiquer vos besoins en matière de transformation numérique."
          />
          <div className="content-detail-block lg:py-[100px] sm:py-16 py-10">
            <div className="container">
              <div className="flex max-xl:flex-col gap-y-8">
                <div className="col-12 xl:w-3/4">
                  <div className="content-para xl:pr-[80px]">
                    <div className="heading3">
                      Toute une gamme d’outils
                    </div>
                    <div className="body2 text-secondary mt-4">
                      Nous avons une gamme d’outils qui couvrent les différents aspects en terme de maturité numérique et gouvernance de données au sein des entreprises.
                    </div>
                    {/* <div className="bg-img mt-8 mb-8">
                      <Image
                        width={5000}
                        height={5000}
                        className="w-full h-full rounded-xl"
                        src="/images/component/960x680.png"
                        alt=""
                      />
                    </div> */}



                    <div className="row flex items-center justify-center my-10">
                        <div className="w-full lg:w-2/3">
                            <div className="content bg-gradient-blue rounded-xl flex flex-col items-center gap-4 py-8 px-7">
                                <div className="bg-img w-[120px]"><Image width={4000} height={4000} className="w-full" src="/images/component/avatar-group.png" alt="" /></div>
                                <div className="text text-center">
                                    <div className="heading6 text-white">Vous voulez être convaincu?</div>
                                    <div className="body3 text-white mt-2">Découvrez en 5 minutes comment votre entreprise se situe par rapport aux autres.</div>
                                </div>
                                <Link className="button-main hover:bg-black bg-blue text-white rounded-full" href="/contact/contact-two">Evaluation rapide</Link>
                            </div>
                        </div>
                    </div>

                    <div className="heading6">
                      Faites votre  choix
                    </div>
                    <div className="body2 text-secondary mt-4">Nous avons une gamme d’outils qui couvrent les différents aspects en terme de maturité numérique et gouvernance de données au sein des entreprises.
                    </div>
                    <div className="list-feature mt-8">
                    <div className="flex max-lg:flex-col gap-y-3">
  {/* Première colonne */}
  <div className="w-full lg:w-1/2 flex flex-col gap-y-3">
    {toolsData.slice(0, columnSize).map((tool, index) => (
      <div key={index} className="flex items-center gap-4">
        <Icon.CheckCircle weight="fill" className="text-xl text-blue flex-shrink-0" />
        <div className="text-button font-bold">{tool.title}</div>
      </div>
    ))}
  </div>

  {/* Deuxième colonne */}
  <div className="w-full lg:w-1/2 flex flex-col gap-y-3">
    {toolsData.slice(columnSize).map((tool, index) => (
      <div key={index} className="flex items-center gap-4">
        <Icon.CheckCircle weight="fill" className="text-xl text-blue flex-shrink-0" />
        <div className="text-button font-bold">{tool.title}</div>
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
                    <div className="heading6">Des outils efficaces</div>
                    <div className="body3 text-secondary mt-2">
                    Nous avons une gamme d’outils qui couvrent les différents aspects en terme de maturité numérique et gouvernance de données au sein des entreprises.
                    </div>
                    <div className="list-nav mt-4 " >
                      {toolsData.map((tool, index) => (
                       <Link 
                       key={index}
                       className={`nav-item rounded-lg flex-between m-5 p-0 ${index > 0 ? 'mt-12' : ''} `}
                       href={`/tools/${tool.title.toLowerCase().replace(/ /g, '-')}`}
                   >
                          <div className="text-button text-secondary">
                            {tool.title}
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
            {/* <FaqsOne /> */}
          </div>
          <CtaOne />
        </main>
      </div>
    </>
  );
}
