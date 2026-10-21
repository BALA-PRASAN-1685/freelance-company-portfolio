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
            ctx.strokeStyle = `rgba(212, 165, 44, ${0.09 * (1 - distance / 140)})`;
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
        ctx.fillStyle = `rgba(212, 165, 44, ${particle.opacity})`;
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
      id="about"
      ref={sectionRef}
      className="relative py-20 bg-[#071A3D] overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#D4A52C]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A52C]">
              The Founders
            </span>
          </div>
          <h2 className="font-playfair text-4xl sm:text-5xl">
            <span className="text-white">About</span>{' '}
            <span className="text-[#D4A52C] italic">B To P Nexus</span>
          </h2>
        </div>

        {/* Founders + Story */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Founder cards */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Founder — Bala */}
              <div className="relative rounded-2xl overflow-hidden group border border-[#D4A52C]/25">
                <img
                  src="/assets/asset_5.png"
                  alt="Bala Prasan Patakamuri"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#071A3D] via-[#071A3D]/60 to-transparent p-5">
                  <h3 className="text-white text-lg font-semibold">Bala Prasan Patakamuri</h3>
                  <p className="text-[#D4A52C] text-xs uppercase tracking-wider mt-1">
                    Founder & CEO
                  </p>
                </div>
              </div>

              {/* Co-Founder — Akash */}
              <div className="relative rounded-2xl overflow-hidden group border border-[#D4A52C]/25">
                <img
                  src="/assets/akash.jpeg"
                  alt="Nallamalupu Akash Reddy"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#071A3D] via-[#071A3D]/60 to-transparent p-5">
                  <h3 className="text-white text-lg font-semibold">Nallamalupu Akash Reddy</h3>
                  <p className="text-[#D4A52C] text-xs uppercase tracking-wider mt-1">
                    Co-Founder & CEO
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Story */}
          <div
            className={`flex flex-col justify-center transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F3EE] rounded-xl shadow-sm mb-4">
                <img
                  src="/assets/logo.jpg"
                  alt="BTP logo"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-[#101828]">Our Story</span>
              </div>
            </div>

            <div className="space-y-4 leading-relaxed text-[#F5F3EE]/80">
              <p>
                B To P Nexus was founded by{' '}
                <span className="font-semibold text-white">Bala Prasan Patakamuri</span> with a
                simple yet powerful vision: to bridge the gap between ideas and digital products.
                As co-founder,{' '}
                <span className="font-semibold text-white">Nallamalupu Akash Reddy</span> helps
                bring that vision to life through thoughtful collaboration and a commitment to
                quality.
              </p>
              <p>
                <span className="font-playfair italic text-[#D4A52C]">Born To Publish</span> is
                our belief that every great idea deserves to see the light of day. From websites
                and mobile apps to games, we turn concepts into polished digital experiences with
                creative design and modern technology.
              </p>
              <p>
                Our team delivers web and app development, UI/UX design, and digital marketing
                services that help businesses grow in the digital world.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl font-semibold text-[#D4A52C]">3+</div>
                <div className="text-xs uppercase tracking-wider text-[#F5F3EE]/60 mt-1">
                  Projects Delivered
                </div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-[#D4A52C]">24/7</div>
                <div className="text-xs uppercase tracking-wider text-[#F5F3EE]/60 mt-1">
                  Client Support
                </div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-[#D4A52C]">100%</div>
                <div className="text-xs uppercase tracking-wider text-[#F5F3EE]/60 mt-1">
                  Satisfaction Rate
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://wa.me/918074961550"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D4A52C] text-[#071A3D] px-6 py-3 rounded-full font-semibold hover:bg-[#b98d21] transition-colors"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <button
                onClick={() =>
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
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
            <div className="w-8 h-px bg-[#D4A52C]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A52C]">
              Our Values
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`bg-[#101828] border border-[#D4A52C]/20 rounded-2xl p-6 hover:border-[#D4A52C]/60 hover:shadow-[0_12px_40px_rgba(212,165,44,0.15)] hover:-translate-y-1 transition-all duration-300 ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-[#D4A52C]/15 flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-[#D4A52C]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-[#F5F3EE]/70 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services strip — full software development */}
        <div
          className={`mt-16 rounded-2xl bg-[#F5F3EE] p-8 sm:p-10 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#D4A52C]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#071A3D]">
              What We Build
            </span>
          </div>
          <p className="text-[#101828] leading-relaxed max-w-4xl mb-6">
            From idea to launch, we handle{' '}
            <span className="font-semibold text-[#071A3D]">end-to-end software development</span>{' '}
            — web applications, mobile apps (Android & iOS), desktop software, games, e-commerce
            platforms, SaaS products, APIs & backend systems, cloud deployment, and ongoing
            maintenance — plus UI/UX design and digital marketing to help your product grow.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              'Web Development',
              'Mobile Apps',
              'Desktop Software',
              'Game Development',
              'E-Commerce',
              'SaaS Products',
              'UI/UX Design',
              'API & Backend',
              'Cloud & DevOps',
              'Digital Marketing',
            ].map((service) => (
              <span
                key={service}
                className="px-4 py-2 rounded-full bg-white border border-[#071A3D]/10 text-sm font-medium text-[#071A3D] hover:border-[#D4A52C] hover:text-[#D4A52C] transition-colors cursor-default"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}