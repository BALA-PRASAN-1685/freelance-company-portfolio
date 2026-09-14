import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Sky Valley Resort',
    category: 'Hospitality',
    website: 'skyvalleyresort.in',
    href: 'https://skyvalleyresort.in',
    image: '/assets/skyvalley.jpg',
    imageClassName: 'object-contain p-10 sm:p-16',
    previewClassName: 'bg-[#9edcf2]',
    description:
      'A premium resort website designed to showcase luxury rooms, swimming pool, restaurant, gaming experiences, events and peaceful family getaways near Narasaraopet.',
    tags: ['React', 'Responsive', 'SEO', 'Hospitality'],
  },
  {
    title: 'Green Valley Food One',
    category: 'Hospitality',
    website: 'greenvalleyfoodone.com',
    href: 'https://greenvalleyfoodone.com',
    image: '/assets/greenvalleylogo.png',
    imageClassName: 'object-contain p-8 sm:p-14',
    previewClassName: 'bg-[#f0eadc]',
    description:
      'A modern cafe and restaurant website built to showcase the menu, dining experience, reservations, gallery, services, and hospitality features of Green Valley.',
    tags: ['React', 'Responsive', 'SEO', 'Restaurant'],
  },
  {
    title: 'NGS Infra Developers',
    category: 'Real Estate',
    website: 'ngsinfradevelopers.com',
    href: 'https://ngsinfradevelopers.com',
    image: '/assets/ngsinfradeveloperslogo.jpeg',
    imageClassName: 'object-contain p-8 sm:p-14',
    previewClassName: 'bg-[#171411]',
    description:
      'A professional real-estate website designed to showcase residential plot developments, project information, locations, amenities and investment opportunities with a modern, responsive user experience.',
    tags: ['React', 'Responsive', 'SEO', 'Real Estate'],
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(109, 40, 217, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(109, 40, 217, ${particle.opacity})`;
        ctx.fill();

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    const handleResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-20 bg-gray-50/50 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-purple-600" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
              Selected Work
            </span>
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl">
            <span className="text-gray-900">The Portfolio</span>
            <br />
            <span className="text-purple-600 italic">Archive</span>
          </h2>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={`overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-[0_18px_60px_rgba(72,48,102,0.08)] transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="border-b border-gray-100 px-6 py-5 sm:px-8">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  Live Project
                </span>
              </div>

              <div className="grid lg:grid-cols-5">
                <div className="p-4 sm:p-6 lg:col-span-3 lg:p-8">
                  <div className={`relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-[1.35rem] sm:min-h-[420px] ${project.previewClassName}`}>
                    <div className="absolute inset-x-8 top-5 flex items-center gap-1.5 opacity-60">
                      <span className="h-2 w-2 rounded-full bg-white/70" />
                      <span className="h-2 w-2 rounded-full bg-white/40" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="ml-2 h-4 flex-1 rounded-full bg-white/10" />
                    </div>
                    <img
                      src={project.image}
                      alt={`${project.title} website preview`}
                      className={`mt-8 h-full max-h-[340px] w-full ${project.imageClassName}`}
                    />
                    <span className="absolute bottom-5 left-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50">
                      Website preview
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center px-6 pb-8 sm:px-8 lg:col-span-2 lg:px-10 lg:py-10">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-800">
                      {project.category}
                    </span>
                    <span className="text-sm text-gray-400">2026</span>
                  </div>
                  <h3 className="mb-2 font-playfair text-3xl leading-tight text-gray-900 sm:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mb-5 text-sm font-medium text-purple-600">{project.website}</p>
                  <p className="mb-7 max-w-xl leading-relaxed text-gray-600">{project.description}</p>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-medium text-purple-600 transition-colors hover:text-purple-700"
                  >
                    View Live Project
                    <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}