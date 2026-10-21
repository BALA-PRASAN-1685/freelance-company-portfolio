import { useState, useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  ArrowUpRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Brand palette                                                     */
/*  Midnight Navy #071A3D · Metallic Gold #D4A52C · Pure White       */
/* ------------------------------------------------------------------ */

const NAVY = '#071A3D';
const GOLD = '#D4A52C';
const WHATSAPP_NUMBER = '918074961550';

const goldText: React.CSSProperties = {
  backgroundImage: 'linear-gradient(180deg, #F3D27A 0%, #D4A52C 55%, #8a6a14 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
};

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone / WhatsApp',
    value: '+91 80749 61550',
    href: 'tel:+918074961550',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@btopnexus.com',
    href: 'mailto:info@btopnexus.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: '#contact',
  },
];

const quickSubjects = ['New Website', 'POS System', 'Admin Panel', 'Something Else'];

const inputClass =
  'w-full rounded-xl border bg-[#F7F5EF] px-4 py-3 text-sm text-[#101828] outline-none transition-all placeholder:text-[#101828]/40 focus:bg-white focus:ring-4';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  /* Reveal on scroll */
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

  /* Gold particle network (sized to the section, cleaned up properly) */
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    const createParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 20000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.8 + 0.8,
        opacity: Math.random() * 0.4 + 0.15,
      }));
    };

    const resize = () => {
      canvas.width = section.clientWidth;
      canvas.height = section.clientHeight;
      createParticles();
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
            ctx.strokeStyle = `rgba(212, 165, 44, ${0.16 * (1 - distance / 140)})`;
            ctx.lineWidth = 0.6;
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
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const text = [
      'New project inquiry',
      '',
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Subject: ${formData.subject}`,
      `Message: ${formData.message}`,
    ].join('\n');

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const reveal = (hidden: string) =>
    isVisible ? 'translate-x-0 translate-y-0 opacity-100' : `${hidden} opacity-0`;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ backgroundColor: NAVY }}
    >
      {/* Background glows + particles */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 500px at 0% 0%, rgba(212,165,44,0.20), transparent 60%), radial-gradient(800px 520px at 100% 100%, rgba(212,165,44,0.13), transparent 60%)',
        }}
      />
      <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-12 max-w-2xl transition-all duration-700 lg:mb-16 ${reveal('translate-y-8')}`}
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-10" style={{ backgroundColor: GOLD }} />
            <span
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: GOLD }}
            >
              Start Your Journey
            </span>
          </div>

          <h2 className="mb-5 text-4xl leading-[1.05] sm:text-6xl">
            <span className="font-semibold text-white">Let&apos;s build something</span>
            <br />
            <span className="italic" style={goldText}>
              Extraordinary.
            </span>
          </h2>

          <p className="max-w-md text-sm leading-relaxed sm:text-base" style={{ color: '#F5F3EE', opacity: 0.75 }}>
            Have a project in mind? Send us a message — we&apos;ll reach you
            instantly on WhatsApp.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left column */}
          <div
            className={`space-y-4 transition-all duration-700 lg:col-span-5 ${reveal('-translate-x-8')}`}
            style={{ transitionDelay: '200ms' }}
          >
            {contactInfo.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-center gap-4 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(212,165,44,0.22)',
                }}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-[#D4A52C]"
                  style={{ backgroundColor: 'rgba(212,165,44,0.15)' }}
                >
                  <item.icon
                    className="h-5 w-5 transition-colors duration-300 group-hover:text-[#071A3D]"
                    style={{ color: GOLD }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div
                    className="mb-0.5 text-[11px] uppercase tracking-[0.18em]"
                    style={{ color: '#F5F3EE', opacity: 0.55 }}
                  >
                    {item.label}
                  </div>
                  <div className="truncate font-medium text-white">{item.value}</div>
                </div>

                <ArrowUpRight
                  size={18}
                  className="shrink-0 opacity-40 transition-all duration-300 group-hover:opacity-100"
                  style={{ color: GOLD }}
                />
              </a>
            ))}

            {/* Image card with overlay badge */}
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{ border: '1px solid rgba(212,165,44,0.25)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/contact.jpg"
                alt="Contact"
                className="h-52 w-full object-cover sm:h-60"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(7,26,61,0.92) 0%, rgba(7,26,61,0.35) 55%, transparent 100%)',
                }}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 sm:p-5">
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ backgroundColor: 'rgba(7,26,61,0.8)', color: GOLD }}
                >
                  <span className="relative flex h-2 w-2">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                      style={{ backgroundColor: GOLD }}
                    />
                    <span
                      className="relative inline-flex h-2 w-2 rounded-full"
                      style={{ backgroundColor: GOLD }}
                    />
                  </span>
                  Replies in minutes
                </span>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:gap-3 sm:w-auto"
              style={{ backgroundColor: GOLD, color: NAVY }}
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>
          </div>

          {/* Form card */}
          <div
            className={`transition-all duration-700 lg:col-span-7 ${reveal('translate-x-8')}`}
            style={{ transitionDelay: '350ms' }}
          >
            <form
              onSubmit={handleSubmit}
              className="relative space-y-5 overflow-hidden rounded-3xl bg-white p-6 sm:p-8"
              style={{
                border: '1px solid rgba(212,165,44,0.35)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.40)',
              }}
            >
              {/* Gold top accent */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-1.5"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #8a6a14, #F3D27A, #D4A52C)',
                }}
              />

              <div className="pt-1">
                <h3 className="text-2xl font-bold" style={{ color: NAVY }}>
                  Tell us about your project
                </h3>
                <p className="mt-1 text-sm" style={{ color: '#101828', opacity: 0.6 }}>
                  Fill in the details and we&apos;ll get back to you right away.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em]"
                    style={{ color: NAVY }}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`${inputClass} border-[#071A3D]/10 focus:border-[#D4A52C] focus:ring-[#D4A52C]/20`}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em]"
                    style={{ color: NAVY }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`${inputClass} border-[#071A3D]/10 focus:border-[#D4A52C] focus:ring-[#D4A52C]/20`}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{ color: NAVY }}
                >
                  Subject
                </label>

                {/* Quick pick chips */}
                <div className="mb-2.5 flex flex-wrap gap-2">
                  {quickSubjects.map((subject) => {
                    const active = formData.subject === subject;

                    return (
                      <button
                        key={subject}
                        type="button"
                        onClick={() => setFormData({ ...formData, subject })}
                        className="rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300"
                        style={{
                          backgroundColor: active ? NAVY : 'transparent',
                          color: active ? GOLD : NAVY,
                          borderColor: active ? NAVY : 'rgba(7,26,61,0.18)',
                        }}
                      >
                        {subject}
                      </button>
                    );
                  })}
                </div>

                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`${inputClass} border-[#071A3D]/10 focus:border-[#D4A52C] focus:ring-[#D4A52C]/20`}
                  placeholder="Project inquiry"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{ color: NAVY }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className={`${inputClass} resize-none border-[#071A3D]/10 focus:border-[#D4A52C] focus:ring-[#D4A52C]/20`}
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              <div
                className="flex items-start gap-2.5 rounded-xl p-3 text-xs leading-relaxed"
                style={{ backgroundColor: 'rgba(212,165,44,0.10)', color: '#101828' }}
              >
                <MessageCircle size={16} className="mt-0.5 shrink-0" style={{ color: '#8a6a14' }} />
                <p style={{ opacity: 0.75 }}>
                  When you click send, your message opens directly in WhatsApp so
                  we can reach you instantly.
                </p>
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold transition-all duration-300 hover:gap-3 hover:shadow-[0_12px_30px_rgba(7,26,61,0.35)]"
                style={{ backgroundColor: NAVY, color: GOLD }}
              >
                <Send size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                Send Message via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}