"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface SpotlightEffectProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightEffect = ({
  children,
  className = "",
}: SpotlightEffectProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Spotlight effect that follows cursor */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          background: isHovered
            ? "radial-gradient(circle 150px at center, rgba(248, 92, 112, 0.15), transparent)"
            : "none",
          left: mousePosition.x,
          top: mousePosition.y,
          width: 300,
          height: 300,
          x: -150,
          y: -150,
          opacity: isHovered ? 1 : 0,
          zIndex: 1,
          mixBlendMode: "screen",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Border glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-lg"
        style={{
          boxShadow: isHovered
            ? "0 0 15px 2px rgba(248, 92, 112, 0.3)"
            : "none",
          opacity: isHovered ? 1 : 0,
          zIndex: 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default SpotlightEffect;
