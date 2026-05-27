import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Terminal, Globe, Award } from 'lucide-react';
import useMagnetic from '../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const widgetsRef = useRef(null);
  const subtitleRef = useRef(null);

  // Magnetic refs
  const button1Ref = useMagnetic(0.2);
  const button2Ref = useMagnetic(0.25);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const widgets = widgetsRef.current;
    const subtitle = subtitleRef.current;

    if (!container || !title || !widgets || !subtitle) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(title, {
        scale: 0.92,
        opacity: 0.25,
        z: -100,
        filter: 'blur(10px)',
        duration: 1,
      })
      .to(widgets.querySelectorAll('.widget-item'), {
        x: (i) => (i % 2 === 0 ? -120 : 120),
        opacity: 0,
        duration: 0.8,
      }, 0)
      .to(subtitle, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
      }, 0.5);
    }, container);

    // Refresh ScrollTrigger to calculate initial positions correctly
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, []);

  const handleScrollNext = (e) => {
    e.preventDefault();
    const nextSection = document.querySelector('#about');
    if (nextSection) {
      window.lenis ? window.lenis.scrollTo(nextSection) : nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSkipIntro = (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      window.lenis ? window.lenis.scrollTo(contactSection) : contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-12 py-24 select-none"
    >
      {/* Cyber Viewfinder HUD corner brackets */}
      <span className="absolute left-6 top-6 w-3.5 h-3.5 border-l border-t border-glass-border-heavy pointer-events-none" />
      <span className="absolute right-6 top-6 w-3.5 h-3.5 border-r border-t border-glass-border-heavy pointer-events-none" />
      <span className="absolute left-6 bottom-6 w-3.5 h-3.5 border-l border-b border-glass-border-heavy pointer-events-none" />
      <span className="absolute right-6 bottom-6 w-3.5 h-3.5 border-r border-b border-glass-border-heavy pointer-events-none" />

      {/* Cyber status console logs */}
      <div className="absolute bottom-8 left-8 font-mono text-[8px] text-gray-500 text-left space-y-1 hidden md:block">
        <div>[core_engine]: SaaS_STABLE</div>
        <div className="text-primary">[cloud_capacity]: load_balanced // node_01</div>
        <div>[seo_indexing]: programmatic // rank_ok</div>
      </div>
      
      <div className="absolute bottom-8 right-8 font-mono text-[8px] text-gray-500 hidden md:block">
        <span>LAT_COORD // 40.7128° N, 74.0060° W</span>
      </div>

      {/* Soft background aura */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(124,58,237,0.03),transparent_60%)] pointer-events-none" />

      {/* Floating Parallax Widgets */}
      <div ref={widgetsRef} className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
        
        {/* Widget 1: SaaS Engine */}
        <div className="widget-item absolute top-[28%] left-[8%] p-4 rounded-2xl glass-panel flex items-center gap-4 animate-float-slow">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Terminal size={16} />
          </div>
          <div>
            <div className="text-[9px] text-gray-400 uppercase tracking-widest font-bold font-mono">SaaS Engine</div>
            <div className="text-[11px] font-bold text-gray-900 font-mono">Uptime // 99.9%</div>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        </div>

        {/* Widget 2: Cloud scale */}
        <div 
          className="widget-item absolute top-[35%] right-[8%] p-4 rounded-2xl glass-panel flex items-center gap-4 animate-float-slow"
          style={{ animationDelay: '1.5s' }}
        >
          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
            <Award size={16} />
          </div>
          <div>
            <div className="text-[9px] text-gray-400 uppercase tracking-widest font-bold font-mono">Cloud Scale</div>
            <div className="text-[11px] font-bold text-gray-900 font-mono">AWS Node // 12 Reg</div>
          </div>
        </div>

        {/* Widget 3: Conversion metric */}
        <div 
          className="widget-item absolute bottom-[25%] left-[12%] p-4 rounded-2xl glass-panel flex items-center gap-4 animate-float-slow"
          style={{ animationDelay: '2.5s' }}
        >
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
            <Globe size={16} />
          </div>
          <div>
            <div className="text-[9px] text-gray-400 uppercase tracking-widest font-bold font-mono">Conversions</div>
            <div className="text-[11px] font-bold text-gray-900 font-mono">Growth Index // +42%</div>
          </div>
        </div>

      </div>

      {/* Hero Content */}
      <div className="relative max-w-6xl mx-auto text-center z-20 flex flex-col items-center justify-center">
        
        {/* Main Pinned Title (Stage 1) */}
        <div ref={titleRef} className="space-y-6 md:space-y-8 flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-glass-border bg-glass-bg backdrop-blur-sm shadow-sm font-mono text-[9px]">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-gray-600 font-bold">Premium Digital Solutions</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none text-gray-900">
            Transforming Brands <br />
            <span className="text-gradient-purple-blue">Through Technology</span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed px-4">
            We construct high-performance web solutions, custom SaaS architectures, and automated growth systems for forward-thinking enterprises.
          </p>

        </div>

        {/* Revealed Subtitle (Stage 2) */}
        <div 
          ref={subtitleRef}
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0 pointer-events-none translate-y-16 scale-95 space-y-6 z-30"
        >
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-gradient-cyan-blue leading-none">
            Scale Your Business Autopilot
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm max-w-md font-light leading-relaxed text-center px-6">
            Explore our engineering categories. Scroll down to trigger our modular design systems, custom backend platforms, and cloud growth configurations.
          </p>

          <div className="flex items-center gap-4 pt-4 pointer-events-auto">
            <button
              ref={button1Ref}
              onClick={handleScrollNext}
              className="px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 group shadow-[0_4px_20px_rgba(168,85,247,0.3)] cursor-pointer font-mono"
            >
              Analyze Stack 
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              ref={button2Ref}
              onClick={handleSkipIntro}
              className="px-6 py-3 rounded-full border border-glass-border-heavy bg-glass-bg hover:bg-glass-bg-heavy text-gray-900 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer font-mono"
            >
              Skip Intro
            </button>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-35"
        onClick={handleScrollNext}
      >
        <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold font-mono">Scroll Down</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gray-600 to-transparent" />
      </div>

    </section>
  );
}
