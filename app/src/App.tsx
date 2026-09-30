import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Layout from './Layout'
import AboutPage from './pages/AboutPage'
import CapabilitiesPage from './pages/CapabilitiesPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import PortfolioPage from './pages/PortfolioPage'
import ProcessPage from './pages/ProcessPage'
import ServicesPage from './pages/ServicesPage'
import WhyUsPage from './pages/WhyUsPage'
import OurFreelancers from './sections/ourfreelancers'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route element={<Layout><Outlet /></Layout>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/capabilities" element={<CapabilitiesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/process" element={<ProcessPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/freelancers" element={<OurFreelancers />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </>
  )
}
