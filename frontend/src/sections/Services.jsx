import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Cpu, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const categories = [
    {
      num: 'WS6_NODE_01',
      title: 'Web Solutions & SaaS Dev',
      tagline: 'SYS_CORE // HIGH-TRANSACTION',
      desc: 'We construct high-performance web systems, headless MERN applications, and scalable SaaS dashboards engineered to handle high traffic loads with microsecond response times.',
      features: ['Website Development', 'Web Applications', 'Bespoke SaaS Platforms'],
      icon: Code,
      glow: 'glow-box-purple',
      color: 'from-purple-500/5 to-transparent',
      refCode: 'DEV-NODE-W6',
      borderColor: 'var(--color-primary)',
      shadowColor: 'var(--color-primary-glow)',
    },
    {
      num: 'WS6_NODE_02',
      title: 'AI & Business Automation',
      tagline: 'SYS_AUTOMATE // NEURAL_NET',
      desc: 'We replace manual administrative bottlenecks with autonomous software agents. From custom LLM pipelines to serverless cloud functions, we streamline corporate throughput.',
      features: ['AI Automation Systems', 'Cloud Infrastructure', 'Business Automations'],
      icon: Cpu,
      glow: 'glow-box-blue',
      color: 'from-blue-500/5 to-transparent',
      refCode: 'AI-AUTO-W6',
      borderColor: 'var(--color-secondary)',
      shadowColor: 'var(--color-secondary-glow)',
    },
    {
      num: 'WS6_NODE_03',
      title: 'Branding & Design Systems',
      tagline: 'SYS_GUIDE // IDENT_DESIGN',
      desc: 'We map out cohesive brand guidelines and coordinate high-fidelity interactive design systems. We bridge the gap between luxury aesthetic and conversion psychology.',
      features: ['UI/UX Design Systems', 'Branding Systems', 'Motion Prototypes'],
      icon: Sparkles,
      glow: 'glow-box-cyan',
      color: 'from-cyan-500/5 to-transparent',
      refCode: 'BRAND-ID-W6',
      borderColor: 'var(--color-accent)',
      shadowColor: 'var(--color-accent-glow)',
    },
    {
      num: 'WS6_NODE_04',
      title: 'Digital Growth Engines',
      tagline: 'SYS_GROWTH // ACQUISITION',
      desc: 'We run programmatic SEO indexations and PAID acquisition funnels. We map customer attribution channels to scale enterprise sales and maximize ROI.',
      features: ['SEO Strategy', 'Performance Campaigns', 'Digital Marketing'],
      icon: TrendingUp,
      glow: 'glow-box-purple',
      color: 'from-indigo-500/5 to-transparent',
      refCode: 'MARKET-FUN-W6',
      borderColor: 'var(--color-primary)',
      shadowColor: 'var(--color-primary-glow)',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      // Pin services container and slide track horizontally dynamically
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Perspective card transformations
      const cards = track.querySelectorAll('.console-card');
      cards.forEach((card) => {
        gsap.fromTo(card, 
          { rotateY: 15, scale: 0.93, opacity: 1 },
          {
            rotateY: -15,
            scale: 0.93,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'left right',
              end: 'right left',
              scrub: true,
            }
          }
        );
      });
    }, container);

    // Refresh ScrollTrigger to calculate initial positions correctly
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div id="services" ref={containerRef} className="relative h-screen bg-bg overflow-hidden select-none">
      
      {/* Horizontal slides container track */}
      <div ref={trackRef} className="flex h-screen w-fit items-center flex-nowrap pl-6 md:pl-24 pr-24 md:pr-48">
        
        {/* Intro */}
        <div className="w-[85vw] md:w-[50vw] shrink-0 flex flex-col justify-center pr-12 md:pr-24 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-accent font-mono">02 // Operational Nodes</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-gray-900 leading-none">
            Solutions Built <br />
            To Automate <br />
            <span className="text-gradient-cyan-blue">Scale & Growth</span>
          </h2>
          <p className="text-gray-600 text-sm font-light leading-relaxed max-w-sm">
            Scroll down to navigate through our engineering categories. Each card operates on a dedicated visual plane.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 font-bold uppercase tracking-widest font-mono">
            <span>SWIPE_HORIZ // GRID</span>
            <ArrowRight size={14} className="animate-pulse" />
          </div>
        </div>

        {/* Category console slides loop */}
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="w-[90vw] md:w-[70vw] lg:w-[55vw] shrink-0 px-4 md:px-8"
            >
              <div
                onMouseMove={handleMouseMove}
                className={`console-card relative rounded-3xl glass-panel p-5 md:p-12 overflow-hidden min-h-[360px] sm:min-h-[440px] md:min-h-[480px] flex flex-col justify-between transition-shadow duration-500 ${cat.glow} group`}
                style={{
                  transformStyle: 'preserve-3d',
                  borderColor: cat.borderColor,
                  boxShadow: `0 4px 20px ${cat.shadowColor}`,
                }}
              >
                {/* HUD Corner Ticks */}
                <span className="absolute left-3.5 top-3.5 font-mono text-[8px] text-gray-400 pointer-events-none">+</span>
                <span className="absolute right-3.5 top-3.5 font-mono text-[8px] text-gray-400 pointer-events-none">+</span>
                <span className="absolute left-3.5 bottom-3.5 font-mono text-[8px] text-gray-400 pointer-events-none">+</span>
                <span className="absolute right-3.5 bottom-3.5 font-mono text-[8px] text-gray-400 pointer-events-none">+</span>

                {/* Magnetic Hover Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle 350px at var(--mouse-x, 0px) var(--mouse-y, 0px), var(--mouse-glow), transparent 80%)'
                  }}
                />

                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} blur-3xl rounded-full opacity-50`} />

                {/* Top Section */}
                <div className="flex justify-between items-start">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[9px] font-black tracking-widest text-accent block font-mono">
                      {cat.tagline}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="text-[9px] font-bold text-gray-700 font-mono">
                    {cat.num}
                  </span>
                </div>

                {/* Middle Description */}
                <p className="text-gray-600 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-xl my-4 md:my-6 text-left">
                  {cat.desc}
                </p>

                {/* Bottom Core Features badges & icon */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 md:gap-6 border-t border-glass-border pt-4 md:pt-8">
                  <div className="flex flex-wrap gap-2">
                    {cat.features.map((feat, fidx) => (
                      <span
                        key={fidx}
                        className="px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-full border border-glass-border-heavy bg-glass-bg text-[8px] md:text-[9px] font-bold text-gray-800 hover:border-primary/30 transition-colors duration-300 font-mono"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  {/* Icon Node / Ref Code */}
                  <div className="flex items-center gap-4 text-right">
                    <div className="font-mono text-[8px] text-gray-700 hidden sm:block">
                      <div>SYS_REF: {cat.refCode}</div>
                      <div>STATE: COMP_OK</div>
                    </div>
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-glass-bg border border-glass-border-heavy flex items-center justify-center text-gray-800 group-hover:text-primary shrink-0 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}
