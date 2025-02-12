"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                     w-full max-w-3xl"
          >
            <div className="relative mx-4">
              {/* Modal Border Effects */}
              <div className="absolute -inset-1">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-red-500/20 blur-lg opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-red-500/20 blur-lg opacity-50 animate-pulse" />
              </div>

              {/* Modal Content */}
              <div className="relative bg-black/95 backdrop-blur-xl border border-red-500/30 rounded-lg overflow-hidden">
                {/* Modal Header */}
                <div className="px-8 py-5 border-b border-red-500/30 bg-black/50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-orbitron text-red-400 text-glow tracking-wider">
                      {title}
                    </h2>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-white transition-colors"
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
                <div className="p-8">
                  <div className="relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,0,0,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-20" />

                    {/* Content */}
                    <div className="relative">{children}</div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-8 py-5 border-t border-red-500/30 bg-black/50">
                  <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="pixel-button">
                      <div className="pixel-button-content">
                        <span className="text-white font-space-grotesk">
                          Cancel
                        </span>
                      </div>
                    </button>
                    <button onClick={onClose} className="pixel-button enhanced">
                      <div className="pixel-button-content">
                        <span className="text-white font-space-grotesk">
                          Confirm
                        </span>
                      </div>
                    </button>
                  </div>
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
