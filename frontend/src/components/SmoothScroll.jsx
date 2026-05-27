import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger globally
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Initialize Lenis scroll controller
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,      // Disabled because hijacking native touch scroll makes it feel janky
      syncTouch: false,        // Disable syncTouch to allow momentum/inertia
      touchMultiplier: 1.0,    // Reset to default
      infinite: false,
    });

    // 1. Force ScrollTrigger to update coordinates immediately on Lenis scroll tick
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Synchronize Lenis RAF rendering loop with GSAP's internal ticker
    const syncTicker = (time) => {
      lenis.raf(time * 1000); // GSAP time is in seconds, Lenis RAF expects milliseconds
    };
    gsap.ticker.add(syncTicker);

    // 3. Disable GSAP lag smoothing to align updates synchronously
    gsap.ticker.lagSmoothing(0);

    // Bind to window for global scroll trigger triggers
    window.lenis = lenis;

    return () => {
      // Cleanup ticker binding and scroll instance
      gsap.ticker.remove(syncTicker);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return <>{children}</>;
}
