"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

// Simplified version of requirements for this component
// In a real implementation, you'd import this from ProjectRequirements or fetch from API
export const requirements: Requirement[] = [
  // This is a placeholder - the actual requirements would come from the ProjectRequirements component
  // Visual Details
  {
    id: "character_light",
    title: "Character Light Radius",
    persian_title: "روشنایی اطراف کاراکتر",
    description: "Brighter area with specific radius around character",
    persian_description: "روشن تر بودن ناحیه ای با شعاع مشخص اطراف کاراکتر",
    score: 10,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "enemy_death_animation",
    title: "Enemy Death Animation",
    persian_title: "انیمیشن نابودی دشمن",
    description: "Show animation when enemies are destroyed",
    persian_description:
      "هنگامی که انمی ها ازبین می‌روند، انیمیشنی در همان نقطه نمایش داده شود که نابود شدن انمی را نمایش دهد",
    score: 15,
    is_optional: false,
    category: "visual_details",
  },
  {
    id: "enemy_knockback",
    title: "Enemy Knockback",
    persian_title: "عقب‌نشینی دشمن",
    description: "Enemies move slightly backward when hit",
    persian_description: "حرکت کوچک به عقب در صورت تیر خوردن انمی ها",
    score: 15,
    is_optional: true,
    category: "visual_details",
  },
  // Game Controls
  {
    id: "character_movement",
    title: "Basic Character Movement",
    persian_title: "حرکت پایه کاراکتر",
    description: "Character moves with WASD or arrow keys",
    persian_description:
      "کاراکتر با دکمه‌های WASD یا دکمه‌های جهت‌دار حرکت کند",
    score: 20,
    is_optional: false,
    category: "controls",
  },
  {
    id: "mouse_aim",
    title: "Mouse Aim",
    persian_title: "نشانه‌گیری با ماوس",
    description: "Character aims towards mouse cursor",
    persian_description: "کاراکتر به سمت مکان‌نمای ماوس نشانه‌گیری کند",
    score: 15,
    is_optional: false,
    category: "controls",
  },
  // Enemies
  {
    id: "enemy_spawn",
    title: "Enemy Spawning",
    persian_title: "ظاهر شدن دشمنان",
    description: "Enemies spawn randomly around character",
    persian_description: "دشمنان به صورت تصادفی اطراف کاراکتر ظاهر می‌شوند",
    score: 25,
    is_optional: false,
    category: "enemies",
  },
  {
    id: "enemy_ai",
    title: "Enemy AI Movement",
    persian_title: "حرکت هوشمند دشمنان",
    description: "Enemies move towards character",
    persian_description: "دشمنان به سمت کاراکتر حرکت می‌کنند",
    score: 30,
    is_optional: false,
    category: "enemies",
  },
  // Weapons
  {
    id: "basic_shooting",
    title: "Basic Shooting Mechanism",
    persian_title: "مکانیزم پایه شلیک",
    description: "Character shoots projectiles with mouse click",
    persian_description: "کاراکتر با کلیک ماوس پرتابه‌ها را شلیک می‌کند",
    score: 20,
    is_optional: false,
    category: "weapons",
  },
  {
    id: "weapon_reload",
    title: "Weapon Reload System",
    persian_title: "سیستم خشاب‌گذاری سلاح",
    description: "Weapons need to reload after emptying magazine",
    persian_description:
      "سلاح‌ها پس از خالی شدن خشاب نیاز به خشاب‌گذاری مجدد دارند",
    score: 15,
    is_optional: false,
    category: "weapons",
  },
  // In a complete implementation, you would add all requirements here
  // or import them from the ProjectRequirements component
];

export default function ScoreOverview() {
  const [completedRequirements, setCompletedRequirements] = useState<string[]>(
    []
  );
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [updateCounter, setUpdateCounter] = useState(0);

  // Function to check and update from localStorage (outside useEffect for reuse)
  const checkForUpdates = () => {
    try {
      const savedRequirements = localStorage.getItem(
        COMPLETED_REQUIREMENTS_KEY
      );

      if (savedRequirements) {
        const parsedRequirements = JSON.parse(savedRequirements);
        // Only update if there's a change
        if (
          JSON.stringify(parsedRequirements) !==
          JSON.stringify(completedRequirements)
        ) {
          console.log("Detected change in requirements, updating...");
          setCompletedRequirements(parsedRequirements);
        }
      } else if (completedRequirements.length > 0) {
        // Reset if data was cleared
        setCompletedRequirements([]);
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
    }
  };

  // Load completed requirements from localStorage on mount
  useEffect(() => {
    // Check if localStorage is available
    const isLocalStorageAvailable = () => {
      try {
        const testKey = "test_storage";
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    };

    if (!isLocalStorageAvailable()) {
      console.error("localStorage is not available in this browser");
      setLoadError("localStorage is not available in your browser.");
      setDataLoaded(true);
      return;
    }

    // Function to load requirements from localStorage
    const loadRequirementsFromStorage = () => {
      try {
        const savedRequirements = localStorage.getItem(
          COMPLETED_REQUIREMENTS_KEY
        );

        if (savedRequirements) {
          const parsedRequirements = JSON.parse(savedRequirements);
          setCompletedRequirements(parsedRequirements);
          setDataLoaded(true);
        } else {
          setCompletedRequirements([]);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error("Error loading saved requirements:", error);
        setLoadError(
          "Failed to load saved progress. Storage might be corrupted."
        );
        setDataLoaded(true);
      }
    };

    // Initial load
    loadRequirementsFromStorage();

    // Add storage event listener to detect changes from other components
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === COMPLETED_REQUIREMENTS_KEY) {
        console.log("Storage changed, updating score overview");
        loadRequirementsFromStorage();
      }
    };

    // Add the event listener
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Set up polling to check for updates periodically
  useEffect(() => {
    // Poll for changes every second
    const intervalId = setInterval(() => {
      checkForUpdates();
      // Force a re-render every 5 seconds regardless of detected changes
      setUpdateCounter((prevCounter) => (prevCounter + 1) % 5);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [completedRequirements]);

  // Add a focus event listener to check for updates when the user returns to the tab
  useEffect(() => {
    const handleFocus = () => {
      checkForUpdates();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [completedRequirements]);

  // Listen for custom requirements updated events
  useEffect(() => {
    const handleRequirementsUpdated = (event: CustomEvent) => {
      console.log(
        "Received requirements updated event with data",
        event.detail
      );
      if (event.detail && event.detail.updatedRequirements) {
        // Directly set the updated requirements from the event data
        setCompletedRequirements(event.detail.updatedRequirements);
      } else {
        // Fall back to checking localStorage if no data in event
        checkForUpdates();
      }
    };

    window.addEventListener(
      REQUIREMENTS_UPDATED_EVENT,
      handleRequirementsUpdated as EventListener
    );

    return () => {
      window.removeEventListener(
        REQUIREMENTS_UPDATED_EVENT,
        handleRequirementsUpdated as EventListener
      );
    };
  }, []);

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

  if (!dataLoaded) {
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
    </div>
  );
}
