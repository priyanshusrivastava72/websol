import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const progressRef = useRef(null);

  const steps = [
    {
      num: 'WS6_PHASE_01',
      title: 'Discovery',
      subtitle: 'Technical Audit & Goals',
      desc: 'We research market positioning, audit legacy systems, and define primary software milestones.',
      align: 'left',
      cmd: 'CMD: run_discovery_audit --verbose // return_0',
    },
    {
      num: 'WS6_PHASE_02',
      title: 'Strategy',
      subtitle: 'Architectural Roadmap',
      desc: 'We construct database schemes, model cloud setups, and outline growth attribution targets.',
      align: 'right',
      cmd: 'CMD: compile_system_roadmap --cloud=aws // return_0',
    },
    {
      num: 'WS6_PHASE_03',
      title: 'Design Systems',
      subtitle: 'UI/UX Token Library',
      desc: 'We draft high-fidelity wireframes and compile modular components mapping typography and tokens.',
      align: 'left',
      cmd: 'CMD: init_design_library --tokens=hifi // return_0',
    },
    {
      num: 'WS6_PHASE_04',
      title: 'Development',
      subtitle: 'MERN & GPU Coding',
      desc: 'We engineer express server routers, bind mongoose models, and compile hardware-accelerated 3D views.',
      align: 'right',
      cmd: 'CMD: deploy_mern_cluster --db=stable // return_0',
    },
    {
      num: 'WS6_PHASE_05',
      title: 'Launch',
      subtitle: 'Global CDN Deployments',
      desc: 'We run load tests, execute speed diagnostic passes, and deploy server containers with zero downtime.',
      align: 'left',
      cmd: 'CMD: run_production_launch --secure // return_0',
    },
    {
      num: 'WS6_PHASE_06',
      title: 'Growth Optimization',
      subtitle: 'AI pipelines & SEO Audits',
      desc: 'We configure search visibility indexers, activate analytics trackers, and deploy custom automation scripts.',
      align: 'right',
      cmd: 'CMD: launch_growth_autopilot --track=active // return_0',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    const progress = progressRef.current;
    const cards = container.querySelectorAll('.process-card-wrapper');

    if (!container || !progress) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      tl.to(progress, {
        height: '100%',
        ease: 'none',
        duration: 2.5,
      });

      cards.forEach((card, idx) => {
        const startOffset = (idx / cards.length) * 2.5;
        
        tl.to(card.querySelector('.process-card'), {
          opacity: 1,
          scale: 1,
          borderColor: 'var(--color-primary)',
          boxShadow: '0 4px 20px var(--color-primary-glow)',
          duration: 0.5,
        }, startOffset)
        .to(card.querySelector('.process-node'), {
          backgroundColor: 'var(--color-primary)',
          borderColor: 'var(--color-bg)',
          boxShadow: '0 0 15px var(--color-primary)',
          duration: 0.3,
        }, startOffset);
      });
    }, container);

    // Refresh ScrollTrigger to calculate initial positions correctly
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="process"
      ref={containerRef} 
      className="relative min-h-screen w-full py-20 md:py-32 bg-bg overflow-visible lg:overflow-hidden flex flex-col justify-center animate-glow"
    >
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-glass-border to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="space-y-4 mb-20 text-left">
          <div className="flex items-center gap-4">
            <div className="w-8 h-[1px] bg-secondary" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary font-mono">04 // Operational Timeline</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Our Acceleration <br />
            <span className="text-gradient-purple-blue">System Pipeline</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mt-12 max-w-4xl mx-auto">
          
          {/* Central static line */}
          <div 
            ref={lineRef} 
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 h-full w-[1px] bg-glass-border pointer-events-none"
          />

          {/* Central progress line */}
          <div 
            ref={progressRef} 
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-[2px] h-[0%] bg-gradient-to-b from-primary via-accent to-secondary shadow-[0_0_15px_#a855f7] pointer-events-none"
          />

          {/* Steps */}
          <div className="space-y-16 relative">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="process-card-wrapper grid grid-cols-1 md:grid-cols-2 items-center gap-8 relative"
              >
                {/* Node dot */}
                <div className="process-node absolute left-4 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 w-3.5 h-3.5 rounded-full border border-glass-border-heavy bg-glass-bg-heavy z-20 transition-all duration-300" />

                {/* Left Card */}
                {step.align === 'left' ? (
                  <div className="process-card opacity-15 scale-95 origin-left border border-glass-border p-6 rounded-2xl glass-panel relative text-left transition-colors duration-500 ml-8 md:ml-0 md:col-start-1 md:text-right md:origin-right">
                    <span className="text-[9px] font-bold text-gray-400 font-mono block mb-1">{step.num}</span>
                    <h3 className="text-lg font-black text-gray-900">{step.title}</h3>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-0.5 font-mono">{step.subtitle}</h4>
                    <p className="text-gray-600 text-xs leading-relaxed font-light mt-3">
                      {step.desc}
                    </p>
                    
                    {/* Tech log execute code */}
                    <div className="border-t border-glass-border mt-4 pt-3 text-[8px] font-mono text-gray-400">
                      {step.cmd}
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:block" />
                )}

                {/* Right Card */}
                {step.align === 'right' ? (
                  <div className="process-card opacity-15 scale-95 origin-left border border-glass-border p-6 rounded-2xl glass-panel relative text-left transition-colors duration-500 ml-8 md:ml-0 md:col-start-2">
                    <span className="text-[9px] font-bold text-gray-400 font-mono block mb-1">{step.num}</span>
                    <h3 className="text-lg font-black text-gray-900">{step.title}</h3>
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-0.5 font-mono">{step.subtitle}</h4>
                    <p className="text-gray-600 text-xs leading-relaxed font-light mt-3">
                      {step.desc}
                    </p>

                    {/* Tech log execute code */}
                    <div className="border-t border-glass-border mt-4 pt-3 text-[8px] font-mono text-gray-400">
                      {step.cmd}
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:block" />
                )}

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
