import { motion } from 'framer-motion';

export default function GlowBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 bg-bg overflow-hidden pointer-events-none">
      {/* Soft moving pastel glow leaks with GPU WillChange acceleration */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] will-change-transform"
        style={{ willChange: 'transform' }}
      />

      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 50, -40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-secondary/12 blur-[130px] will-change-transform"
        style={{ willChange: 'transform' }}
      />

      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 40, 40, 0],
          scale: [0.8, 1.05, 0.8, 0.8],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[30%] left-[25%] w-[40vw] h-[40vw] rounded-full bg-accent/10 blur-[110px] will-change-transform"
        style={{ willChange: 'transform' }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Film Grain */}
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-25 mix-blend-overlay" />
    </div>
  );
}
