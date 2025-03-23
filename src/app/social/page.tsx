import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuOne";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import CaseStudyOne from "@/components/CaseStudy/CaseStudyOne";
import socialData from "@/data/socialData.json";
// import caseStudyData from '@/data/case-study.json'
import CtaOne from "@/components/Section/CTA/CtaOne";
import Footer from "@/components/Footer/Footer";
import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function CaseStudyStyleOne() {
  const interventionAreas = [
    {
      areaRegion: "Québec",
      areaDesc:
        "Nous soutenons des initiatives locales qui visent à améliorer la qualité de vie des communautés québécoises. Cela inclut des partenariats avec des organismes de bienfaisance, des projets communautaires et des programmes éducatifs.",
    },
    {
      areaRegion: "Canada",
      areaDesc:
        "À l'échelle nationale, nous participons à des projets qui favorisent le développement durable, l'inclusion sociale et l'innovation technologique. Nous collaborons avec des organisations canadiennes pour promouvoir des causes importantes et soutenir des initiatives à fort impact.",
    },
    {
      areaRegion: "International",
      areaDesc:
        "Nous étendons notre engagement au-delà des frontières canadiennes en soutenant des projets internationaux qui visent à améliorer les conditions de vie dans les communautés défavorisées. Cela inclut des initiatives en matière de santé, d'éducation et de développement économique.",
    },
  ];

  return (
    <>
      <div className="overflow-x-hidden">
        <main className="content">
          <BreadcrumbItem
            link="Engagement social"
            img="/images/banner/about1.png"
            title="Engagement social"
            desc="Notre implication est à la fois locale et internationale. Chez Hamilcar, nous sommes profondément engagés à avoir un impact positif sur la société."
          />

          <div className="content-detail-block pt-16">
            <div className="container">
              <div className="heading flex items-center">
                <h3 className="heading6">Actions locales et internationales</h3>
              </div>
              <div className="body3 text-secondary lg:mt-5 mt-3">
                Notre engagement social
                <br className="max-md:hidden" />
                se manifeste à plusieurs niveaux :
              </div>

              <div className="list-feature mt-8">
                <div className="flex max-lg:flex-col">
                  <div className="w-full flex flex-col">
                    {interventionAreas.map((item, index) => (
                      <div
                        key={`service-item-l-${index}`}
                        className="item flex items-start gap-4"
                      >
                        <Icon.CheckCircle
                          weight="fill"
                          className="text-xl text-blue flex-shrink-0 mt-1"
                        />
                        <div>
                          <div className="text-button">{item.areaRegion}</div>
                          <div className="text-secondary mt-2">
                            {item.areaDesc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CaseStudyOne data={socialData} />
          <CtaOne />
        </main>
      </div>
    </>
  );
}
