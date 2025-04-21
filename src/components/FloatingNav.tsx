"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "project-overview", label: "Overview" },
  { id: "project-requirements", label: "Requirements" },
  { id: "score-overview", label: "Scoring" },
  { id: "download-section", label: "Downloads" },
  { id: "game-section", label: "Try Game" },
];

const FloatingNav = () => {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling down 300px
      setVisible(window.scrollY > 300);

      // Update active section based on scroll position
      const sections = navItems.map((item) => document.getElementById(item.id));
      const currentSection = sections.findIndex((section) => {
        if (!section) return false;
        const rect = section.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });

      if (currentSection !== -1) {
        setActiveSection(navItems[currentSection].id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-6 left-1/2 z-50 transform -translate-x-1/2"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <nav className="glass px-1 py-1 rounded-full backdrop-blur-xl border border-[#f85c70]/20 flex items-center shadow-lg">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute inset-0 bg-[#f85c70]/20 rounded-full border border-[#f85c70]/30"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10 font-space-grotesk">
                      {item.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingNav;
