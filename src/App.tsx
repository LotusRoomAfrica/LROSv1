import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import data from './data.json';

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
    <path d="M4 4l16 16" strokeOpacity="0.5" />
    <path d="M4 20L20 4" strokeOpacity="0.5" />
    <circle cx="12" cy="12" r="6" strokeOpacity="0.8" />
    <circle cx="12" cy="12" r="2" />
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

const Navbar = ({ isDark, toggleTheme }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center mix-blend-difference text-[#F5EFE4]">
      {/* Logo */}
      <motion.div 
        whileHover={{ scale: 1.05, textShadow: "0px 0px 12px rgba(199, 168, 106, 0.6)" }}
        className="font-serif text-2xl tracking-widest cursor-pointer transition-all duration-300" 
        onClick={() => scrollTo('home')}
      >
        LOTUS ROOM
      </motion.div>
      
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        {data.navItems.map((item: any) => (
          <button 
            key={item.id} 
            onClick={() => scrollTo(item.id)} 
            className="group relative text-xs font-sans uppercase tracking-[0.2em] hover:text-[#C7A86A] transition-colors pb-1"
          >
            {item.label}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C7A86A] transition-all duration-300 group-hover:w-full"></span>
          </button>
        ))}
        <button onClick={toggleTheme} className="ml-4 hover:text-[#C7A86A] transition-colors">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center gap-6">
        <button onClick={toggleTheme} className="hover:text-[#C7A86A] transition-colors">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="hover:text-[#C7A86A] transition-colors">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-gradient-to-b from-[#0B0B0B] to-[#1A1714] text-[#F5EFE4] p-4 flex flex-col gap-2 md:hidden border-b border-white/10 shadow-2xl"
          >
            {data.navItems.map((item: any) => (
              <button 
                key={item.id} 
                onClick={() => {
                  scrollTo(item.id);
                  setIsOpen(false);
                }} 
                className="text-left text-lg font-serif tracking-wide hover:text-[#C7A86A] hover:bg-white/5 px-4 py-3 rounded-lg transition-all"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SlideHome = () => (
  <section id="home" className="min-w-[100vw] min-h-screen md:h-screen h-auto snap-start relative flex items-center shrink-0 overflow-hidden bg-[var(--bg-primary)] flowing-gradient">
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
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2070&auto=format&fit=crop" 
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
  <section id="room" className="min-w-[100vw] min-h-screen md:h-screen h-auto py-24 md:py-0 snap-start relative flex items-center justify-center px-6 md:px-24 shrink-0 overflow-hidden bg-[var(--bg-secondary)] flowing-gradient">
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
        <img src="https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1000&auto=format&fit=crop" alt="Studio" className="absolute top-0 left-0 w-4/5 h-4/5 object-cover filter sepia-[0.15] brightness-[0.8]" />
        <img src="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop" alt="Details" className="absolute bottom-0 right-0 w-3/5 h-3/5 object-cover filter sepia-[0.15] brightness-[0.8] shadow-2xl" />
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
        <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-serif mb-8 leading-tight tracking-tight">
          About <span className="italic text-[var(--accent-soft)]">Lotus Room</span>
        </motion.h2>
        <motion.div variants={itemVariants} className="flex flex-col gap-6 mb-12">
          <p className="text-lg font-light leading-relaxed opacity-80 tracking-wide">
            {data.about.intro}
          </p>
          <p className="text-lg font-light leading-relaxed opacity-80 tracking-wide">
            {data.about.body}
          </p>
          <div className="mt-4">
            <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-4">Who We Serve</h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-8 text-sm font-light opacity-80">
              {data.about.audience.map((item: string, index: number) => (
                <li key={index} className="flex items-center gap-2"><span className="text-[var(--accent-soft)]">✦</span> {item}</li>
              ))}
            </ul>
          </div>
        </motion.div>
        <motion.div variants={itemVariants}>
          <button 
            onClick={() => document.getElementById('systems')?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })}
            className="sheen-effect inline-block border border-[var(--accent-soft)] px-8 py-4 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[#0f0d0b] transition-colors duration-300"
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

const RoomSlide: React.FC<{ data: any, onClose: () => void }> = ({ data, onClose }) => {
  const titleWords = data.title.split(' ');
  const lastWord = titleWords.pop();
  const firstPart = titleWords.join(' ');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0d0b] overflow-y-auto"
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

        {/* Full-bleed cinematic image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={data.image} alt={data.title} className="w-full h-full object-cover filter sepia-[0.2] brightness-[0.4]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-[#0f0d0b]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl w-full text-[#f0ebe0] mt-auto pt-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-10 bg-[var(--accent-soft)]" />
              <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">{data.duration}</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-serif mb-8 md:mb-12">
              {firstPart} <span className="italic text-[var(--accent-soft)]">{lastWord}</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="text-base md:text-lg font-light leading-relaxed opacity-80 whitespace-pre-line">
                {data.narrative}
              </p>
              
              <div className="flex flex-col gap-8">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-4">System Map</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {data.systemMap.map((step: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 text-sm font-light opacity-80">
                        <span className="text-[var(--accent-soft)]">✦</span> {step}
                      </div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-4">Impact</h3>
                  <div className="flex flex-wrap gap-3">
                    {data.impact.map((item: string, i: number) => (
                      <span key={i} className="text-xs font-sans border border-[var(--border-color)] px-4 py-2 opacity-80 bg-black/20 backdrop-blur-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <a href="#archive" onClick={onClose} className="sheen-effect inline-block border border-[var(--accent-soft)] px-8 py-4 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[#0f0d0b] transition-colors duration-300">
                    Sign Up to a Room
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] opacity-70 w-full text-center hidden md:block">
          {data.quote}
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
    <section id="systems" className="min-w-[100vw] min-h-screen md:h-screen h-auto snap-start relative shrink-0 md:overflow-y-auto scrollbar-hide bg-[var(--bg-secondary)] flowing-gradient">
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
              className="md:hidden sheen-effect inline-block border border-[var(--accent-soft)] px-8 py-4 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[#0f0d0b] transition-colors duration-300"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--border-color)] border border-[var(--border-color)]">
        {data.roomsData.map((room: any, i: number) => {
          return (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            key={i} 
            id={`system-card-${room.id}`} 
            className="cinematic-glow micro-particles gold-edge aspect-[3/4] md:aspect-auto md:h-[450px] bg-[var(--bg-primary)] p-8 flex flex-col justify-between group transition-colors duration-700 relative overflow-hidden" 
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--accent-soft)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="font-cinzel text-xs text-[var(--accent-soft)] opacity-60">0{i+1}</div>
            <div className="flex flex-col items-center text-center gap-6 z-10 my-auto">
              <motion.div 
                className="text-[var(--accent-soft)] opacity-80 w-12 h-12"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {systemIcons[room.id] || <span className="text-2xl">✦</span>}
              </motion.div>
              <div>
                <h3 className="font-serif text-2xl mb-3">{room.title}</h3>
                <p className="font-cinzel text-[10px] text-[var(--accent-soft)] uppercase tracking-[0.2em] opacity-80 mb-4">{room.duration}</p>
                <p className="font-light text-sm opacity-70 leading-relaxed line-clamp-3 mb-6 tracking-wide">{room.narrative}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-auto">
                  {room.impact.slice(0, 2).map((imp: string, idx: number) => (
                    <span key={idx} className="text-[9px] font-cinzel uppercase tracking-wider px-2 py-1 opacity-60 group-hover:text-[var(--accent-soft)] transition-colors">
                      {imp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); onRoomSelect(room); }}
              className="sheen-effect absolute bottom-6 left-1/2 -translate-x-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 font-cinzel text-[9px] uppercase tracking-[0.2em] text-[var(--accent-soft)] flex items-center gap-2 cursor-pointer z-20 hover:text-[var(--text-main)]"
            >
              Read More <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        )})}
          </div>
        </div>
      
      <div className={`mt-16 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] opacity-70 w-full text-center ${isMobileExpanded ? 'hidden md:block' : 'block'}`}>
        Ikigai ✦ A reason for living
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

const SlideDojo = () => (
  <section id="dojo" className="min-w-[100vw] min-h-screen md:h-screen h-auto py-24 md:py-0 snap-start relative flex flex-col justify-center px-6 md:px-24 shrink-0 overflow-hidden bg-[#0f0d0b] text-[#f0ebe0] flowing-gradient">
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
      <motion.img 
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 15, ease: "easeOut" }}
        src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
        alt="Dojo" 
        className="w-full h-full object-cover filter sepia-[0.2] brightness-[0.5]" 
      />
    </div>
    
    <div className="relative z-10 w-full max-w-7xl mx-auto py-12 md:py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left Column: Intro */}
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
            <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">{data.dojo.headline}</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-serif mb-6">
            Applied <span className="italic text-[var(--accent-soft)]">Craft</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="flex flex-col gap-6 mb-12">
            <p className="text-lg font-light leading-relaxed opacity-80">
              {data.dojo.intro}
            </p>
            <p className="text-lg font-light leading-relaxed opacity-80">
              {data.dojo.body}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-3">Duration</h3>
              <p className="text-sm font-light opacity-80">{data.dojo.duration}</p>
            </div>
            <div>
              <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-3">Format</h3>
              <p className="text-sm font-light opacity-80 leading-relaxed">{data.dojo.format}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a href="#contact" className="sheen-effect inline-block border border-[var(--accent-soft)] px-8 py-4 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[#0f0d0b] transition-colors duration-300">
              {data.dojo.cta}
            </a>
            <div className="flex flex-col">
              <span className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)]">Next Session: Summer Dojo</span>
              <span className="text-xs font-light opacity-60 mt-1">8 Seats • Applications Open</span>
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
          {/* Connecting Line */}
          <div className="absolute left-[2.25rem] top-12 bottom-12 w-px bg-[var(--accent-soft)]/20 hidden sm:block" />

          {dojoPhases.map((phase, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02, x: 5, boxShadow: "0 10px 30px -10px rgba(199,168,106,0.15)" }}
              className="cinematic-glow sheen-effect p-6 border border-[var(--accent-soft)]/12 bg-[#1a1714]/50 backdrop-blur-sm relative overflow-hidden group flex items-center gap-6 rounded-sm transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-soft)]/0 to-[var(--accent-soft)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-12 h-12 rounded-full border border-[var(--accent-soft)]/30 flex items-center justify-center bg-[#0f0d0b] text-[var(--accent-soft)] group-hover:scale-110 group-hover:border-[var(--accent-soft)] transition-all duration-500 shrink-0 z-10">
                {phase.icon}
              </div>
              
              <div className="z-10">
                <h3 className="font-cinzel text-xs uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-1">{phase.title}</h3>
                <p className="text-sm font-light opacity-80">{phase.desc}</p>
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
  <section id="journal" className="min-w-[100vw] min-h-screen md:h-screen h-auto py-24 md:py-0 snap-start relative flex flex-col justify-center px-6 md:px-24 shrink-0 overflow-hidden bg-[var(--bg-primary)] flowing-gradient">
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
              whileHover={{ y: -5 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`cinematic-glow gold-glow group cursor-pointer block relative overflow-hidden bg-[#1a1714] text-[#f0ebe0] border border-transparent rounded-sm ${isFeatured ? 'md:col-span-2 aspect-[16/9]' : 'md:col-span-1 aspect-square'}`}
            >
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover filter sepia-[0.15] brightness-[0.7] group-hover:scale-105 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-[#0f0d0b]/40 to-transparent group-hover:from-[var(--accent-soft)]/20 transition-colors duration-700 z-10" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                <div className="flex items-center gap-2 font-cinzel text-[10px] text-[var(--accent-soft)] mb-3 uppercase tracking-[0.3em]">
                  {item.category && categoryIcons[item.category] && (
                    <span className="opacity-80 w-3 h-3">{categoryIcons[item.category]}</span>
                  )}
                  <span>{item.category ? `${item.category} • ` : ''}{item.date}</span>
                </div>
                <h4 className={`${isFeatured ? 'text-3xl' : 'text-xl'} font-serif mb-2`}>{item.title}</h4>
                
                <div className="overflow-hidden">
                  <div className="max-h-32 md:max-h-0 md:group-hover:max-h-32 transition-all duration-700 ease-in-out opacity-100 md:opacity-0 md:group-hover:opacity-100">
                    {isFeatured && (
                      <p className="text-sm font-light opacity-80 mt-3 line-clamp-2 leading-relaxed">{item.excerpt}</p>
                    )}
                    <div className="flex items-center gap-3 mt-4 text-[var(--accent-soft)]">
                      <div className="h-px w-6 bg-[var(--accent-soft)]" />
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
      Ikigai ✦ A Reason for Living
    </div>
  </section>
  );
};

const SlideArchive = () => (
  <section id="archive" className="min-w-[100vw] min-h-screen md:h-screen h-auto py-24 md:py-0 snap-start relative flex items-center justify-center px-6 md:px-24 shrink-0 overflow-hidden bg-[#0f0d0b] text-[#f0ebe0] flowing-gradient">
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
      <motion.img 
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 15, ease: "easeOut" }}
        src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2069&auto=format&fit=crop" 
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
          
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <motion.a 
              whileHover={{ scale: 1.02, x: 5, backgroundColor: "rgba(199, 168, 106, 0.05)", borderColor: "rgba(199, 168, 106, 0.3)" }}
              href="mailto:info@lotusroom.studio" 
              className="sheen-effect group flex items-center gap-6 w-fit p-4 border border-transparent rounded-sm transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full border border-[var(--accent-soft)]/30 flex items-center justify-center group-hover:border-[var(--accent-soft)] transition-colors">
                <AbstractContact />
              </div>
              <span className="relative z-10 font-cinzel text-sm uppercase tracking-[0.2em] group-hover:text-[var(--accent-soft)] transition-colors">info@lotusroom.studio</span>
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

          <motion.div variants={itemVariants} className="mt-24 font-cinzel text-[10px] uppercase tracking-[0.3em] opacity-40">
            &copy; {new Date().getFullYear()} Lotus Room OS. All rights reserved.
          </motion.div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="cinematic-glow w-full max-w-md mx-auto lg:mx-0 lg:ml-auto p-8 bg-[#1a1714]/40 backdrop-blur-md border border-[var(--accent-soft)]/10 rounded-sm"
        >
          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] opacity-80">Name</label>
              <input 
                type="text" 
                id="name" 
                className="bg-transparent border-b border-[var(--accent-soft)]/30 pb-2 text-[#f0ebe0] focus:outline-none focus:border-[var(--accent-soft)] transition-colors font-light"
                placeholder="Your Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] opacity-80">Email</label>
              <input 
                type="email" 
                id="email" 
                className="bg-transparent border-b border-[var(--accent-soft)]/30 pb-2 text-[#f0ebe0] focus:outline-none focus:border-[var(--accent-soft)] transition-colors font-light"
                placeholder="your@email.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] opacity-80">Message / Project Details</label>
              <textarea 
                id="message" 
                rows={4}
                className="bg-transparent border-b border-[var(--accent-soft)]/30 pb-2 text-[#f0ebe0] focus:outline-none focus:border-[var(--accent-soft)] transition-colors font-light resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button 
              type="submit"
              className="sheen-effect mt-4 self-start border border-[var(--accent-soft)] px-12 py-4 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[#0f0d0b] transition-colors duration-300"
            >
              {data.contact.cta}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
    
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] opacity-70 w-full text-center">
      Wabi-Sabi ✦ Beauty in imperfection
    </div>
  </section>
);

export default function App() {
  const scrollContainerRef = useRef<HTMLElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);

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

    const handleWheel = (e: WheelEvent) => {
      // Disable horizontal scroll if modal is open
      if (selectedRoom) return;
      
      if (window.innerWidth >= 768) {
        if (e.deltaY !== 0 && e.deltaX === 0) {
          e.preventDefault();
          container.scrollBy({
            left: e.deltaY,
            behavior: 'auto' 
          });
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
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
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      <main 
        ref={scrollContainerRef}
        className="flex flex-col md:flex-row flex-nowrap w-full md:w-screen h-screen overflow-y-auto md:overflow-y-hidden md:overflow-x-auto snap-y md:snap-x snap-proximity md:snap-mandatory scroll-smooth scrollbar-hide"
      >
        <SlideHome />
        <SlideRoom />
        <SlideSystems onRoomSelect={setSelectedRoom} />
        <SlideDojo />
        <SlideJournal />
        <SlideArchive />
      </main>

      <AnimatePresence>
        {selectedRoom && (
          <RoomSlide data={selectedRoom} onClose={() => setSelectedRoom(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
