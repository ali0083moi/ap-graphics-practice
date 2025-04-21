"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRequirements } from "@/context/RequirementsContext";
import { requirements } from "./ProjectRequirements";

// Custom event name for syncing requirements changes
const REQUIREMENTS_UPDATED_EVENT = "requirementsUpdated";

// Create a custom event dispatcher for the requirements update
export const dispatchRequirementsUpdated = (updatedRequirements: string[]) => {
  // Use a custom event to notify all components about the update
  if (typeof window !== "undefined") {
    const event = new CustomEvent(REQUIREMENTS_UPDATED_EVENT, {
      detail: { updatedRequirements },
    });
    window.dispatchEvent(event);
  }
};

interface Requirement {
  id: string;
  title: string;
  persian_title: string;
  description: string;
  persian_description: string;
  score: number;
  is_optional: boolean;
  category: string;
}

interface CategoryWithScores {
  id: string;
  title: string;
  icon: string;
  description: string;
  required: number;
  requiredCompleted: number;
  optional: number;
  optionalCompleted: number;
  total: number;
  completed: number;
}

// Constants
const COMPLETED_REQUIREMENTS_KEY = "graphic_app_completed_requirements";

// Categories with icons
const categories = [
  {
    id: "signup",
    title: "Sign Up",
    icon: "📝",
    description: "User registration and authentication",
  },
  {
    id: "controls",
    title: "Game Controls",
    icon: "🎮",
    description: "Game control mechanics and key bindings",
  },
  {
    id: "enemies",
    title: "Enemies",
    icon: "👾",
    description: "Enemy types and behavior mechanics",
  },
  {
    id: "character",
    title: "Character",
    icon: "🦸",
    description: "Character mechanics and progression",
  },
  {
    id: "weapons",
    title: "Weapons",
    icon: "🔫",
    description: "Weapon systems and mechanics",
  },
  {
    id: "abilities",
    title: "Abilities",
    icon: "⚡",
    description: "Character abilities and power-ups",
  },
  {
    id: "game_end",
    title: "Game End",
    icon: "🏁",
    description: "Game ending conditions and mechanics",
  },
  {
    id: "game_save",
    title: "Game Save",
    icon: "💾",
    description: "Game save and load functionality",
  },
  {
    id: "cheat_codes",
    title: "Cheat Codes",
    icon: "🎮",
    description: "Game cheat codes and special commands",
  },
  {
    id: "visual_details",
    title: "Visual Details",
    icon: "🎨",
    description: "Game visual elements and animations",
  },
];

