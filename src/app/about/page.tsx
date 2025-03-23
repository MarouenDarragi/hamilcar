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

export default function AboutStyleOne() {
  return (
    <>
    <div className="overflow-x-hidden">
      <main className="content">
        <BreadcrumbItem
          link="About Us"
          img="/images/banner/about1.png"
          title="A propos de Nous"
          desc="Depuis la création, nous avons poursuivi notre mission d'aider les entreprises à mettre en œuvre des solutions innovantes pour leur transformation numérique. Nous cherchons à propulser le succès de nos clients grâce à des services-conseils de haute qualité, portés par le professionnalisme et l'engagement de notre équipe."
        />
        <AboutTwo />
        <CounterFive classname="lg:pb-[100px] sm:pb-16 pb-10" />
        <Expertise data={ExpertiseData} />
        <OurTeam />
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
