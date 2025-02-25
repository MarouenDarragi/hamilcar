// import TopNavOne from "@/components/Header/TopNav/TopNavOne"
// import MenuOne from "@/components/Header/Menu/MenuOne"
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import AboutTwo from "@/components/Section/About/AboutTwo";
import CounterFive from "@/components/Section/Counter/CounterFive";
import ServiceTwo from "@/components/Section/Service/ServiceTwo";
import serviceData from '@/data/expertise.json';
import OurTeam from "@/components/Section/OurTeam/OurTeam";
// import PartnerAbout from "@/components/Section/Partner/PartnerAbout"
// import CtaOne from "@/components/Section/CTA/CtaOne"
// import Footer from "@/components/Footer/Footer"
import PartnerSix from "@/components/Section/Partner/PartnerSix";

export default function AboutStyleOne() {
  return (
    <>
      <div className="overflow-x-hidden">
        <header id="header">
          {/* <TopNavOne /> */}
          {/* <MenuOne /> */}
        </header>
        <main className="content">
          <BreadcrumbItem link="About Us" img="/images/banner/about1.png" title="About Us" desc="We perform a full analysis of the client’s website and collect information about all the competitors to formulate a proper strategy." />
          <AboutTwo />
          <CounterFive classname="lg:pb-[100px] sm:pb-16 pb-10" />
          <ServiceTwo data={serviceData} />
          <OurTeam />
          <PartnerSix classname='bg-blue lg:mt-[100px] sm:mt-16 mt-10' />
          {/* <PartnerAbout /> */}
          {/* <CtaOne /> */}
        </main>
        <footer id="footer">
          {/* <Footer /> */}
        </footer>
      </div >
    </>
  )
}