import { useEffect, useRef, useState } from 'react';
import { Search, PenTool, Code, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description: 'We deep-dive into your vision, goals, audience, and competitive landscape to build a clear strategic foundation.',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Design',
    description: 'We craft wireframes and visual concepts that translate your brand story into a memorable digital experience.',
  },
  {
    number: '03',
    icon: Code,
    title: 'Development',
    description: 'Our engineers build your product using modern, scalable technologies with rigorous quality assurance.',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch & Support',
    description: 'We deploy your product and provide 24/7 ongoing support to ensure sustained growth and performance.',
  },
];

export default function Process() {
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
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.8 + 0.8,
          opacity: Math.random() * 0.35 + 0.12,
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

          if (distance < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(109, 40, 217, ${0.07 * (1 - distance / 140)})`;
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
    <section id="process" ref={sectionRef} className="relative py-20 bg-white overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-purple-600" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
                How We Work
              </span>
            </div>
            <h2 className="font-playfair text-4xl sm:text-5xl">
              <span className="text-gray-400">The</span>{" "}
              <span className="text-purple-600 italic">Process</span>
            </h2>
          </div>
          <div>
            <p className="text-gray-600 leading-relaxed">
              A refined, four-step methodology that transforms your idea from concept to a live, supported product.
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`text-center transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-purple-600" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-purple-200" />
                )}
              </div>
              <div className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-2">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Process Image */}
        <div
          className={`relative rounded-2xl overflow-hidden transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <img
            src="/assets/ui_files/d0b9cd976_generated_image.png"
            alt="Our Process"
            className="w-full h-64 sm:h-80 object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}