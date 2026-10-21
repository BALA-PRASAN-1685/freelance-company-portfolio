'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Brand palette                                                     */
/*  Midnight Navy #071A3D · Metallic Gold #D4A52C · Pure White       */
/* ------------------------------------------------------------------ */

type Project = {
  title: string;
  category: string;
  website: string;
  href: string;
  video: string;
  logo: string;
  logoBg: string;
  description: string;
  tags: string[];
};

const projects: Project[] = [
  {
    title: 'Sky Valley Resort',
    category: 'Hospitality',
    website: 'skyvalleyresort.in',
    href: 'https://www.skyvalleyresort.in',
    video: '/assets/Video%20Project%201.mp4',
    logo: '/assets/skyvalley.jpg',
    logoBg: '#9edcf2',
    description:
      'Premium resort website with rooms, pool, restaurant and gaming — backed by a custom admin panel for bookings, orders and operations.',
    tags: ['React', 'Responsive', 'SEO', 'Resort'],
  },
  {
    title: 'Green Valley Food One',
    category: 'Hospitality',
    website: 'greenvalleyfoodone.com',
    href: 'https://www.greenvalleyfoodone.com',
    video: '/assets/video%20project%202.mp4',
    logo: '/assets/greenvalleylogo.png',
    logoBg: '#f0eadc',
    description:
      'Restaurant platform with a modern website, integrated POS and dashboard for orders, billing, menu, inventory and daily operations.',
    tags: ['React', 'Responsive', 'SEO', 'Restaurant'],
  },
  {
    title: 'NGS Infra Developers',
    category: 'Real Estate',
    website: 'ngsinfradevelopers.com',
    href: 'https://www.ngsinfradevelopers.com',
    video: '/assets/video%20project%203.mp4',
    logo: '/assets/ngsinfradeveloperslogo.jpeg',
    logoBg: '#171411',
    description:
      'Real-estate website showcasing plot developments, locations, amenities and investment opportunities with a responsive experience.',
    tags: ['React', 'Responsive', 'SEO', 'Real Estate'],
  },
];

const CARD_WIDTH = 380;
const GAP = 24;

