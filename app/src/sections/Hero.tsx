import { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

      // Draw connections
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

      // Draw particles
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(109, 40, 217, ${particle.opacity})`;
        ctx.fill();

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
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

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="space-y-8">
            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-purple-600" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
                Digital Craftsmanship Studio
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl leading-[1.1]">
              <span className="block text-gray-900">We Build</span>
              <span className="block text-purple-600 italic">Digital</span>
              <span className="block text-gray-900">Experiences</span>
            </h1>

            {/* Subtext */}
            <p className="text-gray-600 text-lg max-w-md leading-relaxed">
              From stunning websites to powerful mobile apps — we bring your ideas to life with innovation, precision and 24/7 support.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('#contact')}
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-all hover:shadow-glow"
              >
                Start Your Project
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('#portfolio')}
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
              >
                View Portfolio
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-2xl font-semibold text-gray-900">1+</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900">24/7</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Support</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900">100%</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            <div className="relative animate-float">
              <img
                src="/assets/asset_1.jpg"
                alt="Digital Portfolio Showcase"
                className="rounded-2xl shadow-2xl max-w-full lg:max-w-[500px] object-cover"
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                <img src="/assets/logo.jpg" alt="BTP logo" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-semibold text-gray-900">Born to Publish</div>
                  <div className="text-[10px] text-gray-500">Nexus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400">
        <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
}
