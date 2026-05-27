import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorRef = useRef(null);

  // Position coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for trailing outer circle
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Add custom cursor active class to body on fine pointer devices (desktop)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (mediaQuery.matches) {
      document.body.classList.add('custom-cursor-active');
      setIsVisible(true);
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // Track hover states for interactive elements
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      const isInteractive = e.target.closest('a, button, input, select, textarea, [role="button"]');

      if (target) {
        setHovered(true);
        setCursorText(target.getAttribute('data-cursor') || '');
      } else if (isInteractive) {
        setHovered(true);
        setCursorText('');
      } else {
        setHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    // Hide cursor when leaving window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => {
      if (mediaQuery.matches) setIsVisible(true);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Lag-smooth outer ring */}
      <motion.div
        ref={cursorRef}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center transition-colors duration-300 ${
          hovered 
            ? 'w-16 h-16 bg-white/10 border border-white/20 backdrop-blur-xs shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
            : 'w-8 h-8 border border-white/30'
        }`}
      >
        {cursorText && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[10px] tracking-widest font-bold uppercase text-white"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Instant inner dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary rounded-full pointer-events-none z-[10000] shadow-[0_0_8px_rgba(168,85,247,0.8)]"
      />
    </>
  );
}
