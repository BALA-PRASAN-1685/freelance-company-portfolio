import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  Instagram,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const navigateLinks = [
  { label: 'Home', href: '/home' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const serviceLinks = [
  'Web Development',
  'App Development',
  'UI/UX Design',
  'Digital Marketing',
  'Game Development',
  'Custom Software',
];

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/btopnexus/',
    icon: <Instagram size={18} strokeWidth={1.8} />,
    hoverClass: 'hover:border-pink-400 hover:bg-pink-500/20',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@BTOPNEXUS',
    icon: <Youtube size={18} strokeWidth={1.8} />,
    hoverClass: 'hover:border-red-400 hover:bg-red-500/20',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/b-to-p-nexus-9469a8445/',
    icon: <Linkedin size={18} strokeWidth={1.8} />,
    hoverClass: 'hover:border-blue-400 hover:bg-blue-500/20',
  },
];

const WHATSAPP_URL = 'https://wa.me/918074961550';

const WHATSAPP_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z';

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d={WHATSAPP_PATH} />
    </svg>
  );
}

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative overflow-hidden bg-[#05070f] text-white">
      {/* Top gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(700px 350px at 15% 0%, rgba(139,92,246,0.16), transparent 65%), radial-gradient(700px 350px at 85% 100%, rgba(59,130,246,0.12), transparent 65%)',
        }}
      />

      {/* Background word */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-end justify-center overflow-hidden"
      >
        <span className="font-sora whitespace-nowrap text-[22vw] font-bold leading-none tracking-tight text-white/[0.025]">
          NEXUS
        </span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-20 md:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Main CTA */}
          <Reveal className="lg:col-span-5">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/25 bg-purple-500/10 px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />

              <span className="text-[11px] uppercase tracking-[0.3em] text-purple-200/80">
                Ready to build?
              </span>
            </div>

            <h2 className="font-sora text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl xl:text-6xl">
              Let&apos;s sculpt
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
                your nexus.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/55">
              We create modern websites, mobile apps, digital experiences and
              custom software that help brands grow online.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="font-sora group inline-flex items-center gap-2 rounded-full bg-white py-3.5 pl-6 pr-5 text-sm font-semibold text-[#05070f] transition-all duration-300 hover:bg-purple-500 hover:text-white hover:shadow-lg hover:shadow-purple-500/30"
              >
                Start the conversation

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-3.5 text-sm font-medium text-emerald-200 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-white"
              >
                <WhatsAppIcon size={16} />

                Chat on WhatsApp
              </a>
            </div>
          </Reveal>

          {/* Navigation */}
          <Reveal delay={100} className="lg:col-span-2">
            <h3 className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/40">
              Navigate
            </h3>

            <nav
              aria-label="Footer navigation"
              className="space-y-3"
            >
              {navigateLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group flex items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-purple-300"
                >
                  <span className="h-px w-0 bg-purple-400 transition-all duration-300 group-hover:w-4" />

                  {link.label}
                </Link>
              ))}
            </nav>
          </Reveal>

          {/* Services */}
          <Reveal delay={200} className="lg:col-span-3">
            <h3 className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/40">
              Services
            </h3>

            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="group flex items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-purple-300"
                  >
                    <span className="h-1 w-1 rounded-full bg-purple-500/50 transition-all duration-300 group-hover:bg-purple-400" />

                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Contact */}
          <Reveal delay={300} className="min-w-0 lg:col-span-2">
            <h3 className="mb-5 text-[11px] uppercase tracking-[0.35em] text-white/40">
              Contact
            </h3>

            <div className="space-y-3 text-sm text-white/60">
              <a
                href="mailto:info@btopnexus.com"
                className="flex items-start gap-2 transition-colors duration-200 hover:text-purple-300"
              >
                <Mail
                  size={14}
                  className="mt-1 shrink-0 text-purple-400"
                />

                <span className="break-all">
                  info@btopnexus.com
                </span>
              </a>

              <a
                href="tel:+918074961550"
                className="flex items-center gap-2 transition-colors duration-200 hover:text-purple-300"
              >
                <Phone
                  size={14}
                  className="shrink-0 text-purple-400"
                />

                +91 80749 61550
              </a>

              <span className="flex items-center gap-2 text-white/40">
                <MapPin
                  size={14}
                  className="shrink-0 text-purple-400"
                />

                India
              </span>
            </div>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:text-white ${social.hoverClass}`}
                >
                  {social.icon}
                </a>
              ))}

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-white"
              >
                <WhatsAppIcon />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <span className="text-center text-[11px] tracking-wide text-white/30 sm:text-left">
            © {new Date().getFullYear()} Born To Publish Nexus.
            All rights reserved.
          </span>

          <div className="flex items-center gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
              Crafted with precision · V3.0
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-400 hover:bg-purple-500/20 hover:text-white"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}