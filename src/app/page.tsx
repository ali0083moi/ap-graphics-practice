"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import HeroCard from "@/components/HeroCard";
import GameModal from "@/components/GameModal";
import EnhancedBackground from "@/components/EnhancedBackground";
import MiniGame from "@/components/MiniGame";
import ProjectRequirements from "@/components/ProjectRequirements";
import ScoreOverview from "@/components/ScoreOverview";
import FloatingNav from "@/components/FloatingNav";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import SpotlightEffect from "@/components/SpotlightEffect";

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
  const [isLoaded, setIsLoaded] = useState(false);

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

  // Add effect to handle page loaded state
  useEffect(() => {
    // Set loaded after all resources have loaded
    window.addEventListener("load", () => {
      setIsLoaded(true);
    });

    // If resources are already loaded
    if (document.readyState === "complete") {
      setIsLoaded(true);
    }

    return () => {
      window.removeEventListener("load", () => {
        setIsLoaded(true);
      });
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Add loading screen */}
      <LoadingScreen />

      {/* Add custom cursor */}
      <CustomCursor />

      {/* Add scroll progress bar */}
      <ScrollProgress />

      {/* Add floating navigation */}
      <FloatingNav />

      {/* Use enhanced background instead of GameBackground */}
      <EnhancedBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          className="relative z-10 text-center"
          style={{ opacity, scale, y }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 50 }}
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
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Advanced Programming Course Practice
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
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
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-red-500/50 flex justify-center">
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
          <motion.h2
            className="text-4xl md:text-5xl font-orbitron font-bold mb-16 text-center text-glow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Practice Overview
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <SpotlightEffect className="glass p-8 rounded-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-orbitron mb-4 text-red-400 text-glow relative z-10">
                  Practice TAs
                </h3>
                <p className="font-space-grotesk text-gray-300 relative z-10">
                  Ali Moghadasi
                  <br></br>
                  Amir Hossein Vahidi Tabar
                </p>
              </SpotlightEffect>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <SpotlightEffect className="glass p-8 rounded-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-orbitron mb-4 text-red-400 text-glow relative z-10">
                  Practice Description
                </h3>
                <ul className="font-space-grotesk text-gray-300 list-disc list-inside space-y-2 relative z-10">
                  <li>Deadline: Ordibehesht 23rd</li>
                  <li>Libraries to use: JavaFX | LibGDX</li>
                  <li>Course: Advanced Programming</li>
                </ul>
              </SpotlightEffect>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Requirements Section */}
      <section
        id="project-requirements"
        className="section relative py-32 px-4"
      >
        <ProjectRequirements />
      </section>

      {/* Score Overview Section */}
      <section id="score-overview" className="section relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-orbitron font-bold mb-16 text-center text-glow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Score Overview
          </motion.h2>
          <motion.div
            className="glass p-8 rounded-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <ScoreOverview />
          </motion.div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download-section" className="section relative py-32 px-4">
        <div className="absolute inset-0" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-orbitron font-bold mb-16 text-center text-glow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Download Assets
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <SpotlightEffect className="glass p-8 rounded-lg relative overflow-hidden group">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10
                           opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <h3 className="text-xl font-orbitron mb-4 text-red-400 text-glow relative z-10">
                  Sprites & Graphical Assets
                </h3>
                <p className="text-gray-300 mb-6 font-space-grotesk relative z-10">
                  Download all game sprites and graphical assets.
                </p>
                <button className="pixel-button enhanced">
                  <div className="pixel-button-content">
                    <a
                      href="https://drive.google.com/file/d/1HCYoMEc_qsToT0NqknV1YjTy5tqLx5uK/view?usp=sharing"
                      className="text-white font-space-grotesk"
                    >
                      Download
                    </a>
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
              </SpotlightEffect>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <SpotlightEffect className="glass p-8 rounded-lg relative overflow-hidden group">
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
                    <a
                      href="https://drive.google.com/file/d/11uMZZqMJjVIDYu636e49tFRuivwBX8vb/view?usp=sharing"
                      className="text-white font-space-grotesk"
                    >
                      Download
                    </a>
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
              </SpotlightEffect>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <SpotlightEffect className="glass p-8 rounded-lg relative overflow-hidden group">
                <div
                  className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10
                           opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <h3 className="text-xl font-orbitron mb-4 text-red-400 text-glow relative z-10">
                  Fonts
                </h3>
                <p className="text-gray-300 mb-6 font-space-grotesk relative z-10">
                  Get all of the game fonts.
                </p>
                <button className="pixel-button enhanced">
                  <div className="pixel-button-content">
                    <a
                      href="https://drive.google.com/file/d/1gyMdO0_hFGNS_RmDP56M8M6Fu-gelVpy/view?usp=sharing"
                      className="text-white font-space-grotesk"
                    >
                      Download
                    </a>
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
              </SpotlightEffect>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mini Game Section */}
      <section
        id="game-section"
        ref={gameRef}
        className="section relative py-32 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl font-orbitron font-bold mb-8 text-center text-glow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Try The Game
          </motion.h2>
          <motion.p
            className="text-xl text-center text-gray-400 mb-12 font-space-grotesk"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Click and drag to shoot at the enemies!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <MiniGame isSectionVisible={isGameVisible} />
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#18101e] to-transparent opacity-50" />

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
    </main>
  );
}
