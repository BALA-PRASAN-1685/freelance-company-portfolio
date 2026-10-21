import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUpRight, Code, Cpu, PenTool, Video } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

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

type Member = {
  name: string;
  role: string;
  icon: LucideIcon;
  description: string;
  featured?: boolean;
};

const team: Member[] = [
  {
    name: 'Shaik Yasin',
    role: 'CTO & UI/UX Architect',
    icon: Cpu,
    description:
      'Leads the technology vision — architecture, engineering standards and the decisions that keep every product fast, secure and scalable.',
    featured: true,
  },
  {
    name: 'Nelluri Prakash Babu',
    role: 'Developer & Tester',
    icon: Code,
    description:
      'Builds the features and tests them end to end, so what we ship is clean, stable and ready for real users.',
  },
  {
    name: 'Ajay Duddlapudi',
    role: 'Logo Designer',
    icon: PenTool,
    description:
      'Shapes simple, beautiful interfaces and smooth user journeys that make every product easy and enjoyable to use.',
  },
  {
    name: 'Bhanuprasad Vakayalapati',
    role: 'Video Editor',
    icon: Video,
    description:
      'Turns raw footage into polished, engaging videos and motion content that tell our clients’ stories.',
  },
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export default function OurFreelancers() {
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
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="freelancers"
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
              'radial-gradient(900px 500px at 90% -10%, rgba(212,165,44,0.20), transparent 60%), radial-gradient(700px 460px at 0% 105%, rgba(212,165,44,0.12), transparent 60%)',
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
                The people behind the work
              </span>
            </div>

            <h2 className="text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
              <span className="font-semibold text-white">Meet our</span>
              <br />
              <span className="italic" style={goldText}>
                Freelancers.
              </span>
            </h2>
          </div>

          <p
            className="max-w-md text-sm leading-relaxed sm:text-base lg:col-span-5 lg:justify-self-end"
            style={{ color: '#F5F3EE', opacity: 0.75 }}
          >
            B To P Nexus —{' '}
            <span className="italic" style={{ color: GOLD }}>
              Born To Publish
            </span>
            . A focused team that turns ideas into polished websites, apps and
            digital experiences.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {team.map((member, index) => {
            const featured = member.featured;
            const Icon = member.icon;

            return (
              <article
                key={member.name}
                className={`group relative flex flex-col overflow-hidden rounded-3xl p-6 transition-all duration-700 hover:-translate-y-2 sm:p-7 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{
                  transitionDelay: `${150 + index * 120}ms`,
                  ...(featured
                    ? {
                        backgroundImage:
                          'linear-gradient(150deg, #F3D27A 0%, #D4A52C 55%, #B8891A 100%)',
                        boxShadow: '0 24px 60px rgba(212,165,44,0.28)',
                      }
                    : {
                        backgroundColor: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(212,165,44,0.22)',
                        boxShadow: '0 24px 60px rgba(0,0,0,0.30)',
                      }),
                }}
              >
                {/* Hover glow (non-featured) */}
                {!featured && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(320px circle at 50% 0%, rgba(212,165,44,0.20), transparent 70%)',
                    }}
                  />
                )}

                {/* Index number */}
                <span
                  className="absolute right-5 top-5 text-xs font-semibold tracking-[0.2em]"
                  style={{ color: featured ? NAVY : GOLD, opacity: featured ? 0.55 : 0.8 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Avatar */}
                <div className="relative mb-6 h-28 w-28">
                  {/* Rotating dashed ring */}
                  <svg
                    aria-hidden
                    viewBox="0 0 120 120"
                    className="absolute inset-0 h-full w-full animate-spin"
                    style={{ animationDuration: '24s' }}
                    fill="none"
                    stroke={featured ? NAVY : GOLD}
                    strokeWidth="1.5"
                    strokeDasharray="3 7"
                  >
                    <circle cx="60" cy="60" r="57" />
                  </svg>

                  <div
                    className="absolute inset-3 flex items-center justify-center rounded-full text-3xl font-bold tracking-wide"
                    style={
                      featured
                        ? { backgroundColor: NAVY, color: GOLD }
                        : {
                            backgroundImage:
                              'linear-gradient(145deg, #0F2C66 0%, #071A3D 100%)',
                            border: '1px solid rgba(212,165,44,0.5)',
                            color: GOLD,
                          }
                    }
                  >
                    {getInitials(member.name)}
                  </div>

                  {/* Role icon badge */}
                  <div
                    className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full"
                    style={
                      featured
                        ? { backgroundColor: '#FFFFFF', color: NAVY }
                        : { backgroundColor: GOLD, color: NAVY }
                    }
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                {/* Role badge */}
                <span
                  className="mb-3 w-fit rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                  style={
                    featured
                      ? { backgroundColor: 'rgba(7,26,61,0.12)', color: NAVY }
                      : { backgroundColor: 'rgba(212,165,44,0.14)', color: GOLD }
                  }
                >
                  {member.role}
                </span>

                <h3
                  className="mb-3 text-xl font-semibold leading-tight"
                  style={{ color: featured ? NAVY : '#FFFFFF' }}
                >
                  {member.name}
                </h3>

                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: featured ? NAVY : '#F5F3EE',
                    opacity: featured ? 0.8 : 0.7,
                  }}
                >
                  {member.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* CTA strip */}
        <div
          className={`mt-8 flex flex-col items-start justify-between gap-5 rounded-3xl p-6 transition-all duration-700 sm:flex-row sm:items-center sm:p-8 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{
            transitionDelay: '700ms',
            backgroundColor: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(212,165,44,0.22)',
          }}
        >
          <p className="text-lg font-semibold text-white sm:text-xl">
            Have an idea?{' '}
            <span className="italic" style={{ color: GOLD }}>
              Let our team build it.
            </span>
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 hover:gap-3"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            Work with our team
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}