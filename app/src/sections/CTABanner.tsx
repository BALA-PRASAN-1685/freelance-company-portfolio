import { useEffect, useRef, useState } from 'react';

export default function CTABanner() {
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
    <section ref={sectionRef} className="relative py-24 bg-dark overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[200px] sm:text-[300px] font-bold text-white/[0.03] tracking-wider">
          NEXUS
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl mb-4">
            <span className="text-white">Ready to Start</span>
            <br />
            <span className="text-white">Your</span>{" "}
            <span className="text-purple-400 italic">Project?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
            Let's collaborate and build something extraordinary together.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full font-medium hover:bg-purple-700 transition-all hover:shadow-glow-lg animate-pulse-glow"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}
