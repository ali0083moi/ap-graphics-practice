"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Run initial check
    checkIfMobile();

    // Add resize listener to update when window size changes
    window.addEventListener("resize", checkIfMobile);

    // Only set up cursor events if not on mobile
    if (!isMobile) {
      const updatePosition = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      };

      const handleMouseDown = () => setIsClicking(true);
      const handleMouseUp = () => setIsClicking(false);
      const handleMouseLeave = () => setIsVisible(false);
      const handleMouseEnter = () => setIsVisible(true);

      document.addEventListener("mousemove", updatePosition);
      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("mouseenter", handleMouseEnter);

      return () => {
        document.removeEventListener("mousemove", updatePosition);
        document.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mouseleave", handleMouseLeave);
        document.removeEventListener("mouseenter", handleMouseEnter);
        window.removeEventListener("resize", checkIfMobile);
      };
    }

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [isMobile]);

  // Don't render anything if on mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Game Cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isClicking ? 0.9 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 1500,
          damping: 50,
          mass: 0.2,
        }}
      >
        <div className="relative w-8 h-8">
          <Image
            src="/images/Cursor.png"
            alt="Cursor"
            width={32}
            height={32}
            className="w-full h-full"
            style={{ imageRendering: "pixelated" }}
          />
          <AnimatePresence>
            {isClicking && (
              <motion.div
                className="absolute inset-0 rounded-full bg-[#f85c70] mix-blend-overlay"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.5, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Click Effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="fixed pointer-events-none z-40"
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              left: position.x,
              top: position.y,
              x: "-50%",
              y: "-50%",
            }}
          >
            <div className="w-8 h-8 rounded-full border-2 border-[#f85c70]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cursor Trail Effect */}
      <motion.div
        className="fixed w-1 h-1 rounded-full bg-[#f85c70]/30 pointer-events-none z-40 mix-blend-screen"
        animate={{
          x: position.x,
          y: position.y,
          scale: isClicking ? 2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 2000,
          damping: 50,
          mass: 0.1,
        }}
        style={{
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 10px rgba(248, 92, 112, 0.3)",
        }}
      />
    </>
  );
};

export default CustomCursor;
