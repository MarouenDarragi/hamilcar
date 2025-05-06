
import infoData from '../../../dataApi/info.json';

// import TopNavOne from "@/components/Header/TopNav/TopNavOne";
// import MenuOne from "@/components/Header/Menu/MenuOne";
import BreadcrumbItem from "@/components/Breadcrumb/BreadcrumbItem";
import CtaOne from "@/components/Section/CTA/CtaOne";
// import Footer from "@/components/Footer/Footer";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import PartnerSix from "@/components/Section/Partner/PartnerSix";

// You might need "use client" if the FORM part requires client-side interaction.
// "use client";

export default function ContactStyleOne() {
  // Data is directly available from the import
  const phone = infoData.phone;
  const email = infoData.email;
  const address = infoData.address;
  const mapUrl = infoData.mapUrl;
  const socialMedia = infoData.socialMedia;

  return (
    <>
      <div className="overflow-x-hidden">
        <header id="header">
          {/* <TopNavOne />
          <MenuOne /> */}
        </header>
        <main className="content">
          <BreadcrumbItem
            link="Contact us"
            img="/images/banner/about1.png"
            title="Contactez-nous"
            desc="Explorez notre page Contactez-nous pour une assistance rapide de notre équipe dédiée."
          />
          <div className="form-contact style-one lg:py-[100px] sm:py-16 py-10">
            <div className="container flex items-center justify-center">
              <div className="xm:w-5/6 w-full flex max-xl:flex-col xl:items-center gap-y-8">
                <div className="w-full xl:w-2/5">
                  <div className="infor bg-blue rounded-xl p-10">
                    <div className="heading5 text-white">Vous voulez nous contacter!</div>
                    <div className="body3 text-white mt-2">
                    Nous vous répondrons dans les 24 heures ou appelez-nous tous les jours.
                    </div>
                    {/* Use data from infoData.socialMedia */}
                    <div className="list-social flex flex-wrap items-center gap-3 md:mt-10 mt-6">
                      <a
                        className="item rounded-full w-12 h-12 flex items-center justify-center bg-surface"
                        href={socialMedia.facebook} // Updated access
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-facebook text-black"></i>
                      </a>
                      <a
                        className="item rounded-full w-12 h-12 flex items-center justify-center bg-surface"
                        href={socialMedia.linkedin} // Updated access
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-in text-black"></i>
                      </a>
                      <a
                        className="item rounded-full w-12 h-12 flex items-center justify-center bg-surface"
                        href={socialMedia.twitter} // Updated access
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-twitter text-sm text-black ml-1"></i>
                      </a>
                      <a
                        className="item rounded-full w-12 h-12 flex items-center justify-center bg-surface"
                        href={socialMedia.instagram} // Updated access
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-insta text-sm text-black"></i>
                      </a>
                      <a
                        className="item rounded-full w-12 h-12 flex items-center justify-center bg-surface"
                        href={socialMedia.youtube} // Updated access
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-youtube text-xs text-black"></i>
                      </a>
                    </div>
                     {/* Use data directly from imported object */}
                    <div className="list-more-infor md:mt-10 mt-6">
                      {/* Removed the "Hours" section as it's not in the new JSON */}
                      {/* <div className="item flex items-center gap-3"> ... </div> */}

                      <div className="item flex items-center gap-3 mt-5"> {/* Removed mt-5 if it was the first item now */}
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full flex-shrink-0">
                          <Icon.Phone
                            weight="fill"
                            className="text-blue text-2xl"
                          />
                        </div>
                        <div className="line-y"> </div>
                        <div className="text-button normal-case text-white">
                          {phone} {/* Updated access */}
                        </div>
                      </div>
                      <div className="item flex items-center gap-3 mt-5">
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full flex-shrink-0">
                          <Icon.EnvelopeSimple
                            weight="bold"
                            className="text-blue text-2xl"
                          />
                        </div>
                        <div className="line-y"> </div>
                        <div className="text-button normal-case text-white">
                           {email} {/* Updated access */}
                        </div>
                      </div>
                      <div className="item flex items-center gap-3 mt-5">
                        <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full flex-shrink-0">
                          <Icon.MapPin
                            weight="bold"
                            className="text-blue text-2xl"
                          />
                        </div>
                        <div className="line-y"> </div>
                        <div className="text-button normal-case text-white">
                          {address} {/* Updated access */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Rest of the form component remains unchanged */}
                <div className="w-full xl:w-3/5 xl:pl-20">
                   {/* ... Form ... */}
                   <form className="form-block flex flex-col justify-between gap-5">
                    <div className="heading">
                      <div className="heading5">Demandez un devis</div>
                      <div className="body3 text-secondary mt-2">
                      Nous vous répondrons dans les 24 heures ou appelez-nous tous les jours.
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="w-full">
                        <input
                          className="w-full bg-surface text-secondary caption1 px-4 py-3 rounded-lg"
                          type="text"
                          placeholder="Nom"
                          required
                        />
                      </div>
                      <div className="w-full">
                        <input
                          className="w-full bg-surface text-secondary caption1 px-4 py-3 rounded-lg"
                          type="text"
                          placeholder="Sujet"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          className="w-full bg-surface text-secondary caption1 px-4 py-3 rounded-lg"
                          type="text"
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <select
                          className="w-full bg-surface text-secondary caption1 pl-3 py-3 rounded-lg"
                          name="form"
                        >
                          <option value="Financial Planning">
                            Audit maturité
                          </option>
                          <option value="Business Planning">
                            Plan d entreprise
                          </option>
                          <option value="Development Planning">
                            Evaluation de la croissance
                          </option>
                        </select>
                        <i className="ph ph-caret-down"></i>
                      </div>
                      <div className="col-span-2 w-full">
                        <textarea
                          className="w-full bg-surface text-secondary caption1 px-4 py-3 rounded-lg"
                          name="message"
                          rows={4}
                          placeholder="Your Message"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="button-block">
                      <button className="button-main hover:border-blue bg-blue text-white text-button rounded-full">
                        Soumettre la demande
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* Use mapUrl from infoData for the iframe src */}
          <iframe
            className="h-[500px] w-full"
            src={mapUrl} // Updated src
            loading="lazy"
          ></iframe>
        </main>

        <footer id="footer">{/* <Footer /> */}</footer>
      </div>
    </>
  );
}
