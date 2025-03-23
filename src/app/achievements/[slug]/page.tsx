import Link from 'next/link'
import Image from 'next/image'
import TopNavOne from "@/components/Header/TopNav/TopNavOne"
import MenuOne from "@/components/Header/Menu/MenuOne"
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem"
import caseStudyData from '@/data/case-study.json'
import CtaOne from "@/components/Section/CTA/CtaOne"
import Footer from "@/components/Footer/Footer"
import * as Icon from "@phosphor-icons/react/dist/ssr";
import TestimonialTwo from '@/components/Section/Testimonial/TestimonialTwo'

import achievementsData from '@/data/achievementsData.json'

export default function CaseStudyDetail() {
  return (
    <>
      <div className="overflow-x-hidden">
        <main className="content">
          <BreadcrumbItem
            link="Case Studies"
            img="/images/banner/about1.png"
            title="Réalisations majeures"
            desc="Nous exposant l'une de nos projets les plus remarquables qui a reçu la satisfaction de l'un de nos clients. Nous espérons que vous serez le prochain."
          />
          <div className="project-infor lg:mt-[100px] sm:mt-16 mt-10">
            <div className="container">
              <div className="flex max-lg:flex-col justify-between items-start gap-y-8">
                <div className="w-full lg:w-7/12">
                  <div className="heading3">
                    {achievementsData[0].title}
                  </div>
                  <div className="body3 text-secondary mt-4">
                  {achievementsData[0].desc}
                  </div>
                  <div className="count-number flex items-center justify-between mt-8 gap-5">

                  {achievementsData[0].metrics.length > 0 && achievementsData[0].metrics.map((item, index) => (
                    <div className="item" key={index}>
                      <div className="count-block flex items-center">
                        <div className="counter heading4">{item.value}</div>
                        <span className="heading4">%</span>
                      </div>
                      <div className="body3 text-secondary mt-4">
                        {item.metric}
                      </div>
                    </div>
                  ))}
                  </div>
                </div>

                <div className="w-full lg:w-1/3">
                  <div className="rounded-xl bg-white box-shadow p-8 flex flex-col justify-between">
                    <div className="heading6">Données sur le projet</div>
                    <div className="infor-item flex items-center justify-between mt-8">
                      <div className="text-button">Client</div>
                      <div className="body3 text-secondary">
                      {achievementsData[0].client}
                      </div>
                    </div>
                    <div className="line-x mt-4"></div>
                    <div className="infor-item flex items-center justify-between mt-4">
                      <div className="text-button">Date d'achèvement</div>
                      <div className="body3 text-secondary">
                      {achievementsData[0].projectInformations.endDate}
                      </div>
                    </div>
                    <div className="line-x mt-4"></div>
                    <div className="infor-item flex items-center justify-between mt-4">
                      <div className="text-button">Gérant</div>
                      <div className="body3 text-secondary">
                      {achievementsData[0].clientInformations.nameOfDirector}
                      </div>
                    </div>
                    <div className="line-x mt-4"></div>
                    <div className="infor-item flex items-center justify-between mt-4">
                      <div className="text-button">
                        Région d'implantation
                      </div>
                      <div className="body3 text-secondary">
                      {achievementsData[0].projectInformations.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="how-we-did lg:mt-[100px] sm:mt-16 mt-10">
            <div className="container">
              <div className="flex max-lg:flex-col gap-y-8">
                <div className="w-full lg:w-1/2 lg:pr-10 bg-video">
                  <div className="bg-img h-full w-full">
                    <Image
                      width={4000} height={4000}
                      className="w-full block rounded-2xl"
                      src={achievementsData[0].paragraph1.pImg}
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <div className="desc lg:pl-10 lg:pr-3">
                    <div className="heading3">
                    {achievementsData[0].paragraph1.pTitle}
                    </div>
                    <div className="body3 text-secondary md:mt-10 mt-6">
                    {achievementsData[0].paragraph1.pDesc}
                    </div>
                    <div className="list-feature gap-y-3 flex flex-col mt-6">

                      {achievementsData[0].paragraph1.pKeyPoints?.length > 0 && achievementsData[0].paragraph1.pKeyPoints?.map((item, index) => (
                        <div key={`key-point-${index}`} className="item flex items-center gap-3">
                        <Icon.CheckCircle
                          weight="fill"
                          className="text-xl text-blue"
                        />
                        <div className="text-button">
                          {item}
                        </div>
                      </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" layout-item lg:mt-[100px] sm:mt-16 mt-10">
            <div className="container">
              <div className="flex max-lg:flex-col items-center gap-y-8">
                <div className="w-full lg:w-1/2 lg:pr-[40px] flex flex-col justify-center">
                  <div className="heading3">
                  {achievementsData[0].paragraph2.pTitle}
                  </div>
                  <div className="body2 text-secondary mt-5">
                  {achievementsData[0].paragraph2.pDesc}
                  </div>
                  <div className="button-block mt-6">
                    <Link
                      className="button-main bg-black hover:bg-blue text-white text-button w-fit rounded-lg flex items-center gap-2"
                      href="contact-two.html"
                    >
                      <Icon.ArrowRight
                        weight="bold"
                        className="text-white rounded-xl"
                      />
                      <span>Commencer maintenant</span>
                    </Link>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 lg:pl-[55px]">
                  <div className="bg-img w-full overflow-hidden rounded-2xl">
                    <Image
                      width={4000} height={4000}
                      className="w-full h-full hover-scale block"
                      src={achievementsData[0].paragraph2.pImg}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TestimonialTwo data={achievementsData[0].testimonials} client={achievementsData[0].client} />
          <CtaOne />
        </main>
      </div >
    </>
  );
}