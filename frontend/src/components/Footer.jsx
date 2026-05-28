import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, ArrowUp, Mail, Phone, MapPin, CheckCircle, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { API_BASE_URL } from '../config/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMsg(data.message || 'Successfully subscribed!');
        setEmail('');
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.9 },
          colors: ['#7c3aed', '#2563eb', '#0891b2'],
        });
      } else {
        setStatus('error');
        setMsg(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMsg('Server error. Please try again later.');
    }
  };

  const handleScrollTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-glass-border bg-[#080812] px-6 md:px-12 py-16 overflow-hidden">
      {/* Light gradient highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[20vw] bg-primary/4 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
        
        {/* Left Column: Brand Info */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-black tracking-widest text-gradient-purple-blue">
                VARDHA <span className="text-accent">LINKS</span>
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm font-light">
              We design and construct ultra-premium web environments, bespoke software solutions, and automated growth systems for forward-thinking enterprises.
            </p>
          </div>
          
          <div className="mt-8 flex gap-4 text-xs text-gray-400 font-semibold">
            <span>&copy; {new Date().getFullYear()} Vardha Links. All Rights Reserved.</span>
          </div>
        </div>

        {/* Middle Column: Contact Info */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">Agency Hub</h3>
          <ul className="space-y-4 text-sm text-gray-600 font-light">
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-primary" />
              <span>Vardha Group, Gorakhnath Temple Road, Gorakhpur, Uttar Pradesh - 273007</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-accent" />
              <a href="mailto:info@vardha.live" className="hover:text-white hover:font-normal transition-all duration-300">info@vardha.live</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-secondary" />
              <a href="tel:+919670111167" className="hover:text-white hover:font-normal transition-all duration-300">+91 96701 11167</a>
            </li>
          </ul>
        </div>

        {/* Right Column: Newsletter Form */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">Join the Circle</h3>
          <p className="text-xs text-gray-600 leading-relaxed font-light">
            Get early access to our case studies, UI templates, and technical insights.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="relative flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full py-3 pl-4 pr-12 rounded-full glass-input text-sm text-gray-900"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="absolute right-1.5 p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 flex items-center justify-center cursor-pointer"
              >
                <Send size={14} className={status === 'loading' ? 'animate-pulse' : ''} />
              </button>
            </div>

            {/* Sub Feedback */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-xs text-emerald-600 font-semibold"
              >
                <CheckCircle size={14} />
                <span>{msg}</span>
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-xs text-rose-600 font-semibold"
              >
                <AlertTriangle size={14} />
                <span>{msg}</span>
              </motion.div>
            )}
          </form>
        </div>

      </div>

      {/* Scroll to Top */}
      <div className="max-w-7xl mx-auto flex justify-end mt-12 relative z-20">
        <button
          onClick={handleScrollTop}
          className="p-3 rounded-full border border-glass-border hover:border-primary/40 bg-glass-bg text-gray-300 hover:text-primary hover:bg-glass-bg-heavy transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.2)] flex items-center justify-center cursor-pointer"
          title="Scroll back to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
