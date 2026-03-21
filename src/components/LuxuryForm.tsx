import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info } from 'lucide-react';

const FormField = ({ label, type = "text", id, placeholder, microcopy, options, isTextarea = false, isCheckbox = false, isRadio = false }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex flex-col gap-2 w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-[var(--accent-soft)] opacity-80 group-hover:opacity-100 transition-opacity">
          {label}
        </label>
        <AnimatePresence>
          {isHovered && microcopy && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="absolute right-0 -top-6 bg-[var(--bg-secondary)] border border-[var(--accent-soft)]/30 text-[var(--accent-soft)] text-[9px] uppercase tracking-wider px-2 py-1 rounded-sm shadow-[0_0_10px_rgba(199,168,106,0.2)] z-10 whitespace-nowrap flex items-center gap-1"
            >
              <Info size={10} /> {microcopy}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isTextarea ? (
        <textarea 
          id={id} 
          rows={3}
          className="bg-transparent border-b border-[var(--accent-soft)]/30 pb-2 text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-soft)] transition-all duration-300 font-light resize-none group-hover:border-[var(--accent-soft)]/60 focus:shadow-[0_4px_20px_-10px_rgba(199,168,106,0.3)]"
          placeholder={placeholder}
        />
      ) : isCheckbox || isRadio ? (
        <div className="flex flex-wrap gap-4 mt-2">
          {options?.map((opt: string, idx: number) => (
            <label key={idx} className="flex items-center gap-2 cursor-pointer group/opt">
              <input 
                type={isRadio ? "radio" : "checkbox"} 
                name={id} 
                value={opt}
                className="appearance-none w-4 h-4 border border-[var(--accent-soft)]/40 rounded-sm checked:bg-[var(--accent-soft)] checked:border-[var(--accent-soft)] transition-all duration-300 relative after:content-[''] after:absolute after:inset-0 after:bg-white/0 checked:after:bg-white/20 group-hover/opt:border-[var(--accent-soft)]/80 group-hover/opt:shadow-[0_0_8px_rgba(199,168,106,0.3)]"
              />
              <span className="text-sm font-light text-[var(--text-main)]/80 group-hover/opt:text-[var(--text-main)] transition-colors">{opt}</span>
            </label>
          ))}
        </div>
      ) : options ? (
        <select 
          id={id}
          defaultValue=""
          className="bg-transparent border-b border-[var(--accent-soft)]/30 pb-2 text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-soft)] transition-all duration-300 font-light group-hover:border-[var(--accent-soft)]/60 focus:shadow-[0_4px_20px_-10px_rgba(199,168,106,0.3)] appearance-none"
        >
          <option value="" disabled className="bg-[var(--bg-primary)] text-gray-500">{placeholder}</option>
          {options.map((opt: string, idx: number) => (
            <option key={idx} value={opt} className="bg-[var(--bg-primary)] text-[var(--text-main)]">{opt}</option>
          ))}
        </select>
      ) : (
        <input 
          type={type} 
          id={id} 
          className="bg-transparent border-b border-[var(--accent-soft)]/30 pb-2 text-[var(--text-main)] focus:outline-none focus:border-[var(--accent-soft)] transition-all duration-300 font-light group-hover:border-[var(--accent-soft)]/60 focus:shadow-[0_4px_20px_-10px_rgba(199,168,106,0.3)]"
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

const FormLayer = ({ title, children, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay }}
    className="relative p-8 bg-[var(--bg-secondary)]/40 backdrop-blur-md border border-[var(--accent-soft)]/10 rounded-sm hover:border-[var(--accent-soft)]/30 transition-colors duration-500 group/layer overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-soft)]/0 to-[var(--accent-soft)]/5 opacity-0 group-hover/layer:opacity-100 transition-opacity duration-700 pointer-events-none" />
    <h3 className="font-cinzel text-sm uppercase tracking-[0.3em] text-[var(--accent-soft)] mb-8 flex items-center gap-3">
      <div className="h-px w-6 bg-[var(--accent-soft)]/50 group-hover/layer:w-12 group-hover/layer:bg-[var(--accent-soft)] transition-all duration-500" />
      {title}
    </h3>
    <div className="flex flex-col gap-8 relative z-10">
      {children}
    </div>
  </motion.div>
);

export const LuxuryForm = () => {
  return (
    <form className="flex flex-col gap-8 w-full max-w-2xl mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
      
      {/* Layer 1 - Essential Info */}
      <FormLayer title="Essential Info" delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField 
            id="fullName" 
            label="Full Name" 
            placeholder="Your Name" 
            microcopy="Personal follow-up" 
          />
          <FormField 
            id="email" 
            type="email" 
            label="Email Address" 
            placeholder="your@email.com" 
            microcopy="Email confirmation and updates" 
          />
        </div>
        <FormField 
          id="program" 
          label="Program / Room Selection" 
          placeholder="Select a program..." 
          options={["Foundation", "Build", "Develop", "Capital", "Individual Room"]}
          microcopy="Select program or room" 
        />
      </FormLayer>

      {/* Layer 2 - Company / Project Context */}
      <FormLayer title="Company / Project Context" delay={0.2}>
        <FormField 
          id="companyName" 
          label="Company / Project Name" 
          placeholder="Project Title" 
          microcopy="Official name for review" 
        />
        <FormField 
          id="entityType" 
          label="Type of Entity" 
          isCheckbox={true}
          options={["Emerging Startup", "Creator", "Studio", "NGO", "Digital Product Company"]}
          microcopy="Select best fit" 
        />
        <FormField 
          id="teamSize" 
          label="Team Size / Company Stage" 
          isRadio={true}
          options={["Solo", "2-5", "6-10", "10+", "Idea", "Pre-Revenue", "Seed", "Growth"]}
          microcopy="Tailor guidance based on team size and stage" 
        />
      </FormLayer>

      {/* Layer 3 - Presence & Links */}
      <FormLayer title="Presence & Links" delay={0.3}>
        <FormField 
          id="links" 
          label="Website & Social Links" 
          placeholder="Paste links here (Website, LinkedIn, Instagram, TikTok)..." 
          isTextarea={true}
          microcopy="Paste links for review" 
        />
        <FormField 
          id="mediaUpload" 
          type="file"
          label="Optional Media Upload (PDF, Deck, Portfolio)" 
          microcopy="Upload portfolios for context" 
        />
      </FormLayer>

      {/* Layer 4 - Goals, Challenges & Priorities */}
      <FormLayer title="Goals & Challenges" delay={0.4}>
        <FormField 
          id="mainGoal" 
          label="Main Goal" 
          placeholder="What are you aiming to achieve?" 
          isTextarea={true}
          microcopy="Refine narrative, audience growth, scale ops" 
        />
        <FormField 
          id="biggestChallenge" 
          label="Biggest Challenge" 
          placeholder="What is holding you back?" 
          isTextarea={true}
          microcopy="Focus where guidance is needed" 
        />
        <FormField 
          id="focusAreas" 
          label="Focus Areas" 
          isCheckbox={true}
          options={["Content", "Operations", "Funding", "Audience Growth", "Team Alignment"]}
          microcopy="Select priority areas" 
        />
      </FormLayer>

      {/* Layer 5 - Meeting Preference */}
      <FormLayer title="Meeting Preferences" delay={0.5}>
        <FormField 
          id="meetingType" 
          label="Preferred Meeting Type" 
          isRadio={true}
          options={["Online", "In-Person", "Hybrid"]}
          microcopy="Select connection type" 
        />
        <FormField 
          id="timeSlots" 
          type="date"
          label="Available Time Slots" 
          microcopy="Choose preferred date/time" 
        />
        <FormField 
          id="additionalNotes" 
          label="Additional Notes" 
          placeholder="Any other context..." 
          isTextarea={true}
          microcopy="Optional context before session" 
        />
      </FormLayer>

      {/* Layer 6 - Consent & Submission */}
      <FormLayer title="Consent & Submit" delay={0.6}>
        <label className="flex items-start gap-4 cursor-pointer group">
          <input 
            type="checkbox" 
            required
            className="mt-1 appearance-none w-5 h-5 border border-[var(--accent-soft)]/40 rounded-sm checked:bg-[var(--accent-soft)] checked:border-[var(--accent-soft)] transition-all duration-300 relative after:content-[''] after:absolute after:inset-0 after:bg-white/0 checked:after:bg-white/20 group-hover:border-[var(--accent-soft)] group-hover:shadow-[0_0_15px_rgba(199,168,106,0.4)]"
          />
          <span className="text-sm font-light text-[var(--text-main)]/80 group-hover:text-[var(--text-main)] transition-colors leading-relaxed">
            I agree to receive follow-up emails and updates regarding my application.
          </span>
        </label>
        
        <motion.button 
          whileHover={{ scale: 1.02, backgroundColor: "rgba(199, 168, 106, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="sheen-effect mt-4 border border-[var(--accent-soft)] px-12 py-5 font-cinzel text-xs uppercase tracking-[0.3em] text-[var(--accent-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--bg-primary)] transition-all duration-500 shadow-[0_0_20px_rgba(199,168,106,0.1)] hover:shadow-[0_0_30px_rgba(199,168,106,0.4)] relative overflow-hidden group"
        >
          <span className="relative z-10">Submit Application</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </motion.button>
      </FormLayer>
    </form>
  );
};
