"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import HeroCard from "@/components/HeroCard";
import GameModal from "@/components/GameModal";

gsap.registerPlugin(ScrollTrigger);

const heroes = [
  {
    id: 1,
    image: "/images/hero1.png",
    name: "Scarlett",
    description:
      "A skilled marksman with enhanced reflexes and precision shooting abilities.",
  },
  {
    id: 2,
    image: "/images/hero2.png",
    name: "Shadow",
    description: "Master of stealth with the power to manipulate darkness.",
  },
  {
    id: 3,
    image: "/images/hero3.png",
    name: "Nova",
    description: "Wielder of cosmic energy and devastating area attacks.",
  },
  {
    id: 4,
    image: "/images/hero4.png",
    name: "Frost",
    description: "Controls ice and creates defensive barriers.",
    unlocked: false,
  },
  {
    id: 5,
    image: "/images/hero5.png",
    name: "Phoenix",
    description: "Harnesses fire and regenerative abilities.",
    unlocked: false,
  },
  {
    id: 6,
    image: "/images/hero6.png",
    name: "Volt",
    description: "Lightning-fast attacks and electromagnetic powers.",
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHero, setSelectedHero] = useState<(typeof heroes)[0] | null>(
    null
  );

  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
        <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
          <div className="absolute inset-0 bg-[url('/images/T_Shoggoth.png')] bg-repeat opacity-10 animate-pulse-slow" />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-purple-900/30" />
        </motion.div>

        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-8"
          >
            <Image
              src="/images/20-minutes-till-dawn-logo.png"
              alt="20 Minutes Till Dawn"
              width={600}
              height={200}
              className="mx-auto"
            />
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => {
                const element = document.getElementById("project-overview");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full
                       font-space-grotesk text-lg transition-all duration-300
                       hover:shadow-[0_0_15px_rgba(255,0,0,0.5)] hover-glow"
            >
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute left-10 top-1/4 opacity-30"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/images/enemy1.png"
            alt="Enemy"
            width={100}
            height={100}
          />
        </motion.div>
        <motion.div
          className="absolute right-10 bottom-1/4 opacity-30"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Image
            src="/images/T_FireballExplosion.png"
            alt="Effect"
            width={150}
            height={150}
          />
        </motion.div>
      </div>

      {/* Project Overview Section */}
      <section
        id="project-overview"
        className="section py-20 px-4 md:px-8 max-w-6xl mx-auto"
      >
        <motion.h2 className="text-4xl font-orbitron font-bold mb-12 text-center text-glow">
          Project Overview
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            className="glass p-8 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-orbitron mb-4 text-red-400 text-glow">
              Game Description
            </h3>
            <p className="font-space-grotesk text-gray-300">
              20 Minutes Till Dawn is a roguelite survival game where you must
              survive waves of cosmic horrors for 20 minutes. Your task is to
              recreate this game using Java and its graphics libraries.
            </p>
          </motion.div>
          <motion.div
            className="glass p-8 rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-orbitron mb-4 text-red-400 text-glow">
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

      {/* Heroes Section */}
      <section className="section py-20 px-4 md:px-8 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-4xl font-orbitron font-bold mb-12 text-center text-glow">
            Available Heroes
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
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
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="section py-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/T_EyeBlink.png')] bg-repeat opacity-5" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 className="text-4xl font-orbitron font-bold mb-12 text-center text-glow">
            Download Assets
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="glass p-8 rounded-lg hover:border-red-500/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-orbitron mb-4 text-red-400 text-glow">
                Sprites & Animations
              </h3>
              <p className="text-gray-300 mb-4 font-space-grotesk">
                Download all game sprites and animation assets.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-space-grotesk transition-colors hover-glow">
                Download
              </button>
            </motion.div>
            <motion.div
              className="glass p-8 rounded-lg hover:border-red-500/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-orbitron mb-4 text-red-400 text-glow">
                Sound Effects
              </h3>
              <p className="text-gray-300 mb-4 font-space-grotesk">
                Get all sound effects and music files.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-space-grotesk transition-colors hover-glow">
                Download
              </button>
            </motion.div>
            <motion.div
              className="glass p-8 rounded-lg hover:border-red-500/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-orbitron mb-4 text-red-400 text-glow">
                Project Template
              </h3>
              <p className="text-gray-300 mb-4 font-space-grotesk">
                Start with our base project template.
              </p>
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-space-grotesk transition-colors hover-glow">
                Download
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Modal */}
      <GameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedHero?.name || ""}
      >
        {selectedHero && (
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 mb-6">
              <Image
                src={selectedHero.image}
                alt={selectedHero.name}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-300 font-space-grotesk text-center mb-6">
              {selectedHero.description}
            </p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="text-center p-4 glass rounded-lg">
                <span className="block text-red-400 font-orbitron mb-2">
                  Health
                </span>
                <span className="text-2xl font-space-grotesk">100</span>
              </div>
              <div className="text-center p-4 glass rounded-lg">
                <span className="block text-red-400 font-orbitron mb-2">
                  Speed
                </span>
                <span className="text-2xl font-space-grotesk">85</span>
              </div>
            </div>
          </div>
        )}
      </GameModal>
    </main>
  );
}
