import SmoothScroll from './components/SmoothScroll';
import GlowBackground from './components/GlowBackground';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <SmoothScroll>
      {/* Global Cinematic Environment */}
      <GlowBackground />
      
      {/* Navigation Layout */}
      <Navbar />

      {/* Narrative Section Progression */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer System */}
      <Footer />
    </SmoothScroll>
  );
}
