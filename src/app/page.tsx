import { JsonLd } from "@/components/json-ld";
import { homeGraph } from "@/lib/schema";
import { LandingVideo } from "@/components/site/landing-video";
import { Hero } from "@/components/site/hero";
import { ClientMarquee } from "@/components/site/client-marquee";
import { Showreel } from "@/components/site/showreel";
import { ServiceStrip } from "@/components/site/service-strip";
import { About, Assurance, Founders, Vision } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { Why } from "@/components/site/why";
import { Work } from "@/components/site/work";
import { CreativeMarquee } from "@/components/site/creative-marquee";
import { Process } from "@/components/site/process";
import { Stats } from "@/components/site/stats";
import { Testimonials } from "@/components/site/testimonials";
import { Faq } from "@/components/site/faq";
import { Contact } from "@/components/site/contact";

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <Hero />
      <LandingVideo />
      <ClientMarquee />
      <Showreel />
      <ServiceStrip />
      <About />
      <Vision />
      <Assurance />
      <Founders />
      <Services />
      <Why />
      <Work />
      <CreativeMarquee />
      <Process />
      <Stats />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
