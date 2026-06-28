import { useEffect, useRef, useState } from 'react';
import { Lightbulb, Target, Users, Award, MessageCircle, ArrowRight } from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We stay ahead of trends, bringing fresh ideas to every project.',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Every detail matters — we deliver pixel-perfect, polished results.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work closely with clients, treating your vision as our mission.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Quality is non-negotiable. We aim for the best in everything we do.',
  },
];

export default function About() {
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
    <section id="about" ref={sectionRef} className="relative py-20 bg-[#F8F7FC] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-purple-600" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
              The Founder
            </span>
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl">
            <span className="text-gray-900">About</span>{' '}
            <span className="text-purple-600 italic">B To P Nexus</span>
          </h2>
        </div>

        {/* Founder + Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div
            className={`relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden max-w-md">
              <img
                src="/assets/ui_files/ca8a80b10_image.png"
                alt="Bala Prasan Patakamuri"
                className="w-full aspect-[4/5] object-cover"
              />
              {/* softer gradient overlay on image */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/60 via-slate-900/30 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold">Bala Prasan Patakamuri</h3>
                <p className="text-purple-300 text-sm uppercase tracking-wider">Founder & CEO</p>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col justify-center transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm mb-4">
                <img src="/assets/logo.jpg" alt="BTP logo" className="w-8 h-8 rounded-full object-cover" />
                <span className="text-sm font-medium text-gray-900">Our Story</span>
              </div>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                B To P Nexus was founded by{' '}
                <span className="font-semibold text-gray-900">Bala Prasan Patakamuri</span>{' '}
                with a simple yet powerful vision — to bridge the gap between ideas and digital
                products.
              </p>
              <p>
                <span className="font-playfair italic text-purple-600">"Born To Publish"</span>{' '}
                represents our core belief: every great idea deserves to see the light of day.
                Whether it's a website, mobile app, or game, we bring concepts to life with
                cutting-edge technology and creative design.
              </p>
              <p>
                We specialize in freelancing services across web development, app development,
                UI/UX design, and digital marketing — delivering quality solutions that help
                businesses grow in the digital world.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl font-semibold text-purple-600">1+</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">
                  Projects Delivered
                </div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-purple-600">24/7</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">
                  Client Support
                </div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-purple-600">100%</div>
                <div className="text-xs uppercase tracking-wider text-gray-500 mt-1">
                  Satisfaction Rate
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://wa.me/918074961550"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-green-600 transition-colors"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <button
                onClick={() =>
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="inline-flex items-center gap-2 border border-gray-300 text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-white transition-colors"
              >
                Start a Project
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-purple-600" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
              Our Values
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}