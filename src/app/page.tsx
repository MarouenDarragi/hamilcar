// import TopNavOne from "@/components/Header/TopNav/TopNavOne";
// import MenuOne from "@/components/Header/Menu/MenuOne";
import SliderOne from "@/components/Slider/SliderOne";
// import ServiceOne from "@/components/Section/Service/ServiceOne";
// import servicesData from '@/data/service.json'
// import PaymentGatewayOneFirst from "@/components/Section/PaymentGateway/PaymentGatewayOneFirst";
// import CaseStudyOne from "@/components/Section/CaseStudy/CaseStudyOne";
// import PaymentGatewayOneSecond from "@/components/Section/PaymentGateway/PaymentGatewayOneSecond";
// import FaqsOne from "@/components/Section/FAQs/FaqsOne";
import CounterFive from "@/components/Section/Counter/CounterFive";

import ProjectTwo from "@/components/Section/Project/ProjectTwo";
import CaseStudyThree from "@/components/Section/CaseStudy/CaseStudyThree";
import CaseStudyFour from "@/components/Section/CaseStudy/CaseStudyFour";
import caseStudyData from '@/data/case-study.json';
import socialData from '@/data/socialData.json';
import testimonialData from '@/data/testimonialData.json';
import TestimonialFive from "@/components/Section/Testimonial/TestimonialFive";
import FormRequestFive from "@/components/Section/FormRequest/FormRequestFive";
// import blogData from '@/data/blog.json'
// import BlogOne from "@/components/Section/Blog/BlogOne";
import PartnerSix from "@/components/Section/Partner/PartnerSix";
// import Footer from "@/components/Footer/Footer";
import Service from "@/components/Section/Service/Service";
import serviceData from '../../dataApi/services.json';
export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden">
        <header id="header">
          {/* <TopNavOne />
          <MenuOne /> */}
        </header>
        <main className="content">
          <SliderOne />
          {/* <ServiceOne data={servicesData} />
          <PaymentGatewayOneFirst />
          <CaseStudyOne />
          <PaymentGatewayOneSecond />
          <FaqsOne /> */}
          <CounterFive classname="bg-surface rounded-2xl py-8 px-10 lg:mt-[100px] sm:mt-16 mt-10" />
          
          <Service title="Des services qui optimisent votre potentiel numérique" data={serviceData} />
          <ProjectTwo />
          <CaseStudyFour data={socialData} />
          
          {/* <CaseStudyThree data={caseStudyData} /> */}
          <TestimonialFive data={testimonialData} />
          {/* <FormRequestFive /> */}
          

          {/* <BlogOne data={blogData} /> */}
          <PartnerSix classname='bg-blue lg:mt-[100px] sm:mt-16 mt-10' />
        </main>
        <footer id="footer">
          {/* <Footer /> */}
        </footer>
      </div>
    </>
  );
}
