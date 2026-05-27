import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Shield, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const textEl = textRef.current;
    const dashboardEl = dashboardRef.current;

    if (!section || !textEl || !dashboardEl) return;

    const wordSpans = textEl.querySelectorAll('.about-word');

    const ctx = gsap.context(() => {
      // Set initial state for dashboard card
      gsap.set(dashboardEl, { opacity: 0, x: 100, scale: 0.95, rotateY: -20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      // Highlight manifesto words (reveal to pure black) - only animate opacity
      tl.to(wordSpans, {
        opacity: 1,
        stagger: 0.05,
        duration: 1.2,
      })
      // Slide in dashboard console
      .to(dashboardEl, {
        x: 0,
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 1,
        ease: 'power2.out',
      }, 0.2);

      // Animate diagnostics counters
      tl.fromTo(dashboardEl.querySelectorAll('.stat-counter'), {
        textContent: 0,
      }, {
        textContent: (i, el) => el.getAttribute('data-target'),
        duration: 0.8,
        snap: { textContent: 1 },
        stagger: 0.1,
        ease: 'power1.out',
      }, 0.6);
    }, section);

    // Refresh ScrollTrigger to calculate initial positions correctly
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative h-screen w-full flex items-center justify-center px-6 md:px-12 bg-bg overflow-hidden perspective-1000"
    >
      {/* Light aura overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(8,145,178,0.02),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center gap-6 md:gap-12 z-10">
        
        {/* Tech metadata header line */}
        <div className="flex justify-between items-center w-full border-b border-glass-border pb-4 font-mono text-[8px] text-gray-400">
          <span>SYSTEM_REF // METRIC_INDEX</span>
          <span>LOCATION_REF // 40.7128° N, 74.0060° W</span>
          <span>AUTH // ENTERPRISE_GRADE</span>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left column: Manifesto text */}
          <div className="lg:col-span-7 space-y-4 md:space-y-10 text-left">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary font-mono">01 // The Manifesto</span>
            </div>

            <p 
              ref={textRef} 
              className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-reveal-text"
            >
              {"We believe the future of digital interaction belongs to the bold. By fusing high-end aesthetics with custom, cloud-scale software architectures, we construct bespoke web solutions that command attention, streamline operational throughput, and accelerate enterprise growth. We do not build standard websites. We engineer digital assets that define market leaders."
                .split(/\s+/)
                .map((word, idx) => (
                  <span key={idx} className="about-word opacity-15 inline-block mr-1.5 md:mr-2">
                    {word}
                  </span>
                ))}
            </p>
          </div>

          {/* Right column: Holographic Console Dashboard */}
          <div ref={dashboardRef} className="lg:col-span-5 dashboard-card-gpu">
            <div className="rounded-2xl lg:rounded-3xl glass-panel p-4 md:p-8 space-y-4 md:space-y-6 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border-glass-border-heavy glow-box-purple">
              
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/3 via-accent/3 to-transparent pointer-events-none" />

              {/* Terminal Header */}
              <div className="flex justify-between items-center border-b border-glass-border pb-2 md:pb-4">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-primary animate-pulse" />
                  <span className="text-[9px] uppercase font-black tracking-widest text-gray-500 font-mono">Core OS Console</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/40" />
                </div>
              </div>

              {/* Counters */}
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <div className="p-2.5 md:p-4 rounded-xl md:rounded-2xl glass-panel-light">
                  <div className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest font-black mb-0.5 md:mb-1">Systems Deployed</div>
                  <div className="text-xl md:text-3xl font-black text-gray-900 flex items-baseline">
                    <span className="stat-counter" data-target="180">0</span>
                    <span className="text-primary text-xs ml-0.5">+</span>
                  </div>
                </div>
                <div className="p-2.5 md:p-4 rounded-xl md:rounded-2xl glass-panel-light">
                  <div className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest font-black mb-0.5 md:mb-1">Cloud Uptime</div>
                  <div className="text-xl md:text-3xl font-black text-gray-900 flex items-baseline">
                    <span className="stat-counter" data-target="99">0</span>
                    <span className="text-primary text-xs ml-0.5">.9%</span>
                  </div>
                </div>
                <div className="p-2.5 md:p-4 rounded-xl md:rounded-2xl glass-panel-light">
                  <div className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest font-black mb-0.5 md:mb-1">Design Awards</div>
                  <div className="text-xl md:text-3xl font-black text-gray-900 flex items-baseline">
                    <span className="stat-counter" data-target="25">0</span>
                    <span className="text-primary text-xs ml-0.5">/GOLD</span>
                  </div>
                </div>
                <div className="p-2.5 md:p-4 rounded-xl md:rounded-2xl glass-panel-light">
                  <div className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest font-black mb-0.5 md:mb-1">Conversion Index</div>
                  <div className="text-xl md:text-3xl font-black text-gray-900 flex items-baseline">
                    <span className="stat-counter" data-target="10">0</span>
                    <span className="text-primary text-xs ml-0.5">X</span>
                  </div>
                </div>
              </div>

              {/* Diagnostic logs */}
              <div className="p-2.5 md:p-4 rounded-xl md:rounded-2xl glass-panel-light font-mono text-[8px] md:text-[9px] text-accent/90 space-y-1.5 md:space-y-2 border border-accent/10 hidden sm:block">
                <div className="flex items-center gap-2">
                  <Shield size={10} className="animate-spin-slow" />
                  <span>SECURE CONNECT PROTOCOL ACTIVE</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <RefreshCw size={10} className="animate-pulse" />
                  <span>SYNCING CLOUD CHANNELS... OK</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
