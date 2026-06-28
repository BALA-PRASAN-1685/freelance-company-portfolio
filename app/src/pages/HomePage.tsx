import Hero from '../sections/Hero'
import Services from '../sections/Services'
import Portfolio from '../sections/Portfolio'
import Capabilities from '../sections/Capabilities'
import About from '../sections/About'
import Process from '../sections/Process'
import WhyUs from '../sections/WhyUs'
import Contact from '../sections/Contact'

export default function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      <Services />
      <Portfolio />
      <Capabilities />
      <About />
      <Process />
      <WhyUs />
      <Contact />
    </div>
  )
}
