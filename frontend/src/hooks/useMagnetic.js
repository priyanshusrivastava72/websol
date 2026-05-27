import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * Custom hook to apply magnetic attraction effect to interactive UI elements.
 * @param {number} strength - Attraction strength factor (default: 0.35)
 * @returns {React.RefObject} - Ref to attach to the target element
 */
export default function useMagnetic(strength = 0.35) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      // Calculate cursor distance from element center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = e.clientX - centerX;
      const y = e.clientY - centerY;

      // Translate element toward cursor
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      // Elastic return to center
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
