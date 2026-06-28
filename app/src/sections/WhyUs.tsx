import { useEffect, useRef, useState } from 'react';
import { Shield, Clock, Heart, Headphones } from 'lucide-react';

const stats = [
  {
    icon: Shield,
    number: '100%',
    label: 'Test Coverage',
    title: 'Quality Assurance',
    description:
      'Every project is tested rigorously before delivery. We hold ourselves to the highest standards.',
  },
  {
    icon: Clock,
    number: '0',
    label: 'Delays',
    title: 'On-Time Delivery',
    description:
      'We respect deadlines and deliver as promised. Your timeline is sacred to us.',
  },
  {
    icon: Heart,
    number: '100%',
    label: 'Client Satisfaction',
    title: '100% Satisfaction',
    description:
      "Your happiness is our highest priority. We iterate until you're completely satisfied.",
  },
  {
    icon: Headphones,
    number: '24/7',
    label: 'Availability',
    title: '24/7 Stable Support',
    description:
      'Always available whenever you need us. Round-the-clock, without fail.',
  },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
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

  return (
    <section id="why-us" ref={sectionRef} className="relative py-20 overflow-hidden">
      {/* Background Image + softer overlay */}
      <div className="absolute inset-0">
        <img
          src="/assets/cosmic-bg.jpg" // change this image safely
          alt=""
          className="w-full h-full object-cover"
        />
        {/* use slate-900 with ~50–60% opacity instead of very strong bg-dark/70 */}
        <div className="absolute inset-0 bg-slate-900/55" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Card */}
        <div
          className={`max-w-xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass-dark rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-purple-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-400">
                Why Choose Us
              </span>
              <div className="w-8 h-px bg-purple-400" />
            </div>
            <h2 className="font-playfair text-3xl sm:text-4xl">
              <span className="text-white">Trust Built on</span>{' '}
              <span className="text-purple-400 italic">Results</span>
            </h2>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className={`glass-dark rounded-2xl p-6 hover:bg-slate-900/65 transition-all duration-500 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-purple-400">{stat.number}</div>
                  <div className="text-xs uppercase tracking-wider text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{stat.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}