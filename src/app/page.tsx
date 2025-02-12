"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import HeroCard from "@/components/HeroCard";
import GameModal from "@/components/GameModal";
import GameBackground from "@/components/GameBackground";
import MiniGame from "@/components/MiniGame";

gsap.registerPlugin(ScrollTrigger);

const heroes = [
  {
    id: 1,
    image: "/images/hero1.png",
    name: "Scarlett",
    description:
      "A skilled marksman with enhanced reflexes and precision shooting abilities.",
    stats: { health: 100, speed: 85, damage: 90 },
    level: 3,
  },
  {
    id: 2,
    image: "/images/hero2.png",
    name: "Shadow",
    description: "Master of stealth with the power to manipulate darkness.",
    stats: { health: 80, speed: 95, damage: 85 },
    level: 2,
  },
  {
    id: 3,
    image: "/images/hero3.png",
    name: "Nova",
    description: "Wielder of cosmic energy and devastating area attacks.",
    stats: { health: 90, speed: 80, damage: 95 },
    level: 4,
  },
  {
    id: 4,
    image: "/images/hero4.png",
    name: "Frost",
    description: "Controls ice and creates defensive barriers.",
    unlocked: false,
    stats: { health: 120, speed: 70, damage: 75 },
  },
  {
    id: 5,
    image: "/images/hero5.png",
    name: "Phoenix",
    description: "Harnesses fire and regenerative abilities.",
    unlocked: false,
    stats: { health: 95, speed: 85, damage: 85 },
  },
  {
    id: 6,
    image: "/images/hero6.png",
    name: "Volt",
    description: "Lightning-fast attacks and electromagnetic powers.",
    stats: { health: 85, speed: 100, damage: 80 },
    level: 1,
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHero, setSelectedHero] = useState<(typeof heroes)[0] | null>(
    null
  );
  const [isGameVisible, setIsGameVisible] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

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

  // Add intersection observer for game section
  useEffect(() => {
    if (!gameRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsGameVisible(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    observer.observe(gameRef.current);

    return () => {
      if (gameRef.current) {
        observer.unobserve(gameRef.current);
      }
    };
  }, []);

  // Create fixed positions for particles
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      moveX: Math.random() * 100,
      moveY: Math.random() * 100,
      duration: 3 + Math.random() * 2,
    }));
  }, []);

  return (
    <main className="relative min-h-screen">
      <GameBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          className="relative z-10 text-center"
          style={{ opacity, scale, y }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8 relative"
          >
            <Image
              src="/images/20-minutes-till-dawn-logo.png"
              alt="20 Minutes Till Dawn"
              width={700}
              height={250}
              className="mx-auto"
              priority
            />
            <div className="absolute inset-0" />
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl font-space-grotesk mb-8 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Advanced Programming Course Project
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => {
                const element = document.getElementById("project-overview");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="pixel-button enhanced"
            >
              <div className="pixel-button-content">
                <span className="text-white font-space-grotesk">
                  Learn More
                </span>
              </div>
            </button>

            <button
              onClick={() => {
                const element = document.getElementById("heroes");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="pixel-button"
            >
              <div className="pixel-button-content">
                <span className="text-white font-space-grotesk">
                  View Heroes
                </span>
              </div>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-red-500/50 flex justify-center p-2">
            <motion.div
              className="w-1 h-1 bg-red-500 rounded-full"
              animate={{
                y: [0, 16, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Project Overview Section */}
      <section id="project-overview" className="section relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-16 text-center text-glow">
            Project Overview
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="glass p-8 rounded-lg relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-orbitron mb-4 text-red-400 text-glow relative z-10">
                Game Description
              </h3>
              <p className="font-space-grotesk text-gray-300 relative z-10">
                20 Minutes Till Dawn is a roguelite survival game where you must
                survive waves of cosmic horrors for 20 minutes. Your task is to
                recreate this game using Java and its graphics libraries.
              </p>
            </motion.div>

            <motion.div
              className="glass p-8 rounded-lg relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-orbitron mb-4 text-red-400 text-glow relative z-10">
                Technical Requirements
              </h3>
              <ul className="font-space-grotesk text-gray-300 list-disc list-inside space-y-2 relative z-10">
                <li>Java Graphics Implementation</li>
                <li>Object-Oriented Design</li>
                <li>Game State Management</li>
                <li>Event Handling System</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Heroes Section */}
      <section id="heroes" className="section relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-16 text-center text-glow">
            Available Heroes
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {heroes.map((hero) => (
              <div
                key={hero.id}
                onClick={() => {
                  setSelectedHero(hero);
                  setIsModalOpen(true);
                }}
              >
                <HeroCard
                  heroImage={hero.image}
                  name={hero.name}
                  description={hero.description}
                  unlocked={hero.unlocked !== false}
                  level={hero.level}
                  stats={hero.stats}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="section relative py-32 px-4">
        <div className="absolute inset-0" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-16 text-center text-glow">
            Download Assets
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="glass p-8 rounded-lg hover:border-red-500/50 transition-all duration-300
                       relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10
                           opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <h3 className="text-xl font-orbitron mb-4 text-red-400 text-glow relative z-10">
                Sprites & Animations
              </h3>
              <p className="text-gray-300 mb-6 font-space-grotesk relative z-10">
                Download all game sprites and animation assets.
              </p>
              <button className="pixel-button enhanced">
                <div className="pixel-button-content">
                  <span className="text-white font-space-grotesk">
                    Download
                  </span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </div>
              </button>
            </motion.div>

            <motion.div
              className="glass p-8 rounded-lg hover:border-red-500/50 transition-all duration-300
                       relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10
                           opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <h3 className="text-xl font-orbitron mb-4 text-red-400 text-glow relative z-10">
                Sound Effects
              </h3>
              <p className="text-gray-300 mb-6 font-space-grotesk relative z-10">
                Get all sound effects and music files.
              </p>
              <button className="pixel-button enhanced">
                <div className="pixel-button-content">
                  <span className="text-white font-space-grotesk">
                    Download
                  </span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </div>
              </button>
            </motion.div>

            <motion.div
              className="glass p-8 rounded-lg hover:border-red-500/50 transition-all duration-300
                       relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10
                           opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <h3 className="text-xl font-orbitron mb-4 text-red-400 text-glow relative z-10">
                Project Template
              </h3>
              <p className="text-gray-300 mb-6 font-space-grotesk relative z-10">
                Start with our base project template.
              </p>
              <button className="pixel-button enhanced">
                <div className="pixel-button-content">
                  <span className="text-white font-space-grotesk">
                    Download
                  </span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mini Game Section */}
      <section ref={gameRef} className="section relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-16 text-center text-glow">
            Try The Game
          </motion.h2>
          <motion.p className="text-xl text-center text-gray-400 mb-12 font-space-grotesk">
            Click and drag to shoot at the enemies!
          </motion.p>
          <MiniGame isSectionVisible={isGameVisible} />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#18101e] to-transparent opacity-50" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-[#f85c70] rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                x: [0, (particle.moveX % 30) - 15, 0],
                y: [0, (particle.moveY % 30) - 15, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <Image
                src="/images/20-minutes-till-dawn-logo.png"
                alt="20 Minutes Till Dawn"
                width={200}
                height={71}
                className="mx-auto opacity-50 hover:opacity-100 transition-opacity"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4"
            >
              <p className="text-gray-400 font-space-grotesk">
                Developed by{" "}
                <a
                  href="https://github.com/ali0083moi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f85c70] hover:text-[#ff99a6] transition-colors font-semibold relative group"
                >
                  Ali Moghadasi
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#f85c70] group-hover:w-full transition-all duration-300" />
                </a>
              </p>

              <div className="flex items-center gap-4">
                <motion.a
                  href="https://github.com/ali0083moi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#f85c70] transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                    />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Hero Modal */}
      <GameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedHero?.name || ""}
      >
        {selectedHero && (
          <div className="flex flex-col items-center p-6 select-none">
            <div className="relative w-64 h-64 mb-8 flex-shrink-0">
              <Image
                src={selectedHero.image}
                alt={selectedHero.name}
                fill
                className="object-contain"
                style={{ imageRendering: "pixelated" }}
                priority
                draggable={false}
              />
              {selectedHero.level && (
                <div
                  className="absolute top-4 right-4 bg-red-500/90 text-white px-3 py-1
                            rounded-full font-orbitron text-sm shadow-lg backdrop-blur-sm"
                >
                  Level {selectedHero.level}
                </div>
              )}
            </div>

            <p className="text-gray-300 font-space-grotesk text-center mb-8 max-w-lg">
              {selectedHero.description}
            </p>

            <div className="w-full max-w-md space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm font-space-grotesk text-gray-400">
                  <span>Health</span>
                  <span>{selectedHero.stats.health}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedHero.stats.health}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm font-space-grotesk text-gray-400">
                  <span>Speed</span>
                  <span>{selectedHero.stats.speed}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedHero.stats.speed}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm font-space-grotesk text-gray-400">
                  <span>Damage</span>
                  <span>{selectedHero.stats.damage}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedHero.stats.damage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </GameModal>
    </main>
  );
}
