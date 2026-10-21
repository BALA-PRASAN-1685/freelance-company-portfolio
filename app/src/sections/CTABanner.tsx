import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Brand palette                                                     */
/*  Midnight Navy #071A3D · Metallic Gold #D4A52C · Pure White       */
/* ------------------------------------------------------------------ */

const NAVY = '#071A3D';
const GOLD = '#D4A52C';

const goldText: React.CSSProperties = {
  backgroundImage: 'linear-gradient(180deg, #F3D27A 0%, #D4A52C 55%, #8a6a14 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

const highlights = ['100% Tested', '0 Delays', '24/7 Support'];

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
      style={{ backgroundColor: NAVY }}
    >
      <div
        className={`relative mx-auto max-w-6xl transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Gradient gold border frame */}
        <div
          className="rounded-[2rem] p-px sm:rounded-[2.5rem]"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(243,210,122,0.9), rgba(212,165,44,0.15) 40%, rgba(212,165,44,0.15) 60%, rgba(243,210,122,0.7))',
          }}
        >
          <div
            className="relative overflow-hidden rounded-[calc(2rem-1px)] px-6 py-14 text-center sm:rounded-[calc(2.5rem-1px)] sm:px-12 sm:py-20"
            style={{
              backgroundImage:
                'radial-gradient(800px 420px at 50% -10%, rgba(212,165,44,0.22), transparent 65%), linear-gradient(180deg, #0B2250 0%, #071A3D 100%)',
            }}
          >
            {/* Background: rotating dashed rings */}
            <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 600 600"
                className="h-[620px] w-[620px] max-w-none animate-spin opacity-30 sm:h-[820px] sm:w-[820px]"
                style={{ animationDuration: '60s' }}
                fill="none"
                stroke={GOLD}
              >
                <circle cx="300" cy="300" r="290" strokeWidth="1" strokeDasharray="4 10" />
                <circle cx="300" cy="300" r="220" strokeWidth="1" strokeDasharray="2 8" opacity="0.7" />
                <circle cx="300" cy="300" r="150" strokeWidth="1" opacity="0.4" />
                <circle cx="300" cy="10" r="5" fill={GOLD} stroke="none" />
                <circle cx="520" cy="300" r="4" fill={GOLD} stroke="none" />
              </svg>
            </div>

            {/* Background: outlined watermark */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
            >
              <span
                className="text-[120px] font-bold leading-none tracking-wider sm:text-[240px]"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(212,165,44,0.14)',
                }}
              >
                NEXUS
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-center gap-3">
                <div className="h-px w-8" style={{ backgroundColor: GOLD }} />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.25em]"
                  style={{ color: GOLD }}
                >
                  Let&apos;s Work Together
                </span>
                <div className="h-px w-8" style={{ backgroundColor: GOLD }} />
              </div>

              <h2 className="mb-5 text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
                <span className="font-semibold text-white">Ready to start</span>
                <br />
                <span className="font-semibold text-white">your</span>{' '}
                <span className="italic" style={goldText}>
                  project?
                </span>
              </h2>

              <p
                className="mx-auto mb-9 max-w-md text-sm leading-relaxed sm:text-base"
                style={{ color: '#F5F3EE', opacity: 0.75 }}
              >
                Let&apos;s collaborate and build something extraordinary
                together.
              </p>

              {/* Buttons */}
              <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold transition-all duration-300 hover:gap-3 hover:shadow-[0_16px_40px_rgba(212,165,44,0.40)] sm:w-auto"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #F3D27A 0%, #D4A52C 55%, #B8891A 100%)',
                    color: NAVY,
                  }}
                >
                  {/* Shine sweep */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/40 transition-all duration-700 group-hover:left-full"
                  />
                  <span className="relative">Get In Touch</span>
                  <ArrowUpRight size={18} className="relative" />
                </button>

                <a
                  href="https://wa.me/918074961550"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 sm:w-auto"
                  style={{ borderColor: 'rgba(212,165,44,0.55)' }}
                >
                  <MessageCircle size={18} style={{ color: GOLD }} />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
                    style={{
                      backgroundColor: 'rgba(212,165,44,0.10)',
                      border: '1px solid rgba(212,165,44,0.25)',
                      color: '#F5F3EE',
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: GOLD }}
                    />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}