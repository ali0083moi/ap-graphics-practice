"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroCardProps {
  heroImage: string;
  name: string;
  description: string;
  unlocked?: boolean;
  level?: number;
  stats?: {
    health: number;
    speed: number;
    damage: number;
  };
}

const HeroCard = ({
  heroImage,
  name,
  description,
  unlocked = true,
  level,
  stats,
}: HeroCardProps) => {
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{
        duration: 0.3,
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 25,
        },
      }}
    >
      <div
        className={`
          game-card
          ${unlocked ? "border-[#f85c70]/40" : "border-[#2e3b52]/30"}
          transition-all duration-500 ease-in-out
          group-hover:border-[#f85c70]/60
          group-hover:shadow-[0_0_30px_rgba(248,92,112,0.15)]
        `}
      >
        <div className="relative h-64 w-full overflow-hidden">
          {/* Image Overlay Gradient */}
          <div
            className={`
              absolute inset-0 z-10 transition-opacity duration-500
              bg-gradient-to-b from-transparent via-[#2b2436]/40 to-[#2b2436]/90
              group-hover:opacity-0
            `}
          />

          {/* Hero Image */}
          <Image
            src={heroImage}
            alt={name}
            fill
            className={`
              object-contain p-4
              ${
                unlocked
                  ? "brightness-110 contrast-125"
                  : "brightness-25 grayscale"
              }
              transition-all duration-500 ease-in-out
              group-hover:scale-105
              ${
                unlocked
                  ? "group-hover:brightness-125 group-hover:contrast-150"
                  : ""
              }
            `}
            style={{ imageRendering: "pixelated" }}
          />

          {/* Enhanced Badge */}
          {unlocked && level && (
            <div className="absolute top-3 right-3 z-20">
              <div className="pixel-button-count bg-[#f85c70] text-white">
                E
              </div>
            </div>
          )}

          {/* Level Badge */}
          {unlocked && level && (
            <div className="absolute top-3 left-3 z-20">
              <div className="px-2 py-1 bg-[#2b2436]/90 border border-[#f85c70]/40 rounded-sm">
                <span className="font-mono text-[#f85c70] text-sm">
                  Lvl {level}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 bg-gradient-to-t from-[#2b2436] via-[#2b2436]/95 to-transparent">
          <h3
            className={`
              text-xl font-orbitron mb-2
              ${unlocked ? "text-[#f85c70]" : "text-[#2e3b52]"}
              transition-all duration-300
              ${unlocked ? "text-shadow-game" : ""}
              group-hover:text-[#f85c70]
            `}
          >
            {name}
          </h3>
          <p className="text-sm font-space-grotesk text-[#f5dbc9]/90 line-clamp-2 group-hover:text-[#f5dbc9] transition-colors duration-300">
            {description}
          </p>

          {/* Stats */}
          {unlocked && stats && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#f5dbc9]/70">ATK</span>
                <div className="w-32 h-1 bg-[#1a1621] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.damage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-[#f85c70]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#f5dbc9]/70">SPD</span>
                <div className="w-32 h-1 bg-[#1a1621] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.speed}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-[#4a9eff]"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#f5dbc9]/70">HP</span>
                <div className="w-32 h-1 bg-[#1a1621] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.health}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-[#50fa7b]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Locked Overlay */}
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#2b2436]/90 backdrop-blur-sm">
            <div className="flex flex-col items-center">
              <svg
                className="w-8 h-8 mb-2 text-[#f85c70] animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m0 0v2m0-2h2m-2 0H10m8-6a8 8 0 11-16 0 8 8 0 0116 0z"
                />
              </svg>
              <span className="font-orbitron text-[#f85c70] tracking-wider text-shadow-game">
                LOCKED
              </span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HeroCard;
