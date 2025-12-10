"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

// Animation variants for smooth fade-in and slide-up effect
const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
    }
  }
};

export default function Home() {
  const [showCurtain, setShowCurtain] = useState(true);
  const [bootText, setBootText] = useState("");
  const [bootStep, setBootStep] = useState(0);

  // Boot sequence messages
  const bootMessages = [
    "Initializing system...",
    "Loading portfolio.exe",
    "Mounting components...",
    "System ready."
  ];

  // Scroll restoration - save and restore scroll position on refresh
  useEffect(() => {
    // Restore scroll position after page loads
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
      });
    }

    // Save scroll position periodically
    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    // Save on scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Save before page unload
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clear scroll position on new navigation (not refresh)
    const handleNavigation = () => {
      // Only clear if we're navigating, not refreshing
      if (performance.navigation.type !== 1) {
        sessionStorage.removeItem('scrollPosition');
      }
    };
    window.addEventListener('load', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleNavigation);
    };
  }, []);

  // Boot sequence animation
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    // Step through boot messages
    timeouts.push(setTimeout(() => setBootStep(1), 200));
    timeouts.push(setTimeout(() => setBootStep(2), 600));
    timeouts.push(setTimeout(() => setBootStep(3), 1000));
    timeouts.push(setTimeout(() => setBootStep(4), 1400));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Wait for document ready before lifting curtain
  useEffect(() => {
    const checkReady = () => {
      if (document.readyState === 'complete' && bootStep >= 4) {
        // Add small delay after ready for smooth transition
        setTimeout(() => {
          setShowCurtain(false);
        }, 300);
      }
    };

    // Check immediately in case already ready
    checkReady();

    // Also listen for load event
    window.addEventListener('load', checkReady);
    
    return () => window.removeEventListener('load', checkReady);
  }, [bootStep]);

  return (
    <>
      {/* Curtain Reveal Animation with Boot Sequence */}
      <AnimatePresence>
        {showCurtain && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            initial={{ clipPath: "circle(100% at 50% 50%)" }}
            exit={{ clipPath: "circle(0% at 50% 50%)" }}
            transition={{
              duration: 1,
              ease: [0.65, 0, 0.35, 1],
            }}
          >
            {/* Boot Sequence Text - fades out as circle closes */}
            <motion.div 
              className="font-mono text-sm md:text-base space-y-2 text-left max-w-md px-6"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.53, delay: 0.4, ease: "easeOut" }}
            >
              {bootStep >= 1 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-gray-500"
                >
                  <span className="text-primary">❯</span> {bootMessages[0]}
                </motion.div>
              )}
              {bootStep >= 2 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-gray-400"
                >
                  <span className="text-primary">✔</span> {bootMessages[1]}
                </motion.div>
              )}
              {bootStep >= 3 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-gray-400"
                >
                  <span className="text-primary">✔</span> {bootMessages[2]}
                </motion.div>
              )}
              {bootStep >= 4 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="text-primary font-semibold"
                >
                  <span>✔</span> {bootMessages[3]}
                </motion.div>
              )}
              {bootStep < 4 && (
                <span className="text-primary animate-pulse">_</span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
        <Navbar />
      
      {/* Hero section with fade-in animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Hero />
      </motion.div>

      {/* Projects section with fade-in animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Projects />
      </motion.div>

      {/* Achievements section with fade-in animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Achievements />
      </motion.div>

      {/* Experience section with fade-in animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Experience />
      </motion.div>

      {/* Contact section with fade-in animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <Contact />
      </motion.div>
    </main>
    </>
  );
}
