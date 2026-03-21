import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import data from './data.json';
import { LuxuryForm } from './components/LuxuryForm';
import { AnimatePresence } from 'motion/react';

const FormModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)]/90 backdrop-blur-md p-4 md:p-8 overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[var(--bg-secondary)] border border-[var(--accent-soft)]/20 p-8 md:p-12 shadow-2xl rounded-sm my-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[var(--accent-soft)] hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        <LuxuryForm />
      </div>
    </motion.div>
  );
};

// --- Abstract SVG Components ---

const AbstractStudioPattern = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20">
    <path d="M0 50 C 30 20, 70 80, 100 50" stroke="currentColor" strokeWidth="0.5" fill="none" />
    <path d="M0 60 C 40 10, 60 90, 100 40" stroke="currentColor" strokeWidth="0.5" fill="none" />
    <path d="M0 40 C 20 70, 80 30, 100 60" stroke="currentColor" strokeWidth="0.5" fill="none" />
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.2" fill="none" />
  </svg>
);

const AbstractArtOfBrand = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" strokeOpacity="0.5" />
    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" strokeOpacity="0.8" />
    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    <path d="M2 12h20" strokeOpacity="0.3" />
    <path d="M12 2v20" strokeOpacity="0.3" />
  </svg>
);

const AbstractCampfyer = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M12 22c4-4 6-7.5 6-10.5a6 6 0 1 0-12 0c0 3 2 6.5 6 10.5z" strokeOpacity="0.8" />
    <path d="M12 16c2-2 3-4 3-6a3 3 0 1 0-6 0c0 2 1 4 3 6z" />
    <path d="M12 2v4" strokeOpacity="0.3" />
    <path d="M4 12h4" strokeOpacity="0.3" />
    <path d="M16 12h4" strokeOpacity="0.3" />
  </svg>
);

const AbstractEVO = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M4 12c4-8 12-8 16 0" strokeOpacity="0.5" />
    <path d="M4 16c4-8 12-8 16 0" strokeOpacity="0.8" />
    <path d="M4 20c4-8 12-8 16 0" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const AbstractBeatTherapy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
    <circle cx="12" cy="12" r="6" strokeOpacity="0.6" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="0.8" />
    <path d="M2 12a10 10 0 0 1 10-10" strokeOpacity="0.5" />
  </svg>
);

const AbstractDeeper = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M12 2L2 12l10 10 10-10L12 2z" strokeOpacity="0.5" />
    <path d="M12 6L6 12l6 6 6-6L12 6z" strokeOpacity="0.8" />
    <path d="M12 10l-2 2 2 2 2-2-2-2z" />
  </svg>
);

const AbstractFoundation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M2 20h20" strokeOpacity="0.8" />
    <path d="M6 20v-8c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4v8" strokeOpacity="0.5" />
    <path d="M10 8V4h4v4" />
  </svg>
);

const AbstractBuild = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M12 2v20" strokeOpacity="0.3" />
    <path d="M2 12h20" strokeOpacity="0.3" />
    <path d="M12 6c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6z" strokeOpacity="0.8" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const AbstractDevelop = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="12" r="3" stroke="var(--accent-soft)" fill="var(--bg-primary)" strokeWidth="1.5" />
    <circle cx="12" cy="4" r="2" strokeOpacity="0.8" />
    <circle cx="5" cy="16" r="2" strokeOpacity="0.8" />
    <circle cx="19" cy="16" r="2" strokeOpacity="0.8" />
    <path d="M12 7v2" strokeOpacity="0.5" />
    <path d="M7 15l2.5-1.5" strokeOpacity="0.5" />
    <path d="M17 15l-2.5-1.5" strokeOpacity="0.5" />
    <circle cx="12" cy="12" r="8" strokeOpacity="0.2" strokeDasharray="2 2" />
    <circle cx="12" cy="12" r="11" strokeOpacity="0.1" />
  </svg>
);

const AbstractCapital = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M12 2L2 22h20L12 2z" strokeOpacity="0.5" />
    <path d="M12 8l-6 14h12L12 8z" strokeOpacity="0.8" />
    <path d="M12 14l-2 6h4l-2-6z" />
  </svg>
);

const AbstractContact = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M4 4h16v16H4z" strokeOpacity="0.3" />
    <path d="M4 4l8 8 8-8" strokeOpacity="0.8" />
    <path d="M4 20l8-8 8 8" strokeOpacity="0.5" />
  </svg>
);

const AbstractLocation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <circle cx="12" cy="10" r="8" strokeOpacity="0.5" />
    <circle cx="12" cy="10" r="3" strokeOpacity="0.8" />
    <path d="M12 18c-4 0-8 2-8 4h16c0-2-4-4-8-4z" strokeOpacity="0.3" />
  </svg>
);

