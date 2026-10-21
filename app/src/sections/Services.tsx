import { useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  Gamepad2,
  Settings,
  Cloud,
  ShieldCheck,
  Bot,
  Database,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Zap,
} from 'lucide-react';

type Service = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tags: string[];
  accent: string;
  badge: string;
  label: string;
  features: string[];
};

const services: Service[] = [
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'High-performance websites and scalable web applications designed for speed, SEO, and real business growth.',
    tags: ['React', 'Next.js', 'Node.js', 'SEO'],
    accent: 'from-[#D4A52C] to-[#F0C75E]',
    badge: '01',
    label: 'Launch-ready',
    features: [
      'Responsive design for all devices',
      'Fast loading and SEO-friendly pages',
      'Admin dashboards and booking systems',
      'Secure authentication and APIs',
    ],
  },
  {
    icon: Smartphone,
    title: 'App Development',
    description:
      'Modern mobile applications for Android and iOS with smooth performance, clean UI, and reliable backend integration.',
    tags: ['Android', 'iOS', 'Kotlin', 'React Native'],
    accent: 'from-[#D4A52C] to-[#B8891F]',
    badge: '02',
    label: 'User-first',
    features: [
      'Native and cross-platform apps',
      'Push notifications and offline support',
      'API and database integration',
      'Play Store and App Store deployment',
    ],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'Beautiful, intuitive interfaces designed around real user needs, brand identity, and conversion-focused experiences.',
    tags: ['Figma', 'Prototyping', 'Design System'],
    accent: 'from-[#D4A52C] to-[#E8BC47]',
    badge: '03',
    label: 'Brand-led',
    features: [
      'Wireframes and interactive prototypes',
      'Modern design systems',
      'User research and usability testing',
      'Accessible and responsive interfaces',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Digital Marketing',
    description:
      'Data-driven marketing strategies that improve visibility, generate leads, and grow your online presence.',
    tags: ['SEO', 'Social Media', 'Analytics'],
    accent: 'from-[#D4A52C] to-[#C79A22]',
    badge: '04',
    label: 'Growth',
    features: [
      'Search engine optimization',
      'Social media campaigns',
      'Google Ads and performance tracking',
      'Content strategy and reporting',
    ],
  },
  {
    icon: Gamepad2,
    title: 'Game Development',
    description:
      'Engaging games for mobile, web, and desktop platforms with polished gameplay, visuals, and interactive mechanics.',
    tags: ['Unity', 'WebGL', 'Mobile'],
    accent: 'from-[#D4A52C] to-[#F3D27A]',
    badge: '05',
    label: 'Immersive',
    features: [
      '2D and 3D game development',
      'Mobile and browser games',
      'Game UI and level design',
      'Performance optimization',
    ],
  },
  {
    icon: Settings,
    title: 'Custom Software',
    description:
      'Tailored software solutions that automate workflows, manage operations, and solve unique business challenges.',
    tags: ['Automation', 'CRM', 'ERP'],
    accent: 'from-[#D4A52C] to-[#A87C18]',
    badge: '06',
    label: 'Efficient',
    features: [
      'Business process automation',
      'Custom dashboards and reports',
      'Role-based access control',
      'Third-party integrations',
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    description:
      'Reliable cloud infrastructure, deployment pipelines, and monitoring systems that keep applications stable and scalable.',
    tags: ['AWS', 'Docker', 'CI/CD'],
    accent: 'from-[#D4A52C] to-[#E9C25B]',
    badge: '07',
    label: 'Scalable',
    features: [
      'Cloud hosting and deployment',
      'Docker and containerization',
      'Automated CI/CD pipelines',
      'Monitoring and performance optimization',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity',
    description:
      'Security-first development practices that protect applications, user data, and business systems from common threats.',
    tags: ['Security Audit', 'Auth', 'Encryption'],
    accent: 'from-[#D4A52C] to-[#B78A1C]',
    badge: '08',
    label: 'Protected',
    features: [
      'Secure authentication systems',
      'API security and validation',
      'Data encryption',
      'Vulnerability assessment',
    ],
  },
  {
    icon: Bot,
    title: 'AI & Automation',
    description:
      'AI-powered tools, chatbots, and automation systems that reduce manual work and improve decision-making.',
    tags: ['AI', 'Chatbots', 'ML'],
    accent: 'from-[#D4A52C] to-[#F5D78E]',
    badge: '09',
    label: 'Smart',
    features: [
      'AI chatbots and assistants',
      'Image and document processing',
      'Recommendation systems',
      'Workflow automation',
    ],
  },
  {
    icon: Database,
    title: 'Backend & APIs',
    description:
      'Secure, scalable backend systems and REST APIs built to power websites, mobile apps, and internal tools.',
    tags: ['Node.js', 'PostgreSQL', 'REST API'],
    accent: 'from-[#D4A52C] to-[#C19526]',
    badge: '10',
    label: 'Robust',
    features: [
      'REST API development',
      'Database design and optimization',
      'Authentication and authorization',
      'Cloud storage integration',
    ],
  },
];

const whyChooseUs = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description:
      'We follow a structured workflow to deliver quality work within clear timelines.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Solutions',
    description:
      'Security, data privacy, and best practices are built into every project.',
  },
  {
    icon: Sparkles,
    title: 'Modern Design',
    description:
      'We create clean, professional, and conversion-focused digital experiences.',
  },
  {
    icon: CheckCircle2,
    title: 'Reliable Support',
    description:
      'We provide maintenance, improvements, and technical support after launch.',
  },
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
};

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);

  // Reveal on scroll
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const ctx: CanvasRenderingContext2D = context;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId = 0;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      const count = Math.max(
        0,
        Math.floor((canvas.width * canvas.height) / 22000)
      );

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.45 + 0.15,
      }));
    };

    const drawFrame = (animate: boolean) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        if (!a) continue;

        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j];
          if (!b) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(212, 165, 44, ${
              0.12 * (1 - distance / 140)
            })`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const particle of particles) {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 165, 44, ${particle.opacity})`;
        ctx.fill();

        if (animate) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        }
      }
    };

    const loop = () => {
      drawFrame(true);
      animationFrameId = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(animationFrameId);
      resizeCanvas();
      createParticles();

      if (reduceMotion) {
        drawFrame(false);
      } else {
        loop();
      }
    };

    start();

    let resizeObserver: ResizeObserver | null = null;
    const handleResize = () => start();

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#071A3D] py-20"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#D4A52C]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-96 w-96 rounded-full bg-[#D4A52C]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 grid items-end gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px w-8 bg-[#D4A52C]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A52C]">
                What We Do
              </span>
            </div>

            <h2 className="font-playfair text-4xl leading-tight text-white sm:text-5xl">
              Complete
              <br />
              <span className="italic text-[#D4A52C]">Digital Solutions</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70">
              From websites and mobile apps to AI automation, cloud systems, and
              digital marketing — we build complete digital products that help
              businesses grow, work smarter, and deliver better user
              experiences.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#D4A52C] px-6 py-3 text-sm font-semibold text-[#071A3D] shadow-lg shadow-[#D4A52C]/25 transition-all hover:bg-[#E8BC47] hover:shadow-[#D4A52C]/40"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#D4A52C]/50 hover:bg-[#D4A52C]/10 hover:text-[#D4A52C]"
              >
                View Our Work
              </a>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <div className="relative max-w-md overflow-hidden rounded-3xl border border-[#D4A52C]/25 bg-white/5 shadow-2xl shadow-black/40">
              <img
                src="/assets/asset_2.jpg"
                alt="Digital solutions team working on modern products"
                className="h-72 w-full object-cover sm:h-80"
              />

              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#071A3D]/90 via-[#071A3D]/30 to-transparent p-6">
                <p className="text-sm leading-relaxed text-white">
                  We craft end-to-end digital experiences that transform ideas
                  into powerful, scalable products.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const isActive = activeService === service.title;
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: isVisible ? `${index * 80}ms` : '0ms' }}
              >
                <div
                  onMouseEnter={() => setActiveService(service.title)}
                  onMouseLeave={() => setActiveService(null)}
                  onFocus={() => setActiveService(service.title)}
                  onBlur={() => setActiveService(null)}
                  tabIndex={0}
                  className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.25)] outline-none transition-all duration-300 hover:-translate-y-2 hover:border-[#D4A52C]/40 hover:shadow-[0_30px_70px_rgba(212,165,44,0.18)] focus-visible:-translate-y-2 focus-visible:border-[#D4A52C]/60"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${service.accent}`}
                    aria-hidden="true"
                  />

                  <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${service.accent} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
                    aria-hidden="true"
                  />

                  <div className="relative mb-5 flex items-start justify-between gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} text-[#071A3D] shadow-lg shadow-[#D4A52C]/25`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#101828]/40">
                      {service.badge}
                    </span>
                  </div>

                  <div className="relative mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold text-[#101828]">
                      {service.title}
                    </h3>

                    <span className="rounded-full border border-[#D4A52C]/25 bg-[#F5F3EE] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#101828]/70">
                      {service.label}
                    </span>
                  </div>

                  <p className="relative mb-5 text-sm leading-relaxed text-[#101828]/70">
                    {service.description}
                  </p>

                  <div
                    className={`relative overflow-hidden transition-all duration-500 ${
                      isActive
                        ? 'mb-5 max-h-72 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!isActive}
                  >
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-[#101828]/75"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#D4A52C]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#D4A52C]/20 bg-[#F5F3EE] px-2.5 py-1 text-[11px] font-medium text-[#101828]/80 transition-colors group-hover:border-[#D4A52C]/40 group-hover:bg-[#D4A52C]/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why choose us */}
        <div className="mt-24 rounded-[2.5rem] border border-[#D4A52C]/20 bg-[#F5F3EE] p-8 shadow-2xl shadow-black/20 sm:p-12">
          <div className="mb-10 text-center">
            <span className="mb-4 inline-block rounded-full border border-[#D4A52C]/30 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#B8891F]">
              Why Choose Us
            </span>

            <h3 className="font-playfair text-3xl text-[#101828] sm:text-4xl">
              Built for Quality, Speed &amp; Growth
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-[#101828]/70">
              We combine strong design, clean code, modern technology, and
              business thinking to deliver products that actually perform.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => {
              const ItemIcon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-white bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A52C]/30 hover:shadow-xl hover:shadow-[#D4A52C]/15"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#071A3D] text-[#D4A52C] shadow-lg shadow-[#071A3D]/20 transition-colors group-hover:bg-[#D4A52C] group-hover:text-[#071A3D]">
                    <ItemIcon className="h-5 w-5" />
                  </div>

                  <h4 className="mb-2 text-base font-semibold text-[#101828]">
                    {item.title}
                  </h4>

                  <p className="text-sm leading-relaxed text-[#101828]/70">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final CTA */}
        <div className="relative mt-24 overflow-hidden rounded-[2.5rem] border border-[#D4A52C]/20 bg-[#101828] p-8 text-center shadow-2xl shadow-black/40 sm:p-14">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#D4A52C]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[#D4A52C]/10 blur-3xl" />

          <div className="relative">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4A52C]/30 bg-[#D4A52C]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4A52C]">
              <Sparkles className="h-3.5 w-3.5" />
              Let&rsquo;s Build Together
            </span>

            <h3 className="font-playfair text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
              Have a project in mind?
              <br />
              <span className="italic text-[#D4A52C]">
                Let&rsquo;s make it happen.
              </span>
            </h3>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
              Tell us about your idea and our team will get back to you with a
              clear plan, timeline, and the right technology for your goals.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#D4A52C] px-7 py-3.5 text-sm font-semibold text-[#071A3D] shadow-lg shadow-[#D4A52C]/25 transition-all hover:bg-[#E8BC47] hover:shadow-[#D4A52C]/40"
              >
                Get a Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-[#D4A52C]/50 hover:bg-[#D4A52C]/10 hover:text-[#D4A52C]"
              >
                Explore Our Work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}