"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const COMPLETED_REQUIREMENTS_KEY = "graphic_app_completed_requirements";

// Define the context shape
interface RequirementsContextType {
  completedRequirements: string[];
  toggleRequirement: (id: string) => void;
  resetProgress: () => void;
  loading: boolean;
}

// Create the context with a default value
const RequirementsContext = createContext<RequirementsContextType>({
  completedRequirements: [],
  toggleRequirement: () => {},
  resetProgress: () => {},
  loading: true,
});

// Hook to use the requirements context
export const useRequirements = () => useContext(RequirementsContext);

// Provider component that wraps the app
export const RequirementsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [completedRequirements, setCompletedRequirements] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  // Load completed requirements from localStorage on mount
  useEffect(() => {
    try {
      const savedRequirements = localStorage.getItem(
        COMPLETED_REQUIREMENTS_KEY
      );
      if (savedRequirements) {
        setCompletedRequirements(JSON.parse(savedRequirements));
      }
    } catch (error) {
      console.error("Error loading requirements from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save to localStorage whenever completedRequirements change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(
          COMPLETED_REQUIREMENTS_KEY,
          JSON.stringify(completedRequirements)
        );
        console.log(
          "Saved requirements to localStorage:",
          completedRequirements
        );
      } catch (error) {
        console.error("Error saving requirements to localStorage:", error);
      }
    }
  }, [completedRequirements, loading]);

  // Toggle a requirement's completion status
  const toggleRequirement = (id: string) => {
    setCompletedRequirements((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((reqId) => reqId !== id)
        : [...prev, id];

      console.log(`Toggled requirement ${id}. Updated list:`, updated);
      return updated;
    });
  };

  // Reset all progress
  const resetProgress = () => {
    setCompletedRequirements([]);
    try {
      localStorage.removeItem(COMPLETED_REQUIREMENTS_KEY);
    } catch (error) {
      console.error("Error resetting progress:", error);
    }
  };

  const contextValue = {
    completedRequirements,
    toggleRequirement,
    resetProgress,
    loading,
  };

  return (
    <RequirementsContext.Provider value={contextValue}>
      {children}
    </RequirementsContext.Provider>
  );
};
