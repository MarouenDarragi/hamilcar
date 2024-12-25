// import TopNavOne from "@/components/Header/TopNav/TopNavOne";
// import MenuOne from "@/components/Header/Menu/MenuOne";
import SliderOne from "@/components/Slider/SliderOne";
// import ServiceOne from "@/components/Section/Service/ServiceOne";
// import serviceData from '@/data/service.json'
// import PaymentGatewayOneFirst from "@/components/Section/PaymentGateway/PaymentGatewayOneFirst";
// import CaseStudyOne from "@/components/Section/CaseStudy/CaseStudyOne";
// import PaymentGatewayOneSecond from "@/components/Section/PaymentGateway/PaymentGatewayOneSecond";
// import FaqsOne from "@/components/Section/FAQs/FaqsOne";
import CounterFive from "@/components/Section/Counter/CounterFive";
import serviceData from '@/data/service.json';
import ServiceFive from "@/components/Section/Service/ServiceFive";
import ProjectTwo from "@/components/Section/Project/ProjectTwo";
import caseStudyData from '@/data/case-study.json'
import CaseStudyThree from "@/components/Section/CaseStudy/CaseStudyThree";
import testimonialData from '@/data/testimonial.json';
import TestimonialFive from "@/components/Section/Testimonial/TestimonialFive";
import FormRequestFive from "@/components/Section/FormRequest/FormRequestFive";
// import blogData from '@/data/blog.json'
// import BlogOne from "@/components/Section/Blog/BlogOne";
import PartnerSix from "@/components/Section/Partner/PartnerSix";
// import Footer from "@/components/Footer/Footer";

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
          {/* <ServiceOne data={serviceData} />
          <PaymentGatewayOneFirst />
          <CaseStudyOne />
          <PaymentGatewayOneSecond />
          <FaqsOne /> */}
          <CounterFive classname="bg-surface rounded-2xl py-8 px-10 lg:mt-[100px] sm:mt-16 mt-10" />
          <ServiceFive title="Services that Empower Your Cryptocurrency Trading" data={serviceData} />
          <ProjectTwo />
          <CaseStudyThree data={caseStudyData} />
          <TestimonialFive data={testimonialData} />
          <FormRequestFive />

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