// --- End Abstract SVGs ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a' || target.closest('button') || target.closest('a') || target.classList.contains('cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--accent-soft)] rounded-full pointer-events-none z-[9999] mix-blend-multiply"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[var(--accent-soft)] rounded-full pointer-events-none z-[9998] mix-blend-multiply"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(184, 147, 90, 0.1)' : 'transparent'
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
      />
    </>
  );
};

const Navbar = ({ isDark, toggleTheme, scrolled }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 flex justify-between items-center transition-all duration-700 ${
        scrolled 
          ? 'py-4 bg-gradient-to-b from-[var(--bg-primary)] to-transparent backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(212,175,55,0.05)]' 
          : 'py-6 bg-transparent'
      }`}
    >
      {/* Logo */}
      <motion.div 
        whileHover={{ scale: 1.02, textShadow: "0px 0px 15px rgba(212, 175, 55, 0.4)" }}
        className="font-serif text-2xl tracking-widest cursor-pointer transition-all duration-300 text-[var(--text-main)] z-50" 
        onClick={() => scrollTo('home')}
      >
        LOTUS ROOM
      </motion.div>
      
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 z-50">
        {data.navItems.map((item: any) => (
          <button 
            key={item.id} 
            onClick={() => scrollTo(item.id)} 
            className="group relative text-xs font-sans uppercase tracking-[0.2em] text-[var(--text-main)] hover:text-[var(--accent-soft)] transition-colors pb-1"
          >
            {item.label}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--accent-soft)] transition-all duration-500 group-hover:w-full shadow-[0_0_8px_rgba(212,175,55,0.6)]"></span>
          </button>
        ))}
        <button 
          onClick={toggleTheme} 
          className="ml-4 text-[var(--text-main)] hover:text-[var(--accent-soft)] transition-all duration-500 drop-shadow-[0_0_0_rgba(212,175,55,0)] hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center gap-6 z-50">
        <button 
          onClick={toggleTheme} 
          className="text-[var(--text-main)] hover:text-[var(--accent-soft)] transition-all duration-500 drop-shadow-[0_0_0_rgba(212,175,55,0)] hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.8)]"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="text-[var(--text-main)] hover:text-[var(--accent-soft)] transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, y: 0, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, y: -20, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 bg-[var(--bg-primary)]/95 text-[var(--text-main)] p-6 flex flex-col gap-4 md:hidden border-b border-[var(--accent-soft)]/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
          >
            {data.navItems.map((item: any) => (
              <button 
                key={item.id} 
                onClick={() => {
                  scrollTo(item.id);
                  setIsOpen(false);
                }} 
                className="text-left text-xl font-serif tracking-widest hover:text-[var(--accent-soft)] hover:bg-[var(--text-main)]/5 px-4 py-3 rounded-lg transition-all duration-300"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const SlideHome = () => (
  <section id="home" className="w-full min-h-screen relative flex items-center overflow-hidden bg-[var(--bg-primary)] flowing-gradient">
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
      {/* Left: Text */}
      <div className="relative z-10 flex flex-col justify-center px-6 md:px-24 h-full py-24 md:py-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="group relative"
        >
          <div className="absolute inset-0 -inset-x-8 -inset-y-8 bg-[var(--accent-soft)]/0 group-hover:bg-[var(--accent-soft)]/5 rounded-3xl blur-2xl transition-colors duration-1000 pointer-events-none" />
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 relative z-10">
            <div className="h-px w-10 bg-[var(--accent-soft)]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">{data.homepage.headline}</span>
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.9] tracking-tighter mb-8 drop-shadow-sm" style={{ letterSpacing: '-0.04em' }}>
            {data.homepage.tagline.split(' ').slice(0, -1).join(' ')} <span className="italic text-[var(--accent-soft)] font-light">{data.homepage.tagline.split(' ').slice(-1)}</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl font-light tracking-wide opacity-80 max-w-md leading-relaxed mb-12">
            {data.homepage.body}
          </motion.p>
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="sheen-effect flex items-center gap-4 cursor-pointer group w-fit p-4 border border-[var(--accent-soft)]/20 hover:border-[var(--accent-soft)]/50 bg-[var(--bg-secondary)]/30 backdrop-blur-sm rounded-sm transition-all duration-500" 
            onClick={() => document.getElementById('room')?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })}
          >
            <div className="h-px w-8 bg-[var(--text-main)] group-hover:w-16 group-hover:bg-[var(--accent-soft)] transition-all duration-500" />
            <span className="relative z-10 font-cinzel text-xs uppercase tracking-[0.2em] group-hover:text-[var(--accent-soft)] transition-colors">{data.homepage.cta}</span>
          </motion.div>
        </motion.div>
        
        {/* Philosophical footnote */}
        <div className="absolute bottom-12 left-6 md:left-24 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] opacity-70">
          Kaizen ✦ Continuous Improvement
        </div>
      </div>

      {/* Right: Image */}
      <div className="relative h-full hidden md:block overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/20 to-transparent" />
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
          alt="Atmosphere" 
          className="w-full h-full object-cover filter sepia-[0.15] brightness-[0.8]"
        />
        {/* Abstract Geometric Gold Accent */}
        <div className="absolute top-1/2 right-24 -translate-y-1/2 w-64 h-64 border border-[var(--accent-soft)]/30 rounded-full mix-blend-overlay pointer-events-none" />
        <div className="absolute top-1/2 right-32 -translate-y-1/2 w-48 h-48 border border-[var(--accent-soft)]/20 rounded-full mix-blend-overlay pointer-events-none" />
      </div>
    </div>
  </section>
);

const SlideRoom = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
  <section id="room" className="w-full min-h-screen py-24 md:py-0 relative flex items-center justify-center px-6 md:px-24 overflow-hidden bg-[var(--bg-secondary)] flowing-gradient">
    {/* Abstract Background Pattern */}
    <motion.div style={{ y }} className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
      <div className="w-[150vw] h-[150vw] md:w-[80vw] md:h-[80vw] text-[var(--accent-soft)] opacity-5">
        <AbstractStudioPattern />
      </div>
    </motion.div>

    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-7xl w-full items-center py-12 md:py-0">
      {/* Left: Image Stack */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 gold-edge"
      >
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" alt="Studio" className="absolute top-0 left-0 w-4/5 h-4/5 object-cover filter sepia-[0.15] brightness-[0.8]" />
        <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" alt="Details" className="absolute bottom-0 right-0 w-3/5 h-3/5 object-cover filter sepia-[0.15] brightness-[0.8] shadow-2xl" />
        {/* Ornament Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-[var(--accent-soft)]/50 flex items-center justify-center bg-[var(--bg-secondary)]/30 backdrop-blur-md">
          <span className="text-[var(--accent-soft)] text-xl">✦</span>
        </div>
      </motion.div>

      {/* Right: Text & Numbered Levels */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="group relative"
      >
        <div className="absolute inset-0 -inset-x-8 -inset-y-8 bg-[var(--accent-soft)]/0 group-hover:bg-[var(--accent-soft)]/5 rounded-3xl blur-2xl transition-colors duration-1000 pointer-events-none" />
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 relative z-10">
          <div className="h-px w-10 bg-[var(--accent-soft)]" />
          <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">{data.about.headline}</span>
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight tracking-tight">
          Story. Strategy. <span className="italic text-[var(--accent-soft)]">Systems.</span>
        </motion.h2>
        <motion.div variants={itemVariants} className="flex flex-col gap-4 mb-8">
          <p className="text-base font-light leading-relaxed opacity-80 tracking-wide">
            {data.about.body}
          </p>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-3">What We Do</h3>
              <ul className="flex flex-col gap-3 text-xs md:text-sm font-light opacity-80">
                {data.about.whatWeDo.map((item: any, index: number) => (
                  <li key={index} className="flex flex-col gap-0.5">
                    <span className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--text-main)]">{item.title}</span>
                    <span className="opacity-70">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-3">Who We Work With</h3>
              <ul className="flex flex-col gap-2 text-xs md:text-sm font-light opacity-80">
                {data.about.audience.map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-2"><span className="text-[var(--accent-soft)]">✦</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <button 
            onClick={() => document.getElementById('systems')?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })}
            className="sheen-effect inline-block border border-[var(--accent-soft)] px-8 py-4 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--bg-primary)] transition-colors duration-300"
          >
            {data.about.cta}
          </button>
        </motion.div>
      </motion.div>
    </div>
    
    {/* Philosophical footnote */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] opacity-70 w-full text-center">
      Yūgen ✦ Mysterious Profundity
    </div>
  </section>
  );
};

const RoomSlide: React.FC<{ data: any, onClose: () => void, onOpenForm: () => void }> = ({ data, onClose, onOpenForm }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-primary)] overflow-y-auto"
    >
      <section id={data.id} className="w-full min-h-screen relative flex flex-col justify-end px-6 md:px-24 py-24 md:pb-24">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-6 md:right-12 z-50 flex items-center gap-2 font-cinzel text-xs uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:text-white transition-colors"
        >
          <X size={24} />
          <span className="hidden md:inline">Close</span>
        </button>

        {/* Full-bleed cinematic image with parallax */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.img 
            initial={{ scale: 1.1, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={data.image} alt={data.title} className="w-full h-full object-cover filter sepia-[0.2] brightness-[0.4]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(199,168,106,0.05)_0%,transparent_70%)]" />
          {/* Particles */}
          <div className="absolute inset-0 micro-particles opacity-50 mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-5xl w-full mx-auto text-[#f0ebe0] mt-auto pt-24 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center w-full"
          >
            <div className="flex items-center gap-4 mb-6 justify-center">
              <div className="h-px w-10 bg-[var(--accent-soft)]" />
              <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">System Room</span>
              <div className="h-px w-10 bg-[var(--accent-soft)]" />
            </div>
            
            <h2 className="text-4xl md:text-7xl font-serif mb-2 drop-shadow-2xl">
              {data.title}
            </h2>
            <h3 className="font-cinzel text-sm md:text-lg uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-8 md:mb-12">
              {data.subtitle}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left w-full">
              <div className="flex flex-col gap-8">
                <p className="text-base md:text-lg font-light leading-relaxed opacity-80 whitespace-pre-line">
                  {data.roomDesc}
                </p>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-[var(--bg-secondary)]/40 p-6 border border-[var(--accent-soft)]/10 rounded-sm backdrop-blur-sm"
                >
                  <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-4">How the room works</h3>
                  <p className="text-sm font-light opacity-80 mb-4">{data.howItWorksIntro}</p>
                  <ul className="flex flex-col gap-3">
                    {data.howItWorksList.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-light opacity-80">
                        <span className="text-[var(--accent-soft)] mt-0.5 text-[10px]">✦</span> 
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              
              <div className="flex flex-col gap-8 justify-between">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="bg-[var(--bg-secondary)]/40 p-6 border border-[var(--accent-soft)]/10 rounded-sm backdrop-blur-sm"
                >
                  <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-4">What founders receive</h3>
                  <div className="text-sm font-light leading-relaxed opacity-90 flex flex-col gap-3">
                    {data.outcome.split('\n').map((line: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-[var(--accent-soft)] mt-0.5 text-[10px]">✦</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <button 
                    onClick={() => {
                      onClose();
                      onOpenForm();
                    }}
                    className="sheen-effect inline-block border border-[var(--accent-soft)] px-8 py-4 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--bg-primary)] transition-colors duration-300"
                  >
                    {data.ctaText}
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

const systemIcons: Record<string, React.ReactNode> = {
  'art-of-brand': <AbstractArtOfBrand />,
  'campfyer': <AbstractCampfyer />,
  'evo': <AbstractEVO />,
  'beat-therapy': <AbstractBeatTherapy />,
  'deeper': <AbstractDeeper />
};

const systemColors: Record<string, string> = {
  'art-of-brand': 'rgba(199, 168, 106, 0.4)',
  'campfyer': 'rgba(220, 80, 50, 0.4)',
  'evo': 'rgba(50, 150, 255, 0.4)',
  'beat-therapy': 'rgba(150, 50, 200, 0.4)',
  'deeper': 'rgba(50, 200, 150, 0.4)'
};

const SlideSystems = ({ onRoomSelect }: { onRoomSelect: (room: any) => void }) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  return (
    <section id="systems" className="w-full min-h-screen relative overflow-hidden bg-[var(--bg-secondary)] flowing-gradient">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <motion.img 
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop" 
          alt="Architecture" 
          className="w-full h-full object-cover mix-blend-luminosity filter sepia-[0.15] brightness-[0.8]" 
        />
      </div>
      
      {/* Abstract Grid and Compass Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(199,168,106,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(199,168,106,0.1)_1px,transparent_1px)] bg-[length:60px_60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[var(--accent-soft)]/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[var(--accent-soft)]/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[var(--accent-soft)]/20 rounded-full border-dashed" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[var(--accent-soft)]/20 to-transparent" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--accent-soft)]/20 to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-7xl w-full mx-auto min-h-full flex flex-col justify-center px-6 md:px-24 py-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className={`group relative ${isMobileExpanded ? 'hidden md:block' : 'block'}`}
        >
          <div className="absolute inset-0 -inset-x-8 -inset-y-8 bg-[var(--accent-soft)]/0 group-hover:bg-[var(--accent-soft)]/5 rounded-3xl blur-2xl transition-colors duration-1000 pointer-events-none" />
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 relative z-10">
            <div className="h-px w-10 bg-[var(--accent-soft)]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">{data.systems.headline}</span>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-12 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
              Our <span className="italic text-[var(--accent-soft)]">Rooms</span>
            </h2>
            <p className="text-base md:text-lg font-light leading-relaxed opacity-80 mb-8">
              {data.systems.intro}
            </p>
            
            <button 
              onClick={() => setIsMobileExpanded(true)}
              className="md:hidden sheen-effect inline-block border border-[var(--accent-soft)] px-8 py-4 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--bg-primary)] transition-colors duration-300"
            >
              Explore Systems
            </button>
          </motion.div>
        </motion.div>
        
        <div className={isMobileExpanded ? 'block' : 'hidden md:block'}>
          {isMobileExpanded && (
            <motion.button 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsMobileExpanded(false)}
              className="md:hidden flex items-center gap-2 mb-8 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:opacity-70 transition-opacity"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Summary
            </motion.button>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--accent-soft)]/20 border border-[var(--accent-soft)]/20 relative">
            {/* Glowing connecting line behind the cards */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-soft)]/50 to-transparent blur-[2px] z-0 hidden lg:block" />
            
        {data.roomsData.map((room: any, i: number) => {
          return (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            key={i} 
            id={`system-card-${room.id}`} 
            className="cinematic-glow micro-particles gold-edge aspect-[3/4] md:aspect-auto md:h-[450px] bg-[var(--bg-primary)] p-8 flex flex-col justify-between group transition-colors duration-700 relative overflow-hidden cursor-pointer" 
            onClick={() => onRoomSelect(room)}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--accent-soft)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Hover Cover Image */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none z-0">
              <img src={room.image} alt={room.title} className="w-full h-full object-cover filter sepia-[0.3] brightness-[0.5]" />
            </div>
            
            {/* Visual Hover Effects based on room.id */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0 ${
              room.id === 'art-of-brand' ? 'bg-[radial-gradient(circle_at_center,rgba(199,168,106,0.1)_0%,transparent_70%)]' :
              room.id === 'campfyer' ? 'bg-gradient-to-t from-[rgba(220,80,50,0.1)] to-transparent' :
              room.id === 'evo' ? 'bg-[linear-gradient(45deg,rgba(50,150,255,0.05)_25%,transparent_25%,transparent_50%,rgba(50,150,255,0.05)_50%,rgba(50,150,255,0.05)_75%,transparent_75%,transparent_100%)] bg-[length:20px_20px]' :
              room.id === 'beat-therapy' ? 'bg-[radial-gradient(ellipse_at_bottom,rgba(150,50,200,0.15)_0%,transparent_60%)]' :
              'bg-[linear-gradient(to_right,rgba(199,168,106,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(199,168,106,0.05)_1px,transparent_1px)] bg-[length:40px_40px]'
            }`} />

            <div className="font-cinzel text-xs text-[var(--accent-soft)] opacity-60 relative z-10">0{i+1}</div>
            
            <div className="flex flex-col items-center text-center gap-6 z-10 my-auto relative">
              <motion.div 
                className="text-[var(--accent-soft)] opacity-80 w-12 h-12"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {systemIcons[room.id] || <span className="text-2xl">✦</span>}
              </motion.div>
              
              <div className="relative w-full flex flex-col items-center justify-center min-h-[120px]">
                {/* Default Content */}
                <div className="transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <h3 className="font-serif text-2xl mb-1">{room.title}</h3>
                  <h4 className="font-cinzel text-[9px] uppercase tracking-[0.2em] text-[var(--accent-soft)] mb-3">{room.subtitle}</h4>
                  <p className="font-light text-sm opacity-70 leading-relaxed">{room.shortDesc}</p>
                </div>
                
                {/* Hover Content */}
                <div className="transition-all duration-500 opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <h3 className="font-serif text-xl mb-1 text-[var(--accent-soft)]">{room.title}</h3>
                  <h4 className="font-cinzel text-[8px] uppercase tracking-[0.2em] text-white/80 mb-3">{room.subtitle}</h4>
                  <p className="font-light text-xs opacity-90 leading-relaxed">{room.hoverDesc}</p>
                </div>
              </div>
            </div>
            
            <button 
              className="sheen-effect absolute bottom-6 left-1/2 -translate-x-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 font-cinzel text-[9px] uppercase tracking-[0.2em] text-[var(--accent-soft)] flex items-center gap-2 z-20 hover:text-[var(--text-main)]"
            >
              Read More <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        )})}
          </div>
        </div>
      
      <div className={`mt-16 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] opacity-70 w-full text-center ${isMobileExpanded ? 'hidden md:block' : 'block'}`}>
        Wabi-Sabi ✦ Beauty in imperfection
      </div>
    </div>
  </section>
  );
};

