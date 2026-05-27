import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const reviews = [
    {
      quote: "WebSol6 re-engineered our digital automotive configurator, fusing a responsive Three.js canvas with Express APIs. The deployment boosted our direct conversion rate by 34% and caught the eye of visual collectors worldwide.",
      author: "Marcus Vance",
      role: "Director of Digital Design",
      company: "Lumen Automotive",
    },
    {
      quote: "Fusing custom workflows with an elegant, cinematic interface is what WebSol6 excels at. They automated our entire customer onboarding pipeline using custom LLM nodes, reducing manual labor overhead by 80%.",
      author: "Dr. Clara Chen",
      role: "VP of Product Engineering",
      company: "Apex Labs",
    },
    {
      quote: "Their team built a high-speed, secure, and luxury-grade SaaS dashboard for our institutional crypto assets. The transition to the new stack was seamless, and the performance index remains perfect.",
      author: "Ethan Sterling",
      role: "Head of Infrastructure",
      company: "Vortex Systems",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="testimonials" className="relative min-h-screen w-full px-6 md:px-12 py-32 bg-bg overflow-hidden flex items-center justify-center">
      
      {/* Soft light glows */}
      <div className="absolute top-[20%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-primary/3 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-accent/3 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full space-y-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-4 justify-center">
            <div className="w-8 h-[1px] bg-primary" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary font-mono">05 // Institutional Trust</span>
            <div className="w-8 h-[1px] bg-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Client Testimonials
          </h2>
        </div>

        {/* Review Card Box */}
        <div className="relative rounded-3xl glass-panel p-8 md:p-16 min-h-[380px] flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          
          <div className="absolute top-8 right-8 text-primary/5">
            <Quote size={80} />
          </div>

          <div className="relative overflow-hidden flex-1 flex items-center text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8"
              >
                <p className="text-lg md:text-2xl font-light leading-relaxed text-gray-700 italic">
                  "{reviews[activeIndex].quote}"
                </p>
                
                <div>
                  <div className="text-base font-bold text-gray-900 tracking-wide">
                    {reviews[activeIndex].author}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">
                    {reviews[activeIndex].role} &mdash; <span className="text-primary">{reviews[activeIndex].company}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8 border-t border-glass-border mt-8">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              {String(activeIndex + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
            </span>

            {/* Prev/Next buttons */}
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-glass-border-heavy bg-glass-bg hover:bg-glass-bg-heavy text-gray-300 hover:border-primary/50 flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-glass-border-heavy bg-glass-bg hover:bg-glass-bg-heavy text-gray-300 hover:border-primary/50 flex items-center justify-center transition-all duration-300 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
