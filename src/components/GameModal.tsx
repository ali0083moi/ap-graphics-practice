"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const GameModal = ({ isOpen, onClose, title, children }: GameModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-30">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.3,
            }}
            className="relative w-[95%] max-w-3xl max-h-[90vh] mx-auto z-50"
          >
            {/* Modal Border Effects */}
            <div className="absolute -inset-[2px] z-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-[#f85c70]/20 via-[#f85c70]/10 to-[#f85c70]/20 animate-pulse" />
              <div className="absolute inset-0 bg-[#2b2436] opacity-50" />
            </div>

            {/* Modal Content */}
            <div className="game-card relative bg-[#2b2436]/95 backdrop-blur-xl border-2 border-[#f85c70]/30 overflow-hidden max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-[#f85c70]/20 bg-[#2b2436] flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-orbitron text-[#f85c70] tracking-wider text-shadow-game">
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-[#f5dbc9]/70 hover:text-[#f85c70] transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-grow overflow-y-auto">
                <div className="relative">
                  {/* Background Pattern */}
                  <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1' height='1' fill='%23f85c70' x='0' y='0'/%3E%3C/svg%3E")`,
                      backgroundSize: "20px 20px",
                      imageRendering: "pixelated",
                    }}
                  />

                  {/* Content */}
                  <div className="relative">{children}</div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-[#f85c70]/20 bg-[#2b2436] flex-shrink-0">
                <div className="flex justify-end gap-4">
                  <button onClick={onClose} className="pixel-button">
                    <div className="pixel-button-content">
                      <span className="text-[#f5dbc9] font-space-grotesk">
                        Close
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GameModal;