const dojoPhases = data.dojoSteps.map((step: any, index: number) => {
  const icons = [
    <AbstractFoundation key="foundation" />,
    <AbstractBuild key="build" />,
    <AbstractDevelop key="develop" />,
    <AbstractCapital key="capital" />
  ];
  return {
    ...step,
    icon: icons[index]
  };
});

const SlideDojo = ({ onOpenForm }: { onOpenForm: () => void }) => (
  <section id="dojo" className="w-full min-h-screen py-24 md:py-0 relative flex flex-col justify-center px-6 md:px-24 overflow-hidden bg-[var(--bg-primary)] text-[var(--text-main)] flowing-gradient">
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
      <motion.img 
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 15, ease: "easeOut" }}
        src="https://images.unsplash.com/photo-1542314831-c6a4d14effd0?q=80&w=2000&auto=format&fit=crop" 
        alt="Dojo" 
        className="w-full h-full object-cover filter sepia-[0.2] brightness-[0.5]" 
      />
    </div>
    
    {/* Abstract Compass and Particles Background */}
    <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[var(--accent-soft)]/10 rounded-full" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[var(--accent-soft)]/20 rounded-full border-dashed" />
      <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-[var(--accent-soft)]/20 to-transparent" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--accent-soft)]/20 to-transparent" />
      <div className="absolute inset-0 micro-particles opacity-30 mix-blend-screen" />
    </div>
    
    <div className="relative z-10 w-full max-w-7xl mx-auto py-12 md:py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left Column: Intro */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="group relative flex flex-col justify-center"
        >
          <div className="absolute inset-0 -inset-x-8 -inset-y-8 bg-[var(--accent-soft)]/0 group-hover:bg-[var(--accent-soft)]/5 rounded-3xl blur-2xl transition-colors duration-1000 pointer-events-none" />
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6 relative z-10">
            <div className="h-px w-10 bg-[var(--accent-soft)]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">{data.dojo.headline}</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight tracking-tight">
            {data.dojo.subtitle.split(' ')[0]} <span className="italic text-[var(--accent-soft)]">{data.dojo.subtitle.split(' ')[1]}</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="flex flex-col gap-4 mb-10">
            <p className="text-base md:text-lg font-light leading-relaxed opacity-80 whitespace-pre-line tracking-wide">
              {data.dojo.intro}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-10">
            <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-6">Two Ways to Enter</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {data.dojo.waysToEnter.map((way: any, i: number) => (
                <div key={i} className="flex flex-col gap-2">
                  <h4 className="font-cinzel text-xs uppercase tracking-[0.2em] text-[var(--text-main)]">{way.title}</h4>
                  <p className="text-sm font-light opacity-70 whitespace-pre-line leading-relaxed">{way.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button onClick={onOpenForm} className="sheen-effect inline-block border border-[var(--accent-soft)] px-8 py-4 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--bg-primary)] transition-colors duration-300">
              {data.dojo.cta}
            </button>
            <div className="flex flex-col gap-1">
              <span className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)]">Cohort Details</span>
              <span className="text-xs font-light opacity-60">
                {Object.values(data.dojo.cohortDetails).join(' • ')}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Details */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col justify-center gap-6 relative"
        >
          <div className="mb-2">
            <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-2">
              {data.dojo.stagesIntro.split('\n')[0]}
            </h3>
            <p className="text-sm font-light opacity-70">
              {data.dojo.stagesIntro.split('\n')[1]}
            </p>
          </div>

          {/* Connecting Line */}
          <div className="absolute left-[2.25rem] top-24 bottom-12 w-px bg-[var(--accent-soft)]/20 hidden sm:block" />

          {dojoPhases.map((phase, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02, x: 5, boxShadow: "0 10px 30px -10px rgba(199,168,106,0.15)" }}
              className="cinematic-glow sheen-effect p-6 border border-[var(--accent-soft)]/12 bg-[var(--bg-secondary)]/50 backdrop-blur-sm relative overflow-hidden group flex items-start gap-6 rounded-sm transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-soft)]/0 to-[var(--accent-soft)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Visual Hover Effects based on phase */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0 ${
                phase.title === 'Foundation' ? 'bg-[linear-gradient(to_right,rgba(199,168,106,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(199,168,106,0.05)_1px,transparent_1px)] bg-[length:20px_20px]' :
                phase.title === 'Build' ? 'bg-gradient-to-r from-[rgba(220,80,50,0.1)] to-transparent' :
                phase.title === 'Develop' ? 'bg-[radial-gradient(circle_at_center,rgba(50,150,255,0.1)_0%,transparent_70%)]' :
                'bg-[radial-gradient(ellipse_at_top_right,rgba(199,168,106,0.15)_0%,transparent_60%)]'
              }`} />
              
              <div className="w-12 h-12 rounded-full border border-[var(--accent-soft)]/30 flex items-center justify-center bg-[var(--bg-primary)] text-[var(--accent-soft)] group-hover:scale-110 group-hover:border-[var(--accent-soft)] group-hover:shadow-[0_0_15px_rgba(199,168,106,0.4)] transition-all duration-500 shrink-0 z-10 relative mt-1">
                {phase.icon}
              </div>
              
              <div className="z-10 relative w-full flex flex-col justify-center">
                {/* Default Content */}
                <div className="transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-2 flex flex-col justify-center pointer-events-none">
                  <h3 className="font-cinzel text-xs uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-1">{phase.title}</h3>
                  <p className="text-sm font-light opacity-90 mb-1">{phase.subtitle}</p>
                  <p className="text-sm font-light opacity-60">{phase.desc}</p>
                </div>
                
                {/* Hover Content */}
                <div className="transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 absolute top-0 left-0 right-0 flex flex-col justify-center pointer-events-none">
                  <h3 className="font-cinzel text-xs uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-1">{phase.hoverTitle}</h3>
                  <p className="text-xs font-light opacity-80 leading-relaxed mb-3">{phase.hoverDesc}</p>
                  <ul className="flex flex-col gap-1.5">
                    {phase.benefits?.map((benefit: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-light opacity-90">
                        <span className="text-[var(--accent-soft)] text-[8px]">✦</span> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
    
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] opacity-70 w-full text-center">
      Shuhari ✦ Learn, Detach, Transcend
    </div>
  </section>
);

const categoryIcons: Record<string, React.ReactNode> = {
  'Brand Strategy': <AbstractFoundation />,
  'Culture': <AbstractArtOfBrand />,
  'Systems': <AbstractDeeper />
};

const SlideJournal = () => {
  const [posts, setPosts] = useState(data.journalItems);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const rssUrl = 'https://lotusroomos.substack.com/feed';
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
        const response = await fetch(apiUrl);
        const result = await response.json();
        
        if (result.status === 'ok' && result.items && result.items.length > 0) {
          const fetchedPosts = result.items.slice(0, 3).map((item: any, index: number) => {
            let imageUrl = data.journalItems[index]?.image || "https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=2067&auto=format&fit=crop";
            if (item.thumbnail) {
              imageUrl = item.thumbnail;
            } else if (item.enclosure && item.enclosure.link) {
              imageUrl = item.enclosure.link;
            } else {
              const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
              if (imgMatch) imageUrl = imgMatch[1];
            }

            let category = data.journalItems[index]?.category || "Culture";
            if (item.categories && item.categories.length > 0) {
              category = item.categories[0];
            }

            const dateObj = new Date(item.pubDate);
            const formattedDate = dateObj.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            });

            let excerpt = item.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';

            return {
              id: `fetched-${index}`,
              title: item.title,
              excerpt: excerpt,
              date: formattedDate,
              link: item.link,
              image: imageUrl,
              category: category
            };
          });
          
          setPosts(fetchedPosts);
        }
      } catch (error) {
        console.error('Error fetching Substack posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
  <section id="journal" className="w-full min-h-screen py-24 md:py-0 relative flex flex-col justify-center px-6 md:px-24 overflow-hidden bg-[var(--bg-secondary)] flowing-gradient">
    {/* Background: subtle parchment texture, flowing abstract ink lines */}
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(199,168,106,0.15)_0%,transparent_50%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(199,168,106,0.1)_0%,transparent_50%)]" />
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100 100 C 200 400, 600 -100, 1200 300" fill="transparent" stroke="rgba(199,168,106,0.2)" strokeWidth="1" />
        <path d="M-100 500 C 300 200, 800 800, 1400 400" fill="transparent" stroke="rgba(199,168,106,0.1)" strokeWidth="1" />
      </svg>
    </div>

    <div className="relative z-10 max-w-7xl w-full mx-auto py-12 md:py-0">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12 group relative"
      >
        <div className="absolute inset-0 -inset-x-8 -inset-y-8 bg-[var(--accent-soft)]/0 group-hover:bg-[var(--accent-soft)]/5 rounded-3xl blur-2xl transition-colors duration-1000 pointer-events-none" />
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 relative z-10">
          <div className="h-px w-10 bg-[var(--accent-soft)]" />
          <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">{data.journal.headline}</span>
        </motion.div>
        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-serif">
          Cultural <span className="italic text-[var(--accent-soft)]">Insights</span>
        </motion.h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {posts.map((item: any, i: number) => {
          const isFeatured = i === 0;
          return (
            <motion.a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(199,168,106,0.2)" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`cinematic-glow gold-glow group cursor-pointer block relative overflow-hidden bg-[var(--bg-primary)] text-[var(--text-main)] border border-[var(--accent-soft)]/10 rounded-sm ${isFeatured ? 'md:col-span-2 aspect-[16/9]' : 'md:col-span-1 aspect-square'}`}
            >
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover filter sepia-[0.2] brightness-[0.6] group-hover:scale-110 group-hover:brightness-[0.8] transition-all duration-1000 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-transparent group-hover:from-[var(--bg-primary)]/90 transition-colors duration-700 z-10" />
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-soft)]/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] z-10 pointer-events-none" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <div className="flex items-center gap-2 font-cinzel text-[10px] text-[var(--accent-soft)] mb-3 uppercase tracking-[0.3em]">
                  {item.category && categoryIcons[item.category] && (
                    <span className="opacity-80 w-3 h-3">{categoryIcons[item.category]}</span>
                  )}
                  <span>{item.category ? `${item.category} • ` : ''}{item.date}</span>
                </div>
                <h4 className={`${isFeatured ? 'text-3xl' : 'text-xl'} font-serif mb-2 drop-shadow-lg`}>{item.title}</h4>
                
                <div className="overflow-hidden">
                  <div className="max-h-32 md:max-h-0 md:group-hover:max-h-32 transition-all duration-700 ease-in-out opacity-100 md:opacity-0 md:group-hover:opacity-100">
                    {isFeatured && (
                      <p className="text-sm font-light opacity-90 mt-3 line-clamp-2 leading-relaxed font-sans">{item.excerpt}</p>
                    )}
                    <div className="flex items-center gap-3 mt-4 text-[var(--accent-soft)]">
                      <div className="h-px w-6 bg-[var(--accent-soft)] group-hover:w-10 transition-all duration-500" />
                      <span className="font-cinzel text-[9px] uppercase tracking-widest">Read Article</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
    
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] opacity-70 w-full text-center">
      Wabi-Sabi ✦ Beauty in imperfection
    </div>
  </section>
  );
};

const SlideArchive = ({ onOpenForm }: { onOpenForm: () => void }) => (
  <section id="archive" className="w-full min-h-screen py-24 md:py-0 relative flex items-center justify-center px-6 md:px-24 overflow-hidden bg-[var(--bg-primary)] text-[var(--text-main)] flowing-gradient">
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
      <motion.img 
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 15, ease: "easeOut" }}
        src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop" 
        alt="Archive" 
        className="w-full h-full object-cover filter sepia-[0.2] brightness-[0.5]" 
      />
    </div>
    <div className="relative z-10 max-w-7xl w-full py-12 md:py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Left: Copy/Info */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="group relative"
        >
          <div className="absolute inset-0 -inset-x-8 -inset-y-8 bg-[var(--accent-soft)]/0 group-hover:bg-[var(--accent-soft)]/5 rounded-3xl blur-2xl transition-colors duration-1000 pointer-events-none" />
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8 relative z-10">
            <div className="h-px w-10 bg-[var(--accent-soft)]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">{data.contact.headline}</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 leading-tight">
            {data.contact.tagline.split(' ').slice(0, -1).join(' ')} <span className="italic text-[var(--accent-soft)]">{data.contact.tagline.split(' ').slice(-1)}</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg font-light leading-relaxed opacity-80 mb-12 max-w-md">
            {data.contact.body}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col gap-6 mt-12">
            <motion.a 
              whileHover={{ scale: 1.02, x: 5, backgroundColor: "rgba(199, 168, 106, 0.05)", borderColor: "rgba(199, 168, 106, 0.3)" }}
              href={`mailto:${data.contact.email}`} 
              className="sheen-effect group flex items-center gap-6 w-fit p-4 border border-transparent rounded-sm transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full border border-[var(--accent-soft)]/30 flex items-center justify-center group-hover:border-[var(--accent-soft)] transition-colors">
                <AbstractContact />
              </div>
              <span className="relative z-10 font-cinzel text-sm uppercase tracking-[0.2em] group-hover:text-[var(--accent-soft)] transition-colors">{data.contact.email}</span>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.02, x: 5, backgroundColor: "rgba(199, 168, 106, 0.05)", borderColor: "rgba(199, 168, 106, 0.3)" }}
              href="#" 
              className="sheen-effect group flex items-center gap-6 w-fit p-4 border border-transparent rounded-sm transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full border border-[var(--accent-soft)]/30 flex items-center justify-center group-hover:border-[var(--accent-soft)] transition-colors">
                <AbstractLocation />
              </div>
              <span className="relative z-10 font-cinzel text-sm uppercase tracking-[0.2em] group-hover:text-[var(--accent-soft)] transition-colors">Nairobi, Kenya</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right: Contact Form Button */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="w-full max-w-2xl mx-auto lg:mx-0 lg:ml-auto flex items-center justify-center lg:justify-end"
        >
          <button 
            onClick={onOpenForm}
            className="sheen-effect inline-block border border-[var(--accent-soft)] px-12 py-6 font-cinzel text-sm uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--bg-primary)] transition-colors duration-300"
          >
            {data.contact.cta}
          </button>
        </motion.div>
      </div>
    </div>
    
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] opacity-70 w-full text-center">
      &copy; 2026 Culture by Design. All rights reserved.
    </div>
  </section>
);

export default function App() {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [selectedRoom]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedRoom) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedRoom]);

  return (
    <div className="film-grain min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] selection:bg-[var(--accent-soft)] selection:text-[var(--bg-primary)] transition-colors duration-700">
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} scrolled={scrolled} />
      
      <main 
        ref={scrollContainerRef}
        className="flex flex-col w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth scrollbar-hide"
      >
        <SlideHome />
        <SlideRoom />
        <SlideSystems onRoomSelect={setSelectedRoom} />
        <SlideDojo onOpenForm={() => setIsFormOpen(true)} />
        <SlideJournal />
        <SlideArchive onOpenForm={() => setIsFormOpen(true)} />
      </main>

      <AnimatePresence>
        {selectedRoom && (
          <RoomSlide data={selectedRoom} onClose={() => setSelectedRoom(null)} onOpenForm={() => setIsFormOpen(true)} />
        )}
        <FormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      </AnimatePresence>
    </div>
  );
}
