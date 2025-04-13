
'use client'

import { useState } from "react"
import Link from 'next/link'
import TopNavOne from "@/components/Header/TopNav/TopNavOne"
import MenuOne from "@/components/Header/Menu/MenuOne"
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem"
import ServiceFilter from "@/components/Section/Service/ServiceFilter"
import servicesData  from '../../../../dataApi/services.json';
import CtaOne from "@/components/Section/CTA/CtaOne"
import Footer from "@/components/Footer/Footer"
import * as Icon from "@phosphor-icons/react"
import Image from "next/image"
import { notFound } from 'next/navigation'; // Ajoutez cette ligne
export default function ServiceStyleOne({ params: { slug } }: { params: { slug: string } }) {
    const serviceFound = servicesData.find(item => {
        // Utilisez la même logique de normalisation que dans les liens
        const itemSlug = item.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, '-');

        return itemSlug === slug;
    });

 

    const [faq, setFaq] = useState<number | null>(1)

    const handleFaq = (id: number) => {
        setFaq(prevId => prevId === id ? null : id)
    }

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
                      - {serviceFound?.title}
                      </div>
                      {/* <div className="body2 text-secondary mt-4">
                        {serviceFound?.shortDesc}
                        Prix: 20% réduction // intervention 24h
                      </div> */}
                      <div className="bg-img mt-8 mb-8">
                        <Image
                          width={5000}
                          height={5000}
                          className="w-full h-full rounded-xl"
                          src="/images/component/630x200.png"
                          alt=""
                        />
                      </div>
                      {/* <div className="heading6">
                        subtitle...
                      </div> */}
                      <div className="body2 text-secondary mt-4">
                        {serviceFound?.desc}
                      </div>
                      <div className="list-feature mt-8">
                        <div className="flex max-lg:flex-col gap-y-3">
                          <div className="w-full lg:w-1/2 gap-y-3 flex flex-col">
                            {
                              /*serviceFound?.serviceItems.length > 0 &&*/ serviceFound?.serviceItems
                                .slice(
                                  0,
                                  Math.ceil(serviceFound?.serviceItems.length / 2)
                                )
                                .map((item, index) => (
                                  <div
                                    key={`service-item-l-${index}`}
                                    className="item flex items-start gap-4"
                                  >
                                    <Icon.CheckCircle
                                      weight="fill"
                                      className="text-xl text-blue flex-shrink-0 mt-1"
                                    />
                                    <div>
                                      <div className="text-button">
                                        {item.itemTitle}
                                      </div>
                                      <div className="text-secondary mt-2">
                                        {item.itemDesc}
                                      </div>
                                    </div>
                                  </div>
                                ))
                            }
                          </div>
                          <div className="w-full lg:w-1/2 gap-y-3 flex flex-col">
                            {
                              /*serviceFound?.serviceItems.length > 0 &&*/ serviceFound?.serviceItems
                                .slice(
                                  Math.ceil(
                                    serviceFound?.serviceItems.length / 2
                                  ),
                                  serviceFound?.serviceItems.length
                                )
                                .map((item, index) => (
                                  <div
                                    key={`service-item-r-${index}`}
                                    className="item flex items-start gap-4"
                                  >
                                    <Icon.CheckCircle
                                      weight="fill"
                                      className="text-xl text-blue flex-shrink-0 mt-1"
                                    />
                                    <div>
                                      <div className="text-button">
                                        {item.itemTitle}
                                      </div>
                                      <div className="text-secondary mt-2">
                                        {item.itemDesc}
                                      </div>
                                    </div>
                                  </div>
                                ))
                            }
                          </div>
                        </div>
                      </div>
                      <div className="list-question lg:mt-[60px] mt-8">
                                            <div className="heading6"> Questions / Réponses sur le service</div>
                                            {serviceFound?.serviceQuestions?.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={`question-item hover-box-shadow pointer mt-5 px-7 rounded-lg border border-line cursor-pointer ${faq === index + 1 ? 'open' : ''}`}
                                                    onClick={() => handleFaq(index + 1)}
                                                >
                                                    <div className="question-item-main flex items-center justify-between py-4 heading7">
                                                        {item.qsSubject}
                                                        {faq === index + 1 ? (
                                                            <Icon.Minus weight="bold" className="text-xl" />
                                                        ) : (
                                                            <Icon.Plus weight="bold" className="text-xl" />
                                                        )}
                                                    </div>
                                                    <div className="content-question">
                                                        <div className="border-line w-full"></div>
                                                        <div className="body3 text-secondary pb-4">{item.qsResponse}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                     
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
                      {/* <div className="list-nav mt-4">
                                              {servicesData.map((service, index) => (
                                                  <Link 
                                                      key={index}
                                                      className={`nav-item rounded-lg flex-between p-12 ${index > 0 ? 'mt-12' : ''} ${service.title.toLowerCase().replace(/ /g, '-') === slug ? 'active' : ''}`}
                                                      href={`/services/${service.title.toLowerCase().replace(/ /g, '-')}`}
                                                  >
                                                      <div className="text-button text-secondary">
                                                          {service.title}
                                                      </div>
                                                      <i className="ph-bold ph-caret-right hidden"></i>
                                                  </Link>
                                              ))}
                                          </div> */}
                                          <div className="list-nav mt-4">
  {servicesData.map((service) => {
    // Génération cohérente du slug
    const serviceSlug = service.title
      .toLowerCase()
      .normalize("NFD") // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
      .replace(/\s+/g, '-'); // Remplace les espaces par des tirets

    return (
      <Link 
        key={service.id} // Utilisez l'ID unique au lieu de l'index
        className={`nav-item rounded-lg flex-between m-5 p-0 ${serviceSlug === slug ? 'active' : ''}`}
        href={`/services/${serviceSlug}`}
      >
        <div className="text-button text-secondary">
          {service.title}
        </div>
        <i className="ph-bold ph-caret-right hidden"></i>
      </Link>
    );
  })}
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
            </div>
            <CtaOne />
          </main>
        </div>
      </>
    )
}