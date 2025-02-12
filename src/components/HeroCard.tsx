"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroCardProps {
  heroImage: string;
  name: string;
  description: string;
  unlocked?: boolean;
}

const HeroCard = ({
  heroImage,
  name,
  description,
  unlocked = true,
}: HeroCardProps) => {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`
        relative overflow-hidden rounded-lg
        ${unlocked ? "bg-gray-900/50" : "bg-gray-900/20"}
        backdrop-blur-sm border border-red-500/20
        transition-all duration-300
        group-hover:border-red-500/50
        group-hover:shadow-[0_0_15px_rgba(255,0,0,0.3)]
      `}
      >
        <div className="relative h-64 w-full">
          <Image
            src={heroImage}
            alt={name}
            fill
            className={`
              object-contain p-4
              ${unlocked ? "brightness-100" : "brightness-50 grayscale"}
              transition-all duration-300
              group-hover:scale-110 group-hover:rotate-2
            `}
          />
        </div>
        <div className="p-4 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 w-full">
          <h3
            className={`
            text-xl font-orbitron mb-1
            ${unlocked ? "text-red-400" : "text-gray-500"}
            text-glow
          `}
          >
            {name}
          </h3>
          <p className="text-sm font-space-grotesk text-gray-300 line-clamp-2">
            {description}
          </p>
        </div>
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <span className="font-orbitron text-red-500 text-glow">Locked</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HeroCard;
