"use client";

import React from "react";
import ExpertiseItem from "../../Service/ExpertiseItem";
import { ExpertiseType } from "@/type/ExpertiseType";

interface Props {
  data: Array<ExpertiseType>;
}

const Expertise: React.FC<Props> = ({ data }) => {
  return (
    <>
    <section className="service-block lg:mt-[100px] sm:mt-16 mt-10">
      <div className="container items-center justify-center">
        <div className="pl-[72px] w-full flex flex-col gap-4 flex-shrink-0">
        <div className="text-sub-heading2 text-blue">Nos Domaines d&apos;Expertise</div>

          <h3 className="heading3">
          Un partenaire de confiance en transformation numérique
          </h3>
          <div className="body3 text-secondary">
          Nous sommes spécialisés dans les solutions numériques adaptées aux organisations et institutions
          </div>
        </div>
        {/* <div className="w-full xl:pl-[72px] list-service grid lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-8 max-xl:mt-8">
                      {data.filter(item => item.category === 'financial planning').slice(0, 6).map((item, index) => (
                          <ServiceItem data={item} style='style-two' number={index} key={index} />
                      ))}
                  </div> */}
        <div className="w-full xl:pl-[72px] list-service grid lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-8 max-xl:mt-8">
          {data.map((item, index) => (
            <ExpertiseItem data={item} style="style-two" number={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  </>
  );
};

export default Expertise;