import { Fragment, useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────
   Brand Palette (btopnexus.com style guide)
   Midnight Navy  #071A3D  — backgrounds, footer, hero
   Metallic Gold  #D4A52C  — buttons, accents, icons
   Pure White     #FFFFFF  — content, cards, contrast
   Graphite       #101828  — body text, dark panels
   Warm Ivory     #F5F3EE  — soft light backgrounds
   Content source: btopnexus.com — "What We Do" services
────────────────────────────────────────────────────────────── */

const services = [
  {
    label: 'Development',
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
    tags: ['React', 'Node.js', 'SEO'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="10" width="36" height="26" rx="2" />
        <path d="M6 16h36" />
        <path d="M19 23l-5 5 5 5M29 23l5 5-5 5" />
        <path d="M18 42h12M24 36v6" />
      </svg>
    ),
  },
  {
    label: 'Mobile',
    title: 'App Development',
    description: 'Native and cross-platform mobile apps for Android and iOS platforms.',
    tags: ['iOS', 'Android', 'Cross-Platform'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="14" y="6" width="20" height="36" rx="3" />
        <path d="M20 12h8" />
        <circle cx="24" cy="37" r="1.4" fill="currentColor" stroke="none" />
        <path d="M24 20v6M21 23h6" />
      </svg>
    ),
  },
  {
    label: 'Design',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive interfaces that delight users and drive engagement.',
    tags: ['Figma', 'Prototyping', 'Research'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 8l10 10-20 20H10V28L30 8z" />
        <path d="M26 12l10 10" />
        <path d="M10 38h28" />
      </svg>
    ),
  },
  {
    label: 'Growth',
    title: 'Digital Marketing',
    description: 'Strategic campaigns to grow your online presence and reach your audience.',
    tags: ['SEO', 'Social Media', 'Analytics'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22v8l8 2 2 10h4l-2-11 16 6V10L18 20H8v2z" />
        <path d="M38 18c2 2 3 4.5 3 7s-1 5-3 7" />
      </svg>
    ),
  },
  {
    label: 'Interactive',
    title: 'Game Development',
    description: 'Engaging games for mobile and web platforms with immersive experiences.',
    tags: ['Unity', 'WebGL', 'Mobile'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 16h20c6 0 10 5 10 11s-4 11-8 11c-3 0-4-2-6-4h-12c-2 2-3 4-6 4-4 0-8-5-8-11s4-11 10-11z" />
        <path d="M15 22v8M11 26h8" />
        <circle cx="33" cy="23" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="37" cy="28" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Software',
    title: 'Custom Software',
    description: 'Tailored solutions to automate and streamline your business processes.',
    tags: ['API', 'Cloud', 'Automation'],
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="6" />
        <path d="M24 12v-4M24 40v-4M36 24h4M8 24h4M32.5 15.5l2.8-2.8M12.7 35.3l2.8-2.8M32.5 32.5l2.8 2.8M12.7 12.7l2.8 2.8" />
      </svg>
    ),
  },
];

/* Hero metrics from btopnexus.com, plus service breadth */
const stats = [
  { value: 3, suffix: '+', label: 'Projects Shipped' },
  { value: 50, suffix: '+', label: 'Services Offered' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 24, suffix: '/7', label: 'Support & Service' },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  /* Reveal on scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: '#071A3D' }}
    >
      {/* subtle gold glow accents */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,165,44,0.10) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,165,44,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ─────────────────────────────── */}
        <div
          className={`flex items-center gap-3 mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#D4A52C' }} />
          <span
            className="text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: '#D4A52C' }}
          >
            Our core capabilities
          </span>
        </div>

        <h2
          className={`text-3xl sm:text-4xl font-extrabold text-white mb-3 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          Comprehensive{' '}
          <span style={{ color: '#D4A52C' }}>Digital Solutions</span>
        </h2>

        <p
          className="max-w-xl text-sm sm:text-base mb-10 transition-all duration-700"
          style={{
            color: 'rgba(255,255,255,0.6)',
            transitionDelay: '200ms',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          We craft end-to-end digital experiences that transform businesses.
        </p>

        {/* ── Fixed Intro Card + Scrolling Service Cards ─── */}
        <style>{`
          @keyframes capabilities-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .capabilities-track {
            animation: capabilities-scroll 40s linear infinite;
            will-change: transform;
          }
          .capabilities-marquee:hover .capabilities-track,
          .capabilities-marquee:active .capabilities-track {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .capabilities-track { animation: none; }
          }
        `}</style>

        {/* FIX 1: wrapper is now `relative` so the edge fades
            anchor to THIS container, not the whole section */}
        <div className="relative flex items-stretch gap-4">

          {/* ── FIXED "WHAT WE DO" intro card (does NOT scroll) ── */}
          <div
            className={`relative z-20 flex-shrink-0 w-[220px] sm:w-[260px] rounded-2xl flex flex-col justify-center items-start p-7 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ backgroundColor: '#D4A52C' }}
          >
            <h3
              className="text-4xl sm:text-5xl font-extrabold leading-[1.05] tracking-tight"
              style={{ color: '#071A3D' }}
            >
              WHAT
              <br />
              WE DO
            </h3>
            <div className="w-10 h-1 mt-5" style={{ backgroundColor: '#071A3D' }} />
            <p className="mt-5 text-sm font-medium" style={{ color: '#071A3D' }}>
              let see some capabilities . One promise — innovation, precision and 24/7 support.
            </p>
          </div>

          {/* ── SCROLLING service cards marquee ─────────────── */}
          {/* FIX 2: relative + isolated so the gradient overlays
              stay inside the marquee and never cover other elements */}
          <div className="capabilities-marquee relative z-10 flex-1 min-w-0 overflow-hidden">

            {/* left edge fade — anchored to marquee, not section */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10"
              style={{ background: 'linear-gradient(to right, #071A3D, transparent)' }}
            />
            {/* right edge fade */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10"
              style={{ background: 'linear-gradient(to left, #071A3D, transparent)' }}
            />

            <div className="flex gap-4 capabilities-track w-max">
              {[0, 1].map((loop) => (
                <Fragment key={loop}>
                  {services.map((service, index) => (
                    <div
                      key={`${loop}-${service.title}`}
                      className={`group flex-shrink-0 w-[240px] sm:w-[260px] aspect-[3/4] rounded-2xl p-7 flex flex-col justify-between cursor-pointer
                        transition-all duration-500 hover:-translate-y-2
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                      style={{
                        backgroundColor: '#101828',
                        border: '1px solid rgba(212,165,44,0.15)',
                        transitionDelay: `${(index + 1) * 100}ms`,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                      }}
                    >
                      {/* icon */}
                      <div
                        className="w-14 h-14 transition-transform duration-500 group-hover:scale-110"
                        style={{ color: '#D4A52C' }}
                      >
                        {service.icon}
                      </div>

                      {/* text */}
                      <div>
                        <span
                          className="text-[10px] uppercase tracking-[0.2em] block mb-2"
                          style={{ color: 'rgba(212,165,44,0.75)' }}
                        >
                          {service.label}
                        </span>
                        <h3 className="text-white font-semibold text-lg leading-snug">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                          {service.description}
                        </p>

                        {/* tech tags */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{
                                color: '#D4A52C',
                                backgroundColor: 'rgba(212,165,44,0.10)',
                                border: '1px solid rgba(212,165,44,0.25)',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div
                          className="mt-4 h-px w-8 transition-all duration-500 group-hover:w-full"
                          style={{ backgroundColor: '#D4A52C' }}
                        />
                      </div>
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* ── Experience / Metrics Strip ─────────────────── */}
        <div
          className={`mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '700ms' }}
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} start={isVisible} />
          ))}
        </div>

        {/* ── CTA ────────────────────────────────────────── */}
        <div
          className={`mt-12 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '850ms' }}
        >
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>
            From stunning websites to powerful mobile apps — we bring your ideas to life.{' '}
            <button
              onClick={() =>
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="font-semibold hover:underline inline-flex items-center gap-1"
              style={{ color: '#D4A52C' }}
            >
              Want to be next? Let's talk →
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

/* Animated counter card */
function StatCard({
  value,
  suffix,
  label,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame: number;
    const duration = 1600;
    const t0 = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, value]);

  return (
    <div
      className="rounded-2xl p-6 text-center transition-transform duration-500 hover:-translate-y-1"
      style={{
        backgroundColor: 'rgba(16,24,40,0.75)',
        border: '1px solid rgba(212,165,44,0.15)',
      }}
    >
      <div className="text-3xl sm:text-4xl font-extrabold" style={{ color: '#D4A52C' }}>
        {count}
        {suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.55)' }}>
        {label}
      </div>
    </div>
  );
}