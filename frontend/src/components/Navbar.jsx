import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ping, setPing] = useState(24);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const navLinks = [
    { name: 'Intro', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Simulate active system connection ping updates
    const pingInterval = setInterval(() => {
      setPing(Math.floor(Math.random() * (35 - 20 + 1)) + 20);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(pingInterval);
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement, { offset: -80 });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-4 ${
          scrolled ? 'pt-4' : 'pt-6'
        }`}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
          scrolled 
            ? 'glass-panel shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-md' 
            : 'border-b border-transparent bg-transparent'
        }`}>
          {/* Logo & Connection Node */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 group">
              <span className="text-xl font-black tracking-widest text-gradient-purple-blue">
                VARDHA <span className="text-accent">LINKS</span>
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </a>

            {/* Live Ping status (Tech element) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-glass-border bg-glass-bg font-mono text-[9px] text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>SYS_SYNC // {ping}MS</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-300 relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-glass-border-heavy hover:border-primary/45 bg-glass-bg text-gray-300 hover:text-primary hover:bg-glass-bg-heavy transition-all duration-300 cursor-pointer flex items-center justify-center"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="relative px-5 py-2 inline-block text-xs font-bold uppercase tracking-wider text-gray-900 transition-all duration-300 hover:text-primary"
            >
              {/* Fine cyber corner brackets */}
              <span className="absolute left-0 top-0 w-1.5 h-1.5 border-t border-l border-glass-border-heavy" />
              <span className="absolute right-0 top-0 w-1.5 h-1.5 border-t border-r border-glass-border-heavy" />
              <span className="absolute left-0 bottom-0 w-1.5 h-1.5 border-b border-l border-glass-border-heavy" />
              <span className="absolute right-0 bottom-0 w-1.5 h-1.5 border-b border-r border-glass-border-heavy" />
              Consult Now
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-glass-border-heavy hover:border-primary/45 bg-glass-bg text-gray-300 hover:text-primary hover:bg-glass-bg-heavy transition-all duration-300 cursor-pointer flex items-center justify-center"
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl md:hidden flex flex-col justify-center px-10"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-3xl font-black text-gray-600 hover:text-gray-900"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="mt-4 py-3 px-6 rounded-full border border-primary/45 bg-primary/5 text-center font-bold text-primary max-w-xs"
              >
                Consult Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
