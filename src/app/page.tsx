"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const sections = gsap.utils.toArray(".section");
    sections.forEach((section: any) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    });
  }, []);

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: "spring", stiffness: 75, damping: 15 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-purple-900/30" />
        </motion.div>

        <div className="relative z-10 text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-orbitron font-bold mb-6 text-red-500"
            {...fadeIn}
          >
            20 Minutes Till Dawn
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-space-grotesk mb-8 text-gray-300"
            {...fadeIn}
            transition={{ delay: 0.2 }}
          >
            Advanced Programming Course Project
          </motion.p>
        </div>
      </div>

      {/* Project Details Section */}
      <section
        ref={containerRef}
        className="section py-20 px-4 md:px-8 max-w-6xl mx-auto"
      >
        <motion.h2
          className="text-4xl font-orbitron font-bold mb-12 text-center"
          {...fadeIn}
        >
          Project Overview
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="bg-gray-900/50 p-8 rounded-lg backdrop-blur-sm"
            {...fadeIn}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-orbitron mb-4 text-red-400">
              Game Description
            </h3>
            <p className="font-space-grotesk text-gray-300">
              20 Minutes Till Dawn is a roguelite survival game where you must
              survive waves of cosmic horrors for 20 minutes. Your task is to
              recreate this game using Java and its graphics libraries.
            </p>
          </motion.div>
          <motion.div
            className="bg-gray-900/50 p-8 rounded-lg backdrop-blur-sm"
            {...fadeIn}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-orbitron mb-4 text-red-400">
              Technical Requirements
            </h3>
            <ul className="font-space-grotesk text-gray-300 list-disc list-inside space-y-2">
              <li>Java Graphics Implementation</li>
              <li>Object-Oriented Design</li>
              <li>Game State Management</li>
              <li>Event Handling System</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Download Section */}
      <section className="section py-20 px-4 md:px-8 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-orbitron font-bold mb-12 text-center"
            {...fadeIn}
          >
            Download Assets
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-3 gap-8"
            {...fadeIn}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm hover:bg-black/70 transition-all">
              <h3 className="text-xl font-orbitron mb-4 text-red-400">
                Sprites & Animations
              </h3>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-space-grotesk transition-colors">
                Download
              </button>
            </div>
            <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm hover:bg-black/70 transition-all">
              <h3 className="text-xl font-orbitron mb-4 text-red-400">
                Sound Effects
              </h3>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-space-grotesk transition-colors">
                Download
              </button>
            </div>
            <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm hover:bg-black/70 transition-all">
              <h3 className="text-xl font-orbitron mb-4 text-red-400">
                Project Template
              </h3>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-space-grotesk transition-colors">
                Download
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="section py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-orbitron font-bold mb-12 text-center"
          {...fadeIn}
        >
          Project Policies
        </motion.h2>
        <motion.div
          className="bg-gray-900/50 p-8 rounded-lg backdrop-blur-sm"
          {...fadeIn}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-6 font-space-grotesk text-gray-300">
            <div>
              <h3 className="text-2xl font-orbitron mb-4 text-red-400">
                Submission Guidelines
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Project must be submitted through the course portal</li>
                <li>Include comprehensive documentation</li>
                <li>All code must be original and properly commented</li>
                <li>Submit before the specified deadline</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-orbitron mb-4 text-red-400">
                Evaluation Criteria
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Code quality and organization (30%)</li>
                <li>Game functionality and features (40%)</li>
                <li>Performance optimization (15%)</li>
                <li>Documentation and presentation (15%)</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
