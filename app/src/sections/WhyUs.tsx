import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import { Shield, Clock, Heart, Headphones, ArrowUpRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Brand palette                                                     */
/*  Midnight Navy #071A3D · Metallic Gold #D4A52C · Pure White       */
/* ------------------------------------------------------------------ */

const NAVY = '#071A3D';
const GOLD = '#D4A52C';

const goldText: CSSProperties = {
  backgroundImage: 'linear-gradient(180deg, #F3D27A 0%, #D4A52C 55%, #8a6a14 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

/* Animated number counter */
function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

/* Card with a gold spotlight that follows the cursor */
function SpotlightCard({
  children,
  className = '',
  style,
  visible,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  visible: boolean;
  delay?: number;
}) {
  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={handleMove}
      className={`group relative overflow-hidden rounded-3xl p-6 transition-all duration-700 hover:-translate-y-1 sm:p-8 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(212,165,44,0.20), transparent 70%)',
        }}
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}

const darkCard: CSSProperties = {
  backgroundColor: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(212,165,44,0.22)',
  boxShadow: '0 24px 60px rgba(0,0,0,0.30)',
};

export default function WhyUs() {
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

  const coverage = useCountUp(100, isVisible);
  const delays = useCountUp(0, isVisible);
  const satisfaction = useCountUp(100, isVisible);

  const ringRadius = 52;
  const ringLength = 2 * Math.PI * ringRadius;

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ backgroundColor: NAVY }}
    >
      {/* Background: grid + gold glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(900px 500px at 10% -10%, rgba(212,165,44,0.20), transparent 60%), radial-gradient(700px 460px at 100% 105%, rgba(212,165,44,0.12), transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-12 grid items-end gap-8 transition-all duration-700 lg:mb-16 lg:grid-cols-12 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-10" style={{ backgroundColor: GOLD }} />
              <span
                className="text-xs font-semibold uppercase tracking-[0.25em]"
                style={{ color: GOLD }}
              >
                Why Choose Us
              </span>
            </div>

            <h2 className="text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
              <span className="font-semibold text-white">Trust built on</span>
              <br />
              <span className="italic" style={goldText}>
                Results.
              </span>
            </h2>
          </div>

          <p
            className="max-w-md text-sm leading-relaxed sm:text-base lg:col-span-5 lg:justify-self-end"
            style={{ color: '#F5F3EE', opacity: 0.75 }}
          >
            Four promises we keep on every project — tested thoroughly,
            delivered on time, refined until you smile, and supported whenever
            you need us.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          {/* 1 · Quality Assurance */}
          <SpotlightCard
            visible={isVisible}
            delay={150}
            className="lg:col-span-7"
            style={darkCard}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: 'rgba(212,165,44,0.15)' }}
              >
                <Shield className="h-6 w-6" style={{ color: GOLD }} />
              </div>
              <span
                className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ backgroundColor: 'rgba(212,165,44,0.12)', color: GOLD }}
              >
                Test Coverage
              </span>
            </div>

            <div className="mb-3 text-7xl font-bold leading-none sm:text-8xl" style={goldText}>
              {coverage}%
            </div>

            <h3 className="mb-2 text-xl font-semibold text-white">Quality Assurance</h3>
            <p className="mb-7 max-w-md text-sm leading-relaxed" style={{ color: '#F5F3EE', opacity: 0.7 }}>
              Every project is tested rigorously before delivery. We hold
              ourselves to the highest standards.
            </p>

            {/* Segmented coverage bar */}
            <div className="mt-auto flex gap-1">
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={i}
                  className="h-2 flex-1 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: isVisible ? GOLD : 'rgba(255,255,255,0.12)',
                    opacity: isVisible ? 1 : 0.4,
                    transitionDelay: `${500 + i * 45}ms`,
                  }}
                />
              ))}
            </div>
          </SpotlightCard>

          {/* 2 · On-Time Delivery (gold card) */}
          <SpotlightCard
            visible={isVisible}
            delay={300}
            className="lg:col-span-5"
            style={{
              backgroundImage: 'linear-gradient(145deg, #F3D27A 0%, #D4A52C 55%, #B8891A 100%)',
              boxShadow: '0 24px 60px rgba(212,165,44,0.25)',
            }}
          >
            {/* Decorative clock */}
            <svg
              aria-hidden
              viewBox="0 0 120 120"
              className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 opacity-20"
              fill="none"
              stroke={NAVY}
              strokeWidth="3"
            >
              <circle cx="60" cy="60" r="54" />
              <line x1="60" y1="60" x2="60" y2="22" strokeLinecap="round" />
              <line
                x1="60"
                y1="60"
                x2="88"
                y2="60"
                strokeLinecap="round"
                className="origin-center animate-spin"
                style={{ animationDuration: '14s', transformOrigin: '60px 60px' }}
              />
            </svg>

            <div
              className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ backgroundColor: NAVY }}
            >
              <Clock className="h-6 w-6" style={{ color: GOLD }} />
            </div>

            <div className="mb-1 text-7xl font-bold leading-none sm:text-8xl" style={{ color: NAVY }}>
              {delays}
            </div>
            <div
              className="mb-6 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: NAVY, opacity: 0.7 }}
            >
              Delays
            </div>

            <h3 className="mb-2 text-xl font-semibold" style={{ color: NAVY }}>
              On-Time Delivery
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: NAVY, opacity: 0.8 }}>
              We respect deadlines and deliver as promised. Your timeline is
              sacred to us.
            </p>
          </SpotlightCard>

          {/* 3 · Client Satisfaction (white card with ring) */}
          <SpotlightCard
            visible={isVisible}
            delay={450}
            className="lg:col-span-5"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid rgba(212,165,44,0.35)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.30)',
            }}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: NAVY }}
              >
                <Heart className="h-6 w-6" style={{ color: GOLD }} />
              </div>
              <span
                className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ backgroundColor: 'rgba(212,165,44,0.15)', color: '#8a6a14' }}
              >
                Client Satisfaction
              </span>
            </div>

            <div className="mb-5 flex items-center gap-5">
              <div className="relative h-28 w-28 shrink-0">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r={ringRadius}
                    fill="none"
                    stroke="rgba(7,26,61,0.08)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={ringRadius}
                    fill="none"
                    stroke={GOLD}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={ringLength}
                    strokeDashoffset={isVisible ? 0 : ringLength}
                    style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1) 0.6s' }}
                  />
                </svg>
                <div
                  className="absolute inset-0 flex items-center justify-center text-2xl font-bold"
                  style={{ color: NAVY }}
                >
                  {satisfaction}%
                </div>
              </div>

              <div>
                <h3 className="mb-1 text-xl font-semibold" style={{ color: NAVY }}>
                  100% Satisfaction
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: NAVY, opacity: 0.7 }}>
                  Your happiness is our highest priority. We iterate until
                  you&apos;re completely satisfied.
                </p>
              </div>
            </div>
          </SpotlightCard>

          {/* 4 · 24/7 Support */}
          <SpotlightCard
            visible={isVisible}
            delay={600}
            className="lg:col-span-7"
            style={darkCard}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: 'rgba(212,165,44,0.15)' }}
              >
                <Headphones className="h-6 w-6" style={{ color: GOLD }} />
              </div>

              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ backgroundColor: 'rgba(212,165,44,0.12)', color: GOLD }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ backgroundColor: GOLD }}
                  />
                  <span
                    className="relative inline-flex h-2 w-2 rounded-full"
                    style={{ backgroundColor: GOLD }}
                  />
                </span>
                Online Now
              </span>
            </div>

            <div className="mb-3 text-7xl font-bold leading-none sm:text-8xl" style={goldText}>
              24/7
            </div>

            <h3 className="mb-2 text-xl font-semibold text-white">24/7 Stable Support</h3>
            <p className="mb-7 max-w-md text-sm leading-relaxed" style={{ color: '#F5F3EE', opacity: 0.7 }}>
              Always available whenever you need us. Round-the-clock, without
              fail.
            </p>

            {/* 24-hour activity bars */}
            <div className="mt-auto flex h-14 items-end gap-1">
              {Array.from({ length: 24 }).map((_, i) => {
                const height = 28 + Math.abs(Math.sin(i * 0.75)) * 72;

                return (
                  <span
                    key={i}
                    className="flex-1 rounded-t-full transition-all duration-700"
                    style={{
                      height: isVisible ? `${height}%` : '8%',
                      backgroundColor: GOLD,
                      opacity: 0.35 + (height / 100) * 0.65,
                      transitionDelay: `${700 + i * 35}ms`,
                    }}
                  />
                );
              })}
            </div>
            <div
              className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.2em]"
              style={{ color: '#F5F3EE', opacity: 0.45 }}
            >
              <span>00:00</span>
              <span>12:00</span>
              <span>24:00</span>
            </div>
          </SpotlightCard>
        </div>

        {/* CTA strip */}
        <div
          className={`mt-8 flex flex-col items-start justify-between gap-5 rounded-3xl p-6 transition-all duration-700 sm:flex-row sm:items-center sm:p-8 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{
            transitionDelay: '800ms',
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(212,165,44,0.22)',
          }}
        >
          <p className="text-lg font-semibold text-white sm:text-xl">
            Ready to build something{' '}
            <span className="italic" style={{ color: GOLD }}>
              exceptional?
            </span>
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:gap-3"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            Start Your Project
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}