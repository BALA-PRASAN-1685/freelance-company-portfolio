import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

/* ------------------------------------------------------------------ */
/*  Brand palette                                                     */
/*  Midnight Navy #071A3D · Metallic Gold #D4A52C · Pure White       */
/*  Font: Sora (menu + buttons) — headings use the serif display font */
/* ------------------------------------------------------------------ */

const NAVY = '#071A3D';
const GOLD = '#D4A52C';

// Same order as the sections on the Home page
const navLinks = [
  { label: 'Home', href: '/home' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Process', href: '/process' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'Our Freelancers', href: '/freelancers' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`font-sora fixed left-0 right-0 top-0 z-50 animate-nav-drop transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 shadow-[0_10px_40px_rgba(7,26,61,0.12)] backdrop-blur-xl'
            : 'bg-white'
        }`}
      >
        {/* Gold hairline at the bottom edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            opacity: isScrolled ? 0.9 : 0.5,
          }}
        />

        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex h-24 items-center justify-between lg:h-40">
            {/* Emblem — large, left side */}
            <Link
              to="/home"
              className="group flex h-full shrink-0 items-center gap-3 py-2"
            >
              <img
                src="/assets/logo.jpg"
                alt="Born to Publish Nexus emblem"
                className="h-14 w-auto object-contain transition-transform duration-500 group-hover:-rotate-1 group-hover:scale-105 lg:h-full"
              />
              {/* Wordmark beside emblem on mobile only */}
              <img
                src="/assets/B to P Nexus Logo.png"
                alt="B to P Nexus"
                className="h-8 w-auto max-w-[150px] object-contain object-left lg:hidden"
              />
            </Link>

            {/* Desktop: wordmark centered on top, nav + CTA on the bottom row */}
            <div className="hidden h-full min-w-0 flex-1 flex-col justify-between py-3 pl-8 lg:flex xl:pl-12">
              {/* Top row — centered wordmark */}
              <div className="flex -translate-x-6 justify-center xl:-translate-x-10">
                <Link to="/home" className="group">
                  <img
                    src="/assets/B to P Nexus Logo.png"
                    alt="B to P Nexus"
                    className="h-20 w-auto max-w-[520px] object-contain transition-transform duration-500 group-hover:scale-105 xl:h-24"
                  />
                </Link>
              </div>

              {/* Bottom row — nav links + CTA */}
              <div className="flex items-center justify-between gap-6">
                <div className="flex min-w-0 items-center gap-4 pl-6 xl:gap-7 xl:pl-12 2xl:gap-9 2xl:pl-20">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.href}
                      to={link.href}
                      className={({ isActive }) =>
                        `group relative whitespace-nowrap py-2 text-[13px] tracking-wide transition-colors duration-300 xl:text-sm 2xl:text-[15px] ${
                          isActive
                            ? 'font-semibold text-[#071A3D]'
                            : 'font-medium text-[#071A3D]/65 hover:text-[#071A3D]'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {link.label}
                          {/* Gold underline: full when active, grows on hover */}
                          <span
                            aria-hidden="true"
                            className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-300 ${
                              isActive ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}
                            style={{
                              backgroundImage: `linear-gradient(90deg, #F3D27A, ${GOLD})`,
                            }}
                          />
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>

                <Link
                  to="/contact"
                  className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(212,165,44,0.40)] xl:px-8 xl:py-3.5"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${NAVY} 0%, #0F2C66 100%)`,
                    color: GOLD,
                    boxShadow: '0 10px 28px rgba(7,26,61,0.30)',
                    border: '1px solid rgba(212,165,44,0.45)',
                  }}
                >
                  {/* Shine sweep */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/20 transition-all duration-700 group-hover:left-full"
                  />
                  <span className="relative">Get Started</span>
                  <ArrowRight
                    size={16}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="rounded-xl p-2.5 text-[#071A3D] transition-all duration-300 hover:bg-[#D4A52C]/15 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-in drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(7,26,61,0.65)' }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm transform bg-white shadow-2xl transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer header */}
          <div
            className="relative flex h-24 items-center justify-between px-6"
            style={{ borderBottom: '1px solid rgba(212,165,44,0.35)' }}
          >
            <div className="flex h-14 items-center gap-3">
              <img
                src="/assets/logo.jpg"
                alt="Born to Publish Nexus emblem"
                className="h-full w-auto object-contain"
              />
              <img
                src="/assets/B to P Nexus Logo.png"
                alt="B to P Nexus logo"
                className="h-8 w-auto max-w-[150px] object-contain object-left"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-xl p-2 text-[#071A3D] transition-colors hover:bg-[#D4A52C]/15"
              aria-label="Close menu"
            >
              <X size={26} />
            </button>
          </div>

          {/* Drawer links */}
          <div className="font-sora h-[calc(100%-6rem)] space-y-1 overflow-y-auto px-6 py-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `relative block rounded-xl px-4 py-3 text-base transition-all duration-300 ${
                    isActive
                      ? 'translate-x-1 bg-[#071A3D]/5 font-semibold text-[#071A3D]'
                      : 'font-medium text-[#071A3D]/70 hover:translate-x-1 hover:bg-[#D4A52C]/10 hover:text-[#071A3D]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full"
                        style={{ backgroundColor: GOLD }}
                      />
                    )}
                    {link.label}
                  </>
                )}
              </NavLink>
            ))}

            <Link
              to="/contact"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full px-5 py-4 text-base font-semibold transition-all duration-300 hover:shadow-[0_14px_34px_rgba(212,165,44,0.35)]"
              style={{
                backgroundImage: `linear-gradient(135deg, ${NAVY} 0%, #0F2C66 100%)`,
                color: GOLD,
                border: '1px solid rgba(212,165,44,0.45)',
              }}
            >
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}