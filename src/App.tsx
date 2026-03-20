import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Sun, Moon, Diamond, BookOpen, PenTool, Hexagon } from 'lucide-react';
import data from './data.json';

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
      <div className="font-serif text-2xl tracking-widest cursor-pointer" onClick={() => scrollTo('home')}>
        LOTUS ROOM
      </div>
      
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
  <section id="home" className="min-w-[100vw] min-h-screen md:h-screen h-auto snap-start relative flex items-center shrink-0 overflow-hidden bg-[var(--bg-primary)]">
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
      {/* Left: Text */}
      <div className="relative z-10 flex flex-col justify-center px-6 md:px-24 h-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-10 bg-[var(--accent-soft)]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">Lotus Room</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] tracking-tight mb-8">
            Culture by <span className="italic text-[var(--accent-soft)]">Design</span>
          </h1>
          <p className="text-lg md:text-xl font-light tracking-wide opacity-80 max-w-md leading-relaxed mb-12">
            A premium creative studio. We build systems for cultural resonance.
          </p>
          <div className="flex items-center gap-4 cursor-pointer group w-fit" onClick={() => document.getElementById('room')?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })}>
            <div className="h-px w-8 bg-[var(--text-main)] group-hover:w-16 group-hover:bg-[var(--accent-soft)] transition-all duration-500" />
            <span className="font-cinzel text-xs uppercase tracking-[0.2em] group-hover:text-[var(--accent-soft)] transition-colors">Explore the Room</span>
          </div>
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
          src="https://images.unsplash.com/photo-1600172454132-b5452320c911?q=80&w=2070&auto=format&fit=crop" 
          alt="Atmosphere" 
          className="w-full h-full object-cover filter sepia-[0.15] brightness-[0.8]"
        />
      </div>
    </div>
  </section>
);

