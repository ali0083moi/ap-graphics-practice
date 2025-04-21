"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

const EnhancedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseMoveThrottle = useRef<NodeJS.Timeout | null>(null);
  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.5, 0.7, 0.8, 0.9]
  );
  const particleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Create particles for the background
  const particles = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.4,
      duration: 15 + Math.random() * 30,
      delay: Math.random() * -20,
    }));
  }, []);

  // Create glowing orbs that float around
  const glowingOrbs = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 80 + Math.random() * 120,
      opacity: 0.03 + Math.random() * 0.1,
      duration: 60 + Math.random() * 60,
      delay: Math.random() * -30,
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse movement to improve performance
      if (mouseMoveThrottle.current) return;

      mouseMoveThrottle.current = setTimeout(() => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 10;
        const y = (clientY / window.innerHeight - 0.5) * 10;
        setMousePosition({ x, y });
        mouseMoveThrottle.current = null;
      }, 16); // approximately 60fps
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseMoveThrottle.current) clearTimeout(mouseMoveThrottle.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          y: backgroundY,
          scale: 1.2,
        }}
      >
        <div
          className="absolute inset-0 bg-[url('/images/new/background.png')] bg-cover bg-center"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        />
      </motion.div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {glowingOrbs.map((orb) => (
          <motion.div
            key={orb.id}
            className="absolute rounded-full bg-[#f85c70]"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              opacity: orb.opacity,
              filter: "blur(60px)",
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: orb.delay,
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ opacity: particleOpacity }}
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-[#f85c70] rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              boxShadow: "0 0 10px rgba(248, 92, 112, 0.3)",
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(particle.id) * 20, 0],
              opacity: [
                particle.opacity,
                particle.opacity * 1.5,
                particle.opacity,
              ],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Overlay Gradients */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"
        style={{ opacity: overlayOpacity }}
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-5 mix-blend-overlay" />

      {/* Top Light Effect */}
      <div className="absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-[#f85c70]/10 to-transparent" />

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </div>
  );
};

export default EnhancedBackground;
