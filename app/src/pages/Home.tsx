import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import Capabilities from '../sections/Capabilities';
import Process from '../sections/Process';
import Portfolio from '../sections/Portfolio';
import OurFreelancers from '../sections/ourfreelancers';
import WhyUs from '../sections/WhyUs';
import Contact from '../sections/Contact';
import CTABanner from '../sections/CTABanner';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <Services />
      <Capabilities />
      <Process />
      <Portfolio />
      <OurFreelancers />
      <WhyUs />
      <Contact />
      <CTABanner />
    </div>
  );
}