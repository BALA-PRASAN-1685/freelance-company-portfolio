import { useEffect, useRef, useState } from 'react';
import { Search, PenTool, Code, Rocket, ArrowUpRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description:
      'We deep-dive into your vision, goals, audience, and competitive landscape to build a clear strategic foundation.',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Design',
    description:
      'We craft wireframes and visual concepts that translate your brand story into a memorable digital experience.',
  },
  {
    number: '03',
    icon: Code,
    title: 'Development',
    description:
      'Our engineers build your product using modern, scalable technologies with rigorous quality assurance.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Support',
    description:
      'We deploy your product and provide 24/7 ongoing support to ensure sustained growth and performance.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------- Cursor emotion: gold spotlight + parallax numbers ---------- */
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(212, 165, 44, 0.14), transparent 70%)`;

    const rx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ry = (e.clientY / window.innerHeight - 0.5) * 2;
    numberRefs.current.forEach((el, i) => {
      if (!el) return;
      const depth = (i % 2 === 0 ? 1 : -1) * 8;
      el.style.transform = `translate3d(${rx * depth}px, ${ry * depth}px, 0)`;
    });
  };

  const handleMouseLeave = () => {
    numberRefs.current.forEach((el) => {
      if (el) el.style.transform = 'translate3d(0, 0, 0)';
    });
  };

  return (
    <section
      id="process"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-24 bg-[#F5F3EE] overflow-hidden"
    >
      {/* Cursor spotlight layer */}
      <div ref={glowRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Decorative gold accents */}
      <div className="absolute top-0 right-0 w-28 h-6 bg-[#D4A52C]" />
      <div className="absolute top-24 right-0 bottom-24 w-1 bg-[#D4A52C]/50" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-2 border-[#D4A52C] rotate-45 opacity-60" />
      <div className="absolute top-40 left-10 w-3 h-3 bg-[#D4A52C]/25 rotate-45 hidden lg:block" />

      {/* Full-width container — no max-w-5xl */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-6 items-end mb-16 sm:mb-24">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A52C]">
              How We Work
            </span>
            <h2 className="mt-4 text-5xl sm:text-6xl font-extrabold text-[#071A3D] leading-tight">
              The{' '}
              <span className="font-playfair italic font-bold text-[#D4A52C]">
                Process.
              </span>
            </h2>
          </div>
          <p className="text-[#101828]/70 leading-relaxed lg:text-right lg:pl-12">
            A refined, four-step methodology that transforms your idea from
            concept to a live, supported product.
          </p>
        </div>

        {/* Timeline — full width */}
        <div className="relative mb-20">
          {/* Vertical center line (center of the full screen) */}
          <div className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-[#071A3D]/15 hidden md:block" />

          {steps.map((step, index) => {
            const numberOnLeft = index % 2 === 0;
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 items-center py-10 transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Node dot on the line */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-[#D4A52C] bg-white items-center justify-center z-10 transition-transform duration-300 hover:scale-125 shadow-[0_0_0_6px_rgba(212,165,44,0.12)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4A52C]" />
                </div>

                {/* Big number */}
                <div
                  className={`text-center ${
                    numberOnLeft
                      ? 'md:text-right md:pr-24'
                      : 'md:order-2 md:text-left md:pl-24'
                  }`}
                >
                  <span
                    ref={(el) => {
                      numberRefs.current[index] = el;
                    }}
                    className={`inline-block text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight transition-transform duration-300 ease-out will-change-transform ${
                      index % 2 === 0 ? 'text-[#071A3D]' : 'text-[#D4A52C]'
                    }`}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div
                  className={`text-center md:text-left ${
                    numberOnLeft
                      ? 'md:pl-24'
                      : 'md:order-1 md:text-right md:pr-24'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 mb-2 justify-center ${
                      numberOnLeft ? 'md:justify-start' : 'md:justify-end'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-[#D4A52C]" />
                    <h3 className="text-xl font-bold text-[#071A3D]">
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className={`text-sm text-[#101828]/60 leading-relaxed max-w-md ${
                      numberOnLeft ? 'md:mx-0 mx-auto' : 'md:mr-0 md:ml-auto mx-auto'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Image — asset_6.jpg, full width */}
        <div
          className={`relative -mx-6 sm:-mx-10 lg:-mx-16 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative overflow-hidden group">
            <img
              src="/assets/asset_6.jpg"
              alt="Our Process"
              className="w-full h-72 sm:h-96 lg:h-[28rem] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071A3D]/80 via-[#071A3D]/25 to-transparent" />

            {/* Gold caption */}
            <div className="absolute bottom-6 left-6 sm:left-10 lg:left-16 flex items-center gap-3">
            </div>

            {/* Gold corner badge */}
            <div className="absolute top-6 right-6 sm:right-10 lg:right-16 w-10 h-10 rounded-full border border-[#D4A52C]/60 bg-[#071A3D]/40 backdrop-blur-sm flex items-center justify-center text-[#D4A52C] transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}