export default function ScoreOverview() {
  // Use the shared context instead of local state
  const { completedRequirements, loading } = useRequirements();
  const [loadError, setLoadError] = useState<string | null>(null);

  // Calculate completed scores for a category
  const calculateCategoryScores = (categoryId: string) => {
    const categoryReqs = requirements.filter(
      (req) => req.category.toLowerCase() === categoryId
    );

    const completed = categoryReqs
      .filter((req) => completedRequirements.includes(req.id))
      .reduce((sum, req) => sum + req.score, 0);

    const total = categoryReqs.reduce((sum, req) => sum + req.score, 0);

    const optionalCompleted = categoryReqs
      .filter(
        (req) => req.is_optional && completedRequirements.includes(req.id)
      )
      .reduce((sum, req) => sum + req.score, 0);

    const requiredCompleted = completed - optionalCompleted;

    const optionalTotal = categoryReqs
      .filter((req) => req.is_optional)
      .reduce((sum, req) => sum + req.score, 0);

    const requiredTotal = total - optionalTotal;

    return {
      completed,
      total,
      optionalCompleted,
      optionalTotal,
      requiredCompleted,
      requiredTotal,
    };
  };

  // Calculate total completed scores
  const calculateTotalScores = () => {
    const completed = requirements
      .filter((req) => completedRequirements.includes(req.id))
      .reduce((sum, req) => sum + req.score, 0);

    const total = requirements.reduce((sum, req) => sum + req.score, 0);

    const optionalCompleted = requirements
      .filter(
        (req) => req.is_optional && completedRequirements.includes(req.id)
      )
      .reduce((sum, req) => sum + req.score, 0);

    const requiredCompleted = completed - optionalCompleted;

    const optionalTotal = requirements
      .filter((req) => req.is_optional)
      .reduce((sum, req) => sum + req.score, 0);

    const requiredTotal = total - optionalTotal;

    return {
      completed,
      total,
      optionalCompleted,
      optionalTotal,
      requiredCompleted,
      requiredTotal,
    };
  };

  const scores = calculateTotalScores();

  // Override scores with the fixed values
  const csvScores = {
    requiredTotal: 1015,
    optionalTotal: 320,
    total: 1335,
    requiredCompleted: scores.requiredCompleted,
    optionalCompleted: scores.optionalCompleted,
    completed: scores.completed,
  };

  const categoryScores = categories
    .filter((cat) => cat.id !== "score-overview")
    .map((category) => {
      const catScores = calculateCategoryScores(category.id);
      return {
        ...category,
        required: catScores.requiredTotal,
        requiredCompleted: catScores.requiredCompleted,
        optional: catScores.optionalTotal,
        optionalCompleted: catScores.optionalCompleted,
        total: catScores.total,
        completed: catScores.completed,
      };
    })
    .filter((cat) => cat.required > 0 || cat.optional > 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-white flex items-center gap-3">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading saved progress...
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="px-6 py-3 rounded-xl bg-red-500/20 text-red-400 text-sm font-space-grotesk flex items-center gap-3 backdrop-blur-sm border border-red-500/20">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"
            fill="currentColor"
          />
        </svg>
        {loadError}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Total Score Overview */}
      <div className="grid md:grid-cols-3 gap-8">
        <motion.div
          className="glass p-8 rounded-xl relative overflow-hidden shadow-glow"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.1)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-[#f85c70]/10" />
          <h4 className="text-2xl font-orbitron mb-6 text-green-400 text-center">
            Required Score
          </h4>
          <div className="flex justify-center items-center gap-2">
            <p className="text-5xl font-space-grotesk text-center text-white">
              {scores.requiredCompleted}
            </p>
            <p className="text-2xl font-space-grotesk text-center text-gray-400">
              / {csvScores.requiredTotal}
            </p>
          </div>
          {/* Progress Bar */}
          <div className="mt-6 h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-600 to-green-400"
              initial={{ width: 0 }}
              animate={{
                width: `${
                  (scores.requiredCompleted / csvScores.requiredTotal) * 100
                }%`,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-xl relative overflow-hidden shadow-glow"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 20px 25px -5px rgba(168, 85, 247, 0.1)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-[#f85c70]/10" />
          <h4 className="text-2xl font-orbitron mb-6 text-purple-400 text-center">
            Optional Score
          </h4>
          <div className="flex justify-center items-center gap-2">
            <p className="text-5xl font-space-grotesk text-center text-white">
              {scores.optionalCompleted}
            </p>
            <p className="text-2xl font-space-grotesk text-center text-gray-400">
              / {csvScores.optionalTotal}
            </p>
          </div>
          {/* Progress Bar */}
          <div className="mt-6 h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
              initial={{ width: 0 }}
              animate={{
                width: `${
                  (scores.optionalCompleted / csvScores.optionalTotal) * 100
                }%`,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-xl relative overflow-hidden shadow-glow"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 20px 25px -5px rgba(248, 92, 112, 0.1)",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#f85c70]/10 to-blue-500/10" />
          <h4 className="text-2xl font-orbitron mb-6 text-[#f85c70] text-center">
            Total Score
          </h4>
          <div className="flex justify-center items-center gap-2">
            <p className="text-5xl font-space-grotesk text-center text-white">
              {scores.completed}
            </p>
            <p className="text-2xl font-space-grotesk text-center text-gray-400">
              / {csvScores.total}
            </p>
          </div>
          {/* Progress Bar */}
          <div className="mt-6 h-3 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#f85c70]/60 to-[#f85c70]"
              initial={{ width: 0 }}
              animate={{
                width: `${(scores.completed / csvScores.total) * 100}%`,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Category Breakdown */}
      <div>
        <motion.h3
          className="text-3xl font-orbitron text-[#f85c70] mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Score Breakdown by Category
        </motion.h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryScores.map((category, idx) => (
            <motion.div
              key={category.id}
              className="glass p-6 rounded-xl relative overflow-hidden group"
              whileHover={{ scale: 1.03, y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#f85c70]/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h4 className="text-xl font-orbitron text-[#f85c70]">
                  {category.title}
                </h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-space-grotesk">
                    Required
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-green-600 to-green-400"
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            category.required > 0
                              ? `${
                                  (category.requiredCompleted /
                                    category.required) *
                                  100
                                }%`
                              : "0%",
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-green-400 font-space-grotesk">
                      {category.requiredCompleted}/{category.required}
                    </span>
                  </div>
                </div>
                {category.optional > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-space-grotesk">
                      Optional
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-600 to-purple-400"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${
                              (category.optionalCompleted / category.optional) *
                              100
                            }%`,
                          }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-purple-400 font-space-grotesk">
                        {category.optionalCompleted}/{category.optional}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom highlight */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f85c70] to-transparent opacity-0 group-hover:opacity-70 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Debugging - Show current completed requirements */}
      <div className="mt-8 text-xs text-gray-500 hidden">
        <pre>{JSON.stringify(completedRequirements, null, 2)}</pre>
      </div>
    </div>
  );
}
