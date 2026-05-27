import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertTriangle, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [selectedServices, setSelectedServices] = useState([]);
  const [status, setStatus] = useState('idle');
  const [msg, setMsg] = useState('');

  const servicesList = [
    'Pinescript',
    'Web Dev',
    'Trading View Indicators',
    'App Dev',
    '3D Walkthrough',
    'Ad',
    'Video Ad',
    'Graphic Ad',
    'Performance Marketing (FB)',
    'OTT Marketing',
    'Social Media Management',
    'E-Comm Account Handling',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setMsg('Please fill out all required fields.');
      return;
    }

    setStatus('loading');

    const submitData = {
      ...formData,
      services: selectedServices,
    };

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMsg(data.message || 'Thank you! Your message was sent.');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        setSelectedServices([]);
        
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#7c3aed', '#2563eb', '#0891b2'],
        });
      } else {
        setStatus('error');
        setMsg(data.message || 'Something went wrong. Please check your data.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setMsg('Server error. Could not connect to API server.');
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full px-6 md:px-12 py-32 bg-bg overflow-hidden flex items-center">
      
      {/* Light aura */}
      <div className="absolute top-[30%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        
        {/* Left Side */}
        <div className="lg:col-span-5 flex flex-col justify-between text-left">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-primary" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary font-mono">06 // Connect Node</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              Start Your <br />
              <span className="text-gradient-purple-blue">Digital Transformation</span>
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed font-light max-w-md">
              Have a SaaS dashboard idea, a custom database requirement, or a workflow system automation target? Select your parameters and coordinate with our engineering team.
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-glass-border space-y-4">
            <div className="text-[9px] uppercase tracking-widest text-gray-400 font-black font-mono">Secure API Channel</div>
            <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold font-mono">
              <Mail size={14} className="text-primary" />
              <span>SSL Encryption &amp; MongoDB storage active</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-7">
          <div className="p-6 md:p-10 rounded-3xl glass-panel relative shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
            
            {/* HUD Viewfinder corner marks on form */}
            <span className="absolute left-3.5 top-3.5 font-mono text-[8px] text-gray-300 pointer-events-none">+</span>
            <span className="absolute right-3.5 top-3.5 font-mono text-[8px] text-gray-300 pointer-events-none">+</span>
            <span className="absolute left-3.5 bottom-3.5 font-mono text-[8px] text-gray-300 pointer-events-none">+</span>
            <span className="absolute right-3.5 bottom-3.5 font-mono text-[8px] text-gray-300 pointer-events-none">+</span>

            <form onSubmit={handleSubmit} className="space-y-8 text-left">
              
              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-black tracking-wider text-gray-500 font-mono">// YOUR_NAME *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    className="w-full px-5 py-3 rounded-2xl glass-input text-sm text-gray-900 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-black tracking-wider text-gray-500 font-mono">// YOUR_EMAIL *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jane@example.com"
                    className="w-full px-5 py-3 rounded-2xl glass-input text-sm text-gray-900 font-mono"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-black tracking-wider text-gray-500 font-mono">// CAPABILITY_TAGS</label>
                <div className="flex flex-wrap gap-2.5">
                  {servicesList.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`px-4 py-2 rounded-full border text-xs font-bold transition-all duration-300 cursor-pointer font-mono ${
                          isSelected
                            ? 'bg-primary border-primary text-white shadow-[0_4px_15px_rgba(124,58,237,0.3)]'
                            : 'bg-glass-bg border-glass-border-heavy text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>


              {/* Description */}
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-black tracking-wider text-gray-500 font-mono">// BRIEF_PARAMETER *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your design parameters or automation objectives..."
                  className="w-full px-5 py-3 rounded-2xl glass-input text-sm text-gray-900 resize-none font-mono"
                />
              </div>

              {/* Submit Button & Diagnostic details */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white hover:bg-primary/90 text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group shadow-[0_4px_20px_rgba(168,85,247,0.3)] cursor-pointer disabled:opacity-50 font-mono"
                >
                  {status === 'loading' ? 'Encrypting...' : 'Transmit Query'}
                  <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                {/* Secure sync details */}
                <div className="font-mono text-[8px] text-gray-400 hidden lg:block text-right">
                  <div>TRANSMIT_SECURE_API: active</div>
                  <div>DB_NODE: mongodb://localhost:27017</div>
                </div>

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-xs text-emerald-600 font-bold font-mono"
                  >
                    <CheckCircle size={16} />
                    <span>{msg}</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 text-xs text-rose-600 font-bold font-mono"
                  >
                    <AlertTriangle size={16} />
                    <span>{msg}</span>
                  </motion.div>
                )}

              </div>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
