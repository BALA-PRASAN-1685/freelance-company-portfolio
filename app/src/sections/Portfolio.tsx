import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

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

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
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

        {/* Featured Project */}
        <div
          className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-3 relative">
              <div className="relative h-64 lg:h-full min-h-[400px]">
                <img
                  src="/assets/skyvalley.jpg"
                  alt="Sky Valley Resort"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-sm font-medium text-gray-900">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live Project
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Hospitality
                </span>
                <span className="text-sm text-gray-500">2026</span>
              </div>

              <h3 className="text-3xl font-playfair text-gray-900 mb-2">Sky Valley Resort</h3>
              <p className="text-sm text-purple-600 mb-4">skyvalleyresort.in</p>

              <p className="text-gray-600 leading-relaxed mb-6">
                A premium resort website built end-to-end — featuring an elegant booking experience, gallery, services, and contact features. Designed to capture the luxury and tranquility of the resort.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {['React', 'Responsive', 'SEO', 'Hospitality'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="https://skyvalleyresort.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700 transition-colors group"
              >
                View Live Project
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}