import Hero from '../sections/Hero'
import About from '../sections/About'
import Services from '../sections/Services'
import Portfolio from '../sections/Portfolio'
import Capabilities from '../sections/Capabilities'
import Process from '../sections/Process'
import WhyUs from '../sections/WhyUs'
import OurFreelancers from '../sections/ourfreelancers'
import Contact from '../sections/Contact'

export default function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Capabilities />
      <Process />
      <WhyUs />
      <OurFreelancers />
      <Contact />
    </div>
  )
}