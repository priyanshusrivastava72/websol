import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import useMagnetic from '../hooks/useMagnetic';
import proj1Img from '../assets/ChatGPT Image May 26, 2026, 01_16_30 PM.webp';
import proj2Img from '../assets/ChatGPT Image May 26, 2026, 02_00_54 PM.webp';
import proj3Img from '../assets/ChatGPT Image May 27, 2026, 12_37_15 PM.webp';
import proj4Img from '../assets/ChatGPT Image May 26, 2026, 02_50_30 PM.webp';

gsap.registerPlugin(ScrollTrigger);

// Standalone Sub-Component to follow React Rules of Hooks
function ProjectPanel({ proj, idx }) {
  const arrowRef = useMagnetic(0.3);
  return (
    <div
      className="project-panel absolute inset-0 w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        zIndex: idx + 1,
        clipPath: idx === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
      }}
    >
      {/* Background Image */}
      <div
        className="panel-bg absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${proj.img})`,
          transform: 'scale(1.1)',
        }}
      />

      {/* Dark mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85" />
      
      {/* HUD cyber grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:6rem_6rem]" />

      {/* Viewfinder ticks on fullscreen image */}
      <span className="absolute left-6 top-6 w-3.5 h-3.5 border-l border-t border-white/20 pointer-events-none" />
      <span className="absolute right-6 top-6 w-3.5 h-3.5 border-r border-t border-white/20 pointer-events-none" />
      <span className="absolute left-6 bottom-6 w-3.5 h-3.5 border-l border-b border-white/20 pointer-events-none" />
      <span className="absolute right-6 bottom-6 w-3.5 h-3.5 border-r border-b border-white/20 pointer-events-none" />

      {/* Vertical Tech HUD labels */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 font-mono text-[8px] text-white/30 text-left hidden lg:block space-y-3 pointer-events-none">
        <div>RENDER_ZOOM // 1.05</div>
        <div>BUFF_GL_SCALE // MAX</div>
        <div>GRID_NODE: WS6_CASE_0{idx + 1}</div>
      </div>

      <div className="absolute top-1/2 right-8 -translate-y-1/2 font-mono text-[8px] text-white/30 text-right hidden lg:block space-y-1 pointer-events-none">
        <div>GPS_REF: {proj.gps}</div>
        <div>SSL: CONNECT_ESTABLISHED</div>
      </div>

      {/* Foreground Content */}
      <div 
        className="panel-content max-w-7xl mx-auto w-full px-6 md:px-12 flex flex-col justify-between h-[75vh] relative z-20"
      >
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/5 pb-4 md:pb-6">
          <div className="flex items-center gap-4">
            <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/10 backdrop-blur-xs text-[9px] uppercase font-bold tracking-widest text-primary font-mono">
              {proj.category}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 font-mono">
              Case // 0{idx + 1}
            </span>
          </div>
          <div className="text-sm font-bold text-gray-300 font-mono">{proj.year}</div>
        </div>

        {/* Bottom Details */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
          <div className="space-y-3 text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-gray-400 font-mono">
              Client &mdash; <span className="text-white font-sans">{proj.client}</span>
            </span>
            <h3 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
              {proj.title}
            </h3>
          </div>

          {/* Link */}
          <a
            ref={arrowRef}
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-white/10 bg-white/5 backdrop-blur-xs flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.02)] cursor-pointer self-start md:self-auto shrink-0 group"
            data-cursor="OPEN"
          >
            <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
          </a>
        </div>

      </div>

    </div>
  );
}

export default function Projects() {
  const containerRef = useRef(null);
  
  const projects = [
    {
      title: 'Vardha FMCG Distribution Platform',
      client: 'Vardha Group',
      category: 'FMCG / Business',
      year: '2026',
      img: proj1Img,
      gps: '28.6139° N, 77.2090° E',
      link: 'https://fmcg.vardha.live',
    },
    {
      title: 'Startup Cafe',
      client: 'Startup Cafe',
      category: 'Co-Working Space',
      year: '2026',
      img: proj2Img,
      gps: '19.0760° N, 72.8777° E',
      link: 'https://startupcafe.co.in',
    },
    {
      title: 'Arun Gupta',
      client: 'Arun Gupta',
      category: 'Business Coaching',
      year: '2026',
      img: proj3Img,
      gps: '12.9716° N, 77.5946° E',
      link: 'https://arunlive.com',
    },
    {
      title: 'Vardha Builder & Developer',
      client: 'Vardha Builder',
      category: 'Real Estate / Property',
      year: '2026',
      img: proj4Img,
      gps: '22.5726° N, 88.3639° E',
      link: 'https://vardha.live',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const panels = container.querySelectorAll('.project-panel');

    const ctx = gsap.context(() => {
      // Set initial state for desktop & mobile clip paths
      panels.forEach((panel, index) => {
        const bgImg = panel.querySelector('.panel-bg');
        const content = panel.querySelector('.panel-content');
        if (index > 0) {
          gsap.set(panel, { clipPath: 'inset(100% 0% 0% 0%)' });
        } else {
          gsap.set(panel, { clipPath: 'inset(0% 0% 0% 0%)' });
          gsap.set(content, { opacity: 0, y: 40 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: `+=${panels.length * 150}%`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, index) => {
        const bgImg = panel.querySelector('.panel-bg');
        const content = panel.querySelector('.panel-content');

        if (index > 0) {
          tl.fromTo(panel, 
            { clipPath: 'inset(100% 0% 0% 0%)', scale: 0.9 },
            { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.2, ease: 'none' }
          )
          .fromTo(bgImg,
            { scale: 1.2 },
            { scale: 1.0, duration: 1.2, ease: 'none' },
            `-=${1.2}`
          )
          .fromTo(content,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            `-=${0.5}`
          );
        } else {
          tl.to(bgImg, { scale: 1.05, duration: 1 })
            .to(content, { opacity: 1, y: 0, duration: 0.5 }, 0.5);
        }

        tl.to(panel, { duration: 0.8 });
      });
    }, container);

    // Refresh ScrollTrigger to calculate initial positions correctly
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, []);

  return (
    <div id="projects" ref={containerRef} className="relative h-screen bg-bg overflow-hidden select-none">
      
      {/* Dynamic Slide Panels */}
      {projects.map((proj, idx) => (
        <ProjectPanel key={idx} proj={proj} idx={idx} />
      ))}

    </div>
  );
}

