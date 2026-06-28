import React from 'react'
// removed framer-motion to avoid extra dependency
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

const LOGO = '/assets/logo.jpg'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Contact', href: '#contact' },
]



export default function FooterSection() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const navigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-foreground text-background pt-32 pb-8 overflow-hidden">
      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display text-[20vw] font-light text-background/[0.03] whitespace-nowrap">NEXUS</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
            Ready to Start
            <br />
            Your <span className="text-primary">Project</span>?
          </h2>
          <p className="font-body text-lg text-background/50 mt-6 max-w-md mx-auto">
            Let's collaborate and build something extraordinary together.
          </p>
          <a
            href="#contact"
            onClick={(e) => navigate(e, '#contact')}
            className="inline-flex items-center gap-2 mt-8 bg-primary text-primary-foreground px-8 py-4 rounded-full font-body text-sm hover:opacity-90 transition-opacity"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Footer content */}
        <div className="border-t border-background/10 pt-12 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img src={LOGO} alt="BtoP Nexus" className="h-10 w-10 object-contain" />
              <div>
                <span className="font-display text-lg font-semibold">Born to Publish</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-background/40 block -mt-1">Nexus</span>
              </div>
            </div>
            <p className="font-body text-sm text-background/40 max-w-sm leading-relaxed">
              From stunning websites to powerful mobile apps — we bring your ideas to life with innovation, precision and 24/7 support.
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-background/40 mb-4">Navigation</h4>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => navigate(e, link.href)}
                  className="block font-body text-sm text-background/60 hover:text-background transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] text-background/40 mb-4">Connect</h4>
            <div className="space-y-3">
              <a href="tel:+918074961550" className="block font-body text-sm text-background/60 hover:text-background transition-colors">+91 80749 61550</a>
              <a href="mailto:btopnexus@gmail.com" className="block font-body text-sm text-background/60 hover:text-background transition-colors">btopnexus@gmail.com</a>
              <a href="https://wa.me/918074961550" target="_blank" rel="noopener noreferrer" className="block font-body text-sm text-background/60 hover:text-background transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-background/10">
          <span className="font-mono text-[10px] text-background/30">© {new Date().getFullYear()} Born to Publish Nexus. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
