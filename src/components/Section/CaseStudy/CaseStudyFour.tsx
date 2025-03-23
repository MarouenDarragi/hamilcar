import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import CaseStudyItem from "@/components/CaseStudy/CaseStudyItem";
import socialData from "@/data/socialData.json";
import { CaseStudyType } from "@/type/CaseStudyType";

interface Props {
  data: Array<CaseStudyType>;
}

const CaseStudyFour = ({ data }: Props) => {
  return (
    <>
      <section className="case-study-block style-four lg:py-[100px] sm:py-16 py-10">
        <div className="container">
          <div className="heading flex items-center justify-between gap-5 flex-wrap">
            <h3 className="heading3">Engagement social</h3>

            <Link
              className="text-button underline hover:text-success duration-300"
              href="/social"
            >
              Voir tous
            </Link>
          </div>
          <div className="body3 text-secondary lg:mt-5 mt-3">
            Notre implication est à la fois locale et internationale. Chez
            Hamilcar, nous sommes profondément engagés à avoir un impact positif
            sur la société.
            <br className="max-md:hidden" />
            Notre engagement social se manifeste à plusieurs niveaux :{" "}
          </div>
          <div className="list-case-study grid lg:grid-cols-3 md:grid-cols-2 gap-8 md:mt-10 mt-6">
            {data.slice(0, 3).map((item, index) => (
              <CaseStudyItem data={item} key={index} style="style-one" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default CaseStudyFour;