export default function ProjectShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  /* Play the matching video when cursor enters a project card */
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);

    const video = videoRefs.current[index];
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {
      /* Autoplay may be blocked; safe to ignore because video is muted */
    });
  };

  /* Pause and reset video when cursor leaves */
  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);

    const video = videoRefs.current[index];
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  /* Touch devices have no hover: tap the preview to play / stop */
  const handlePreviewTap = (index: number) => {
    if (!window.matchMedia('(hover: none)').matches) return;

    if (hoveredIndex === index) {
      handleMouseLeave(index);
    } else {
      if (hoveredIndex !== null) handleMouseLeave(hoveredIndex);
      handleMouseEnter(index);
    }
  };

  /* Pause all videos when the browser tab is hidden */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoRefs.current.forEach((video) => {
          if (video) video.pause();
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const getStep = () => {
    const firstCard = trackRef.current?.firstElementChild as HTMLElement | null;
    return (firstCard?.offsetWidth ?? CARD_WIDTH) + GAP;
  };

  /* Update carousel arrow and dot state */
  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    setCanScrollLeft(track.scrollLeft > 8);
    setCanScrollRight(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 8
    );

    const firstCard = track.firstElementChild as HTMLElement | null;
    const step = (firstCard?.offsetWidth ?? CARD_WIDTH) + GAP;
    const index = Math.round(track.scrollLeft / step);
    setActiveIndex(Math.max(0, Math.min(index, projects.length - 1)));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    updateScrollState();
    track.addEventListener('scroll', updateScrollState, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener('scroll', updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  const scrollByCard = (direction: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: direction * getStep(),
      behavior: 'smooth',
    });
  };

  const goTo = (index: number) => {
    trackRef.current?.scrollTo({
      left: index * getStep(),
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden py-14 sm:py-20"
      style={{ backgroundColor: '#071A3D' }}
    >
      {/* Soft gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 480px at 12% -10%, rgba(212,165,44,0.16), transparent 60%), radial-gradient(700px 420px at 95% 110%, rgba(212,165,44,0.10), transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5 sm:mb-10">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-8" style={{ backgroundColor: '#D4A52C' }} />
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: '#D4A52C' }}
              >
                Selected Work
              </span>
            </div>

            <h2 className="text-3xl leading-tight sm:text-5xl">
              <span className="font-semibold" style={{ color: '#FFFFFF' }}>
                Featured
              </span>{' '}
              <span className="italic" style={{ color: '#D4A52C' }}>
                Projects
              </span>
            </h2>

            <p
              className="mt-3 max-w-xl text-sm"
              style={{ color: '#F5F3EE', opacity: 0.75 }}
            >
              Hover (or tap) a project to preview it in motion. Scroll sideways
              to explore more.
            </p>
          </div>

          {/* Carousel arrows */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollLeft}
              aria-label="Previous project"
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30 sm:h-11 sm:w-11"
              style={{
                borderColor: 'rgba(212,165,44,0.45)',
                color: '#D4A52C',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(event) => {
                if (!canScrollLeft) return;
                event.currentTarget.style.backgroundColor = '#D4A52C';
                event.currentTarget.style.color = '#071A3D';
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = 'transparent';
                event.currentTarget.style.color = '#D4A52C';
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollRight}
              aria-label="Next project"
              className="flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30 sm:h-11 sm:w-11"
              style={{
                borderColor: 'rgba(212,165,44,0.45)',
                color: '#D4A52C',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(event) => {
                if (!canScrollRight) return;
                event.currentTarget.style.backgroundColor = '#D4A52C';
                event.currentTarget.style.color = '#071A3D';
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.backgroundColor = 'transparent';
                event.currentTarget.style.color = '#D4A52C';
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Project cards */}
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 pt-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {projects.map((project, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <article
                key={project.title}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="group flex w-[82vw] max-w-[380px] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:-translate-y-2 sm:w-[380px]"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: 'rgba(212,165,44,0.25)',
                }}
              >
                {/* Preview / video area (larger) */}
                <div
                  onClick={() => handlePreviewTap(index)}
                  className="relative aspect-[4/4.2] w-full cursor-pointer overflow-hidden sm:aspect-[4/4.4]"
                  style={{ backgroundColor: project.logoBg }}
                >
                  {/* Logo preview */}
                  <div
                    className="absolute inset-0 z-10 flex items-center justify-center p-8 transition-opacity duration-700 sm:p-10"
                    style={{ opacity: isHovered ? 0 : 1 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.logo}
                      alt={`${project.title} logo`}
                      className="max-h-full max-w-full object-contain drop-shadow-[0_18px_36px_rgba(0,0,0,0.25)] transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Hover video preview */}
                  <video
                    ref={(element) => {
                      videoRefs.current[index] = element;
                    }}
                    src={project.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700"
                    style={{ opacity: isHovered ? 1 : 0 }}
                  />

                  {/* Live badge */}
                  <span
                    className="absolute bottom-3 left-3 z-20 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{
                      backgroundColor: 'rgba(7,26,61,0.8)',
                      color: '#D4A52C',
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 animate-pulse rounded-full"
                      style={{ backgroundColor: '#D4A52C' }}
                    />
                    Live Project
                  </span>

                  {/* Gold hover frame */}
                  <div
                    className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ boxShadow: 'inset 0 0 0 3px #D4A52C' }}
                  />
                </div>

                {/* Card details (compact) */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="mb-2 flex items-center gap-3">
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]"
                      style={{
                        backgroundColor: 'rgba(212,165,44,0.15)',
                        color: '#8a6a14',
                      }}
                    >
                      {project.category}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: '#101828', opacity: 0.4 }}
                    >
                      2026
                    </span>
                  </div>

                  <h3
                    className="text-lg leading-tight sm:text-xl"
                    style={{ color: '#101828', fontWeight: 700 }}
                  >
                    {project.title}
                  </h3>

                  <p
                    className="mb-2 text-xs font-medium"
                    style={{ color: '#B8891A' }}
                  >
                    {project.website}
                  </p>

                  <p
                    className="mb-3 line-clamp-3 text-[12.5px] leading-relaxed"
                    style={{ color: '#101828', opacity: 0.7 }}
                  >
                    {project.description}
                  </p>

                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-2.5 py-0.5 text-[10px] font-medium"
                        style={{
                          borderColor: 'rgba(7,26,61,0.15)',
                          color: '#071A3D',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 hover:gap-3"
                    style={{ backgroundColor: '#071A3D', color: '#D4A52C' }}
                  >
                    Visit Website
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to ${project.title}`}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: activeIndex === index ? 28 : 8,
                backgroundColor:
                  activeIndex === index ? '#D4A52C' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}