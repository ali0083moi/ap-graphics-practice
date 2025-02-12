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
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                     w-full max-w-2xl"
          >
            <div className="relative mx-4">
              {/* Modal Border Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-red-500/20 blur-lg" />

              {/* Modal Content */}
              <div
                className="relative bg-gray-900/90 backdrop-blur-md border border-red-500/30
                          rounded-lg overflow-hidden"
              >
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-red-500/30 bg-black/50">
                  <h2 className="text-2xl font-orbitron text-red-400 text-glow">
                    {title}
                  </h2>
                </div>

                {/* Modal Body */}
                <div className="p-6">{children}</div>

                {/* Modal Footer */}
                <div className="px-6 py-4 border-t border-red-500/30 bg-black/50 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white
                             rounded-full font-space-grotesk transition-colors
                             hover-glow"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GameModal;
