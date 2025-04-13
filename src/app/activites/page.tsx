// import TopNavOne from "@/components/Header/TopNav/TopNavOne"
// import MenuOne from "@/components/Header/Menu/MenuOne"
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import AboutTwo from "@/components/Section/About/AboutTwo";
import CounterFive from "@/components/Section/Counter/CounterFive";
import Expertise from "@/components/Section/Service/Expertise";
import ExpertiseData from "../../../dataApi/expertises.json";
import OurTeam from "@/components/Section/OurTeam/OurTeam";
 import PartnerAbout from "@/components/Section/Partner/PartnerAbout"
 import CtaOne from "@/components/Section/CTA/CtaOne"
// import Footer from "@/components/Footer/Footer"
import PartnerSix from "@/components/Section/Partner/PartnerSix";
import ProjectTwo from "@/components/Section/Project/ProjectTwo";


export default function AboutStyleOne() {
  return (
    <>
    <div className="overflow-x-hidden">
      <main className="content">
        <BreadcrumbItem
          link="Acivites"
          img="/images/banner/about1.png"
          title="Nos activités"
          desc="Nous sommes une équipe active et dynamique, travaillant en collaboration avec nos clients pour leurs besoins. Nous engageons envers la qualité et la satisfaction de nos clients. Nous engageons en prenant nos responsabilités sociales envers les entreprises et les personnes."
        />
        
        
        <Expertise data={ExpertiseData} />
        <ProjectTwo />
        
        <PartnerAbout />
          {/* <PartnerSix classname="bg-blue lg:mt-[100px] sm:mt-16 mt-10" /> */}
          {/* <PartnerAbout /> */}

          <CtaOne />
        {/* <PartnerAbout /> */}
        {/* <CtaOne /> */}
      </main>
    </div>
  </>

  );
}
