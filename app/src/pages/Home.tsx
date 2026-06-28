import Navbar from '../sections/Navbar';
import Hero from '../sections/Hero';
import Services from '../sections/Services';
import Portfolio from '../sections/Portfolio';
import Capabilities from '../sections/Capabilities';
import About from '../sections/About';
import Process from '../sections/Process';
import WhyUs from '../sections/WhyUs';
import Contact from '../sections/Contact';
import CTABanner from '../sections/CTABanner';
import Footer from '../sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Capabilities />
      <About />
      <Process />
      <WhyUs />
      <Contact />
      <CTABanner />
      <Footer />
    </div>
  );
}