const SlideRoom = () => (
  <section id="room" className="min-w-[100vw] min-h-screen md:h-screen h-auto py-24 md:py-0 snap-start relative flex items-center justify-center px-6 md:px-24 shrink-0 overflow-hidden bg-[var(--bg-secondary)]">
    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-7xl w-full items-center">
      {/* Left: Image Stack */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0"
      >
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop" alt="Studio" className="absolute top-0 left-0 w-4/5 h-4/5 object-cover filter sepia-[0.15] brightness-[0.8] border border-[var(--border-color)]" />
        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" alt="Details" className="absolute bottom-0 right-0 w-3/5 h-3/5 object-cover filter sepia-[0.15] brightness-[0.8] border border-[var(--border-color)]" />
        {/* Ornament Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-[var(--accent-soft)] flex items-center justify-center bg-[var(--bg-secondary)]/50 backdrop-blur-sm">
          <span className="text-[var(--accent-soft)] text-xl">✦</span>
        </div>
      </motion.div>

      {/* Right: Text & Numbered Levels */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-10 bg-[var(--accent-soft)]" />
          <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">Innovation Oasis</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
          We build brands that are <span className="italic text-[var(--accent-soft)]">remembered.</span>
        </h2>
        <div className="flex flex-col gap-6">
          <p className="text-lg font-light leading-relaxed opacity-80">
            We combine strategy, design, and technology to root your business in culture, built for the modern world.
          </p>
          <p className="text-lg font-light leading-relaxed opacity-80">
            This is Lifestyle Empowerment. Where your ideas become a brand. Your brand becomes a movement. Your movement becomes legacy.
          </p>
        </div>
      </motion.div>
    </div>
    
    {/* Philosophical footnote */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] opacity-70 w-full text-center">
      Yūgen ✦ Mysterious Profundity
    </div>
  </section>
);

const RoomSlide: React.FC<{ data: any }> = ({ data }) => {
  const titleWords = data.title.split(' ');
  const lastWord = titleWords.pop();
  const firstPart = titleWords.join(' ');

  return (
    <section id={data.id} className="min-w-[100vw] min-h-screen md:h-screen h-auto snap-start relative flex items-end px-6 md:px-24 pb-24 shrink-0 overflow-hidden bg-[#0f0d0b]">
      {/* Full-bleed cinematic image */}
      <div className="absolute inset-0 z-0">
        <img src={data.image} alt={data.title} className="w-full h-full object-cover filter sepia-[0.2] brightness-[0.6]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-[#0f0d0b]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl w-full text-[#f0ebe0]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-[var(--accent-soft)]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">{data.duration}</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-serif mb-6">
            {firstPart} <span className="italic text-[var(--accent-soft)]">{lastWord}</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="text-lg font-light leading-relaxed opacity-80 whitespace-pre-line">
              {data.narrative}
            </p>
            
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-3">System Map</h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {data.systemMap.map((step: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-light opacity-80">
                      <span className="text-[var(--accent-soft)]">✦</span> {step}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-3">Impact</h3>
                <div className="flex flex-wrap gap-2">
                  {data.impact.map((item: string, i: number) => (
                    <span key={i} className="text-xs font-sans border border-[var(--border-color)] px-3 py-1 opacity-80">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-4">
                <a href="#archive" className="inline-block border border-[var(--accent-soft)] px-8 py-3 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[#0f0d0b] transition-colors duration-300">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] opacity-70 w-full text-center">
        {data.quote}
      </div>
    </section>
  );
};

const SlideSystems = () => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  return (
    <section id="systems" className="min-w-[100vw] min-h-screen md:h-screen snap-start relative shrink-0 md:overflow-y-auto scrollbar-hide bg-[var(--bg-secondary)]">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop" alt="Architecture" className="w-full h-full object-cover mix-blend-luminosity filter sepia-[0.15] brightness-[0.8]" />
      </div>
      
      <div className="relative z-10 max-w-7xl w-full mx-auto min-h-full flex flex-col justify-center px-6 md:px-24 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className={isMobileExpanded ? 'hidden md:block' : 'block'}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-10 bg-[var(--accent-soft)]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">The Frameworks</span>
          </div>
          
          <div className="mb-12 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
              Systems for <span className="italic text-[var(--accent-soft)]">Scale</span>
            </h2>
            <p className="text-lg font-light leading-relaxed opacity-80 mb-8">
              Our proprietary frameworks are designed to build, scale, and sustain your creative vision. Select a system below to explore its methodology.
            </p>
            
            <button 
              onClick={() => setIsMobileExpanded(true)}
              className="md:hidden inline-block border border-[var(--accent-soft)] px-8 py-3 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[#0f0d0b] transition-colors duration-300"
            >
              Read More
            </button>
          </div>
        </motion.div>
        
        <div className={isMobileExpanded ? 'block' : 'hidden md:block'}>
          {isMobileExpanded && (
            <button 
              onClick={() => setIsMobileExpanded(false)}
              className="md:hidden flex items-center gap-2 mb-8 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:opacity-70 transition-opacity"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Back to Summary
            </button>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--border-color)] border border-[var(--border-color)]">
        {data.roomsData.map((room: any, i: number) => {
          return (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            key={i} 
            id={`system-card-${room.id}`} 
            className="aspect-[3/4] md:aspect-auto md:h-[450px] bg-[var(--bg-primary)] p-8 flex flex-col justify-between group hover:bg-[var(--bg-secondary)] transition-colors duration-700 relative overflow-hidden cursor-pointer" 
            onClick={() => document.getElementById(room.id)?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' })}
          >
            <div className="absolute inset-0 border border-transparent group-hover:border-[var(--accent-soft)]/30 transition-colors duration-700" />
            <div className="font-cinzel text-xs text-[var(--accent-soft)] opacity-60">0{i+1}</div>
            <div className="flex flex-col items-center text-center gap-6 z-10 my-auto">
              <span className="text-[var(--accent-soft)] text-2xl opacity-80 group-hover:scale-110 transition-transform duration-500">✦</span>
              <div>
                <h3 className="font-serif text-2xl mb-3">{room.title}</h3>
                <p className="font-cinzel text-[10px] text-[var(--accent-soft)] uppercase tracking-[0.2em] opacity-80 mb-4">{room.duration}</p>
                <p className="font-light text-sm opacity-70 leading-relaxed line-clamp-3 mb-6">{room.narrative}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-auto">
                  {room.impact.slice(0, 2).map((imp: string, idx: number) => (
                    <span key={idx} className="text-[9px] font-cinzel uppercase tracking-wider border border-[var(--border-color)] px-2 py-1 opacity-60 group-hover:border-[var(--accent-soft)]/50 transition-colors">
                      {imp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full h-px bg-[var(--border-color)] group-hover:bg-[var(--accent-soft)]/50 transition-colors" />
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

const SlideDojo = () => (
  <section id="dojo" className="min-w-[100vw] min-h-screen md:h-screen h-auto py-24 md:py-0 snap-start relative flex flex-col justify-center px-6 md:px-24 shrink-0 overflow-hidden bg-[#0f0d0b] text-[#f0ebe0]">
    <div className="absolute inset-0 z-0 opacity-10">
      <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop" alt="Dojo" className="w-full h-full object-cover filter sepia-[0.2] brightness-[0.5]" />
    </div>
    
    <div className="relative z-10 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column: Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-10 bg-[var(--accent-soft)]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">The Dojo</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif mb-6">
            Applied <span className="italic text-[var(--accent-soft)]">Craft</span>
          </h2>
          <div className="flex flex-col gap-6 mb-12">
            <p className="text-lg font-light leading-relaxed opacity-80">
              A quarterly training circle for founders building serious brands.
            </p>
            <p className="text-lg font-light leading-relaxed opacity-80">
              Inside the Dojo we apply the Lotus Room systems in real time — brand, narrative, growth, and operations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-3">Duration</h3>
              <p className="text-sm font-light opacity-80">6 Weeks</p>
            </div>
            <div>
              <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-3">Format</h3>
              <p className="text-sm font-light opacity-80 leading-relaxed">Weekly live studio sessions + applied founder work</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a href="#contact" className="inline-block border border-[var(--accent-soft)] px-8 py-4 font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[#0f0d0b] transition-colors duration-300">
              Apply to the Dojo
            </a>
            <div className="flex flex-col">
              <span className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)]">Next Session: Summer Dojo</span>
              <span className="text-xs font-light opacity-60 mt-1">8 Seats • Applications Open</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Details */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col justify-center gap-8"
        >
          <div className="p-8 border border-[var(--accent-soft)]/12 bg-[#1a1714]/50 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 font-serif text-9xl text-[var(--accent-soft)] opacity-5 select-none pointer-events-none group-hover:opacity-10 transition-opacity duration-500">
              01
            </div>
            <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-6">What You Build</h3>
            <ul className="space-y-4">
              {[
                "A clear brand position",
                "A narrative engine for content",
                "A working sales and automation flow",
                "A structured operating system for growth"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-light opacity-80">
                  <span className="text-[var(--accent-soft)] mt-0.5">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 border border-[var(--accent-soft)]/12 bg-[#1a1714]/50 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 font-serif text-9xl text-[var(--accent-soft)] opacity-5 select-none pointer-events-none group-hover:opacity-10 transition-opacity duration-500">
              02
            </div>
            <h3 className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-6">Who It's For</h3>
            <p className="text-sm font-light leading-relaxed opacity-80">
              Founders, creators, and operators building cultural brands, creative studios, or modern companies that require clarity, systems, and momentum.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
    
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-[var(--accent-soft)] opacity-70 w-full text-center">
      Shuhari ✦ Learn, Detach, Transcend
    </div>
  </section>
);

const SlideJournal = () => (
  <section id="journal" className="min-w-[100vw] min-h-screen md:h-screen h-auto py-24 md:py-0 snap-start relative flex flex-col justify-center px-6 md:px-24 shrink-0 overflow-hidden bg-[var(--bg-primary)]">
    <div className="relative z-10 max-w-7xl w-full mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="mb-12"
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-10 bg-[var(--accent-soft)]" />
          <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">Journal</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-serif">
          Cultural <span className="italic text-[var(--accent-soft)]">Insights</span>
        </h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {data.journalItems.map((item: any, i: number) => {
          const isFeatured = i === 0;
          return (
            <motion.a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={item.id} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`group cursor-pointer block relative overflow-hidden bg-[#1a1714] text-[#f0ebe0] ${isFeatured ? 'md:col-span-2 aspect-[16/9]' : 'md:col-span-1 aspect-square'}`}
            >
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover filter sepia-[0.15] brightness-[0.7] group-hover:scale-105 transition-transform duration-1000 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b] via-[#0f0d0b]/40 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="font-cinzel text-[10px] text-[var(--accent-soft)] mb-3 uppercase tracking-[0.3em]">{item.date}</div>
                <h4 className={`${isFeatured ? 'text-3xl' : 'text-xl'} font-serif mb-2`}>{item.title}</h4>
                
                <div className="overflow-hidden">
                  <div className="max-h-0 group-hover:max-h-32 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
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

const SlideArchive = () => (
  <section id="archive" className="min-w-[100vw] min-h-screen md:h-screen h-auto py-24 md:py-0 snap-start relative flex items-center justify-center px-6 md:px-24 shrink-0 overflow-hidden bg-[#0f0d0b] text-[#f0ebe0]">
    <div className="relative z-10 max-w-7xl w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left: Copy/Info */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-10 bg-[var(--accent-soft)]" />
            <span className="font-cinzel text-xs uppercase tracking-[0.5em] text-[var(--accent-soft)]">Get in Touch</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif mb-8 leading-tight">
            What are you <span className="italic text-[var(--accent-soft)]">building?</span>
          </h2>
          <p className="text-lg font-light leading-relaxed opacity-80 mb-12 max-w-md">
            Tell us about your vision, your timeline, and how we can help bring it to life.
          </p>
          
          <div className="flex flex-col gap-8">
            <a href="mailto:info@lotusroom.studio" className="group flex items-center gap-4 w-fit">
              <div className="h-px w-8 bg-[var(--accent-soft)]/50 group-hover:w-12 group-hover:bg-[var(--accent-soft)] transition-all duration-500" />
              <span className="font-cinzel text-sm uppercase tracking-[0.2em] group-hover:text-[var(--accent-soft)] transition-colors">info@lotusroom.studio</span>
            </a>
            <a href="#" className="group flex items-center gap-4 w-fit">
              <div className="h-px w-8 bg-[var(--accent-soft)]/50 group-hover:w-12 group-hover:bg-[var(--accent-soft)] transition-all duration-500" />
              <span className="font-cinzel text-sm uppercase tracking-[0.2em] group-hover:text-[var(--accent-soft)] transition-colors">Nairobi, Kenya</span>
            </a>
          </div>

          <div className="mt-24 font-cinzel text-[10px] uppercase tracking-[0.3em] opacity-40">
            &copy; {new Date().getFullYear()} Lotus Room OS. All rights reserved.
          </div>
        </motion.div>

        {/* Right: Centered Lotus SVG Logomark */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex justify-center items-center border border-[var(--accent-soft)]/12 p-24 aspect-square rounded-full"
        >
          <svg viewBox="0 0 100 100" className="w-48 h-48 text-[var(--accent-soft)] opacity-80" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M50 10 C 20 40, 20 60, 50 90 C 80 60, 80 40, 50 10 Z" />
            <path d="M50 20 C 30 45, 30 65, 50 80 C 70 65, 70 45, 50 20 Z" />
            <path d="M50 90 C 10 70, 10 30, 50 50 C 90 30, 90 70, 50 90 Z" />
            <circle cx="50" cy="50" r="5" fill="currentColor" />
          </svg>
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
  }, []);

  return (
    <div className="film-grain min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] selection:bg-[var(--accent-soft)] selection:text-[var(--bg-primary)] transition-colors duration-700">
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      
      <main 
        ref={scrollContainerRef}
        className="flex flex-col md:flex-row flex-nowrap w-full md:w-screen h-screen overflow-y-auto md:overflow-y-hidden md:overflow-x-auto snap-y md:snap-x snap-proximity md:snap-mandatory scroll-smooth scrollbar-hide"
      >
        <SlideHome />
        <SlideRoom />
        <SlideSystems />
        {data.roomsData.map((room: any) => (
          <RoomSlide key={room.id} data={room} />
        ))}
        <SlideDojo />
        <SlideJournal />
        <SlideArchive />
      </main>
    </div>
  );
}
