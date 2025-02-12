"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface Enemy {
  id: number;
  x: number;
  y: number;
  health: number;
  rotation: number;
}

interface Bullet {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  timestamp: number;
}

interface MiniGameProps {
  isSectionVisible?: boolean;
}

const MiniGame = ({ isSectionVisible = true }: MiniGameProps) => {
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [playerHealth, setPlayerHealth] = useState(6);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [isCursorInGame, setIsCursorInGame] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const gameRef = useRef<HTMLDivElement>(null);
  const enemySpawnInterval = useRef<NodeJS.Timeout>();
  const bulletSpeed = 1200;
  const enemySpeed = 1; // Reduced enemy speed

  // Handle countdown
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setCountdown(null);
      setIsGamePaused(false);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  // Update game pause state when section visibility changes
  useEffect(() => {
    if (isGameStarted && !isGameOver) {
      setIsGamePaused(!isSectionVisible);
    }
  }, [isSectionVisible, isGameStarted, isGameOver]);

  // Add cursor position check
  useEffect(() => {
    const handleMouseEnter = () => setIsCursorInGame(true);
    const handleMouseLeave = () => {
      setIsCursorInGame(false);
      if (isGameStarted && !isGameOver) {
        setIsGamePaused(true);
      }
    };

    const gameElement = gameRef.current;
    if (gameElement) {
      gameElement.addEventListener("mouseenter", handleMouseEnter);
      gameElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (gameElement) {
        gameElement.removeEventListener("mouseenter", handleMouseEnter);
        gameElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isGameStarted, isGameOver]);

  // Add scroll detection
  useEffect(() => {
    const checkIfGameVisible = () => {
      if (!gameRef.current || !isGameStarted) return;

      const rect = gameRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      setIsGamePaused(!isVisible);
    };

    window.addEventListener("scroll", checkIfGameVisible);
    checkIfGameVisible(); // Initial check

    return () => window.removeEventListener("scroll", checkIfGameVisible);
  }, [isGameStarted]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gameRef.current) return;
      const rect = gameRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;
      setMousePosition({ x: newX, y: newY });
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!gameRef.current || isGameOver) return;
      const rect = gameRef.current.getBoundingClientRect();
      setIsDragging(true);
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!gameRef.current || !isDragging) return;
      const rect = gameRef.current.getBoundingClientRect();
      const endX = e.clientX - rect.left;
      const endY = e.clientY - rect.top;

      // Calculate the angle and distance for the bullet
      const angle = Math.atan2(endY - dragStart.y, endX - dragStart.x);
      const distance = 2000; // Long enough to reach the edge of the game area
      const targetX = dragStart.x + Math.cos(angle) * distance;
      const targetY = dragStart.y + Math.sin(angle) * distance;

      // Add a single bullet
      setBullets((prev) => [
        ...prev,
        {
          id: Date.now(),
          startX: dragStart.x,
          startY: dragStart.y,
          targetX,
          targetY,
          timestamp: Date.now(),
        },
      ]);

      setIsDragging(false);
    };

    const gameElement = gameRef.current;
    if (gameElement) {
      gameElement.addEventListener("mousemove", handleMouseMove);
      gameElement.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (gameElement) {
        gameElement.removeEventListener("mousemove", handleMouseMove);
        gameElement.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, [isDragging, isGameOver]);

  // Spawn enemies
  useEffect(() => {
    if (isGameOver || !isGameStarted || isGamePaused || !isCursorInGame) return;

    const spawnEnemy = () => {
      const side = Math.floor(Math.random() * 4);
      let x = 0;
      let y = 0;

      if (!gameRef.current) return;
      const width = gameRef.current.clientWidth;
      const height = gameRef.current.clientHeight;

      switch (side) {
        case 0: // top
          x = Math.random() * width;
          y = -50;
          break;
        case 1: // right
          x = width + 50;
          y = Math.random() * height;
          break;
        case 2: // bottom
          x = Math.random() * width;
          y = height + 50;
          break;
        case 3: // left
          x = -50;
          y = Math.random() * height;
          break;
      }

      setEnemies((prev) => [
        ...prev,
        {
          id: Date.now(),
          x,
          y,
          health: 100,
          rotation: Math.random() * 360,
        },
      ]);
    };

    enemySpawnInterval.current = setInterval(spawnEnemy, 1500);
    return () => {
      if (enemySpawnInterval.current) {
        clearInterval(enemySpawnInterval.current);
      }
    };
  }, [isGameOver, isGameStarted, isGamePaused, isCursorInGame]);

  // Game loop with smoother enemy movement and health check
  useEffect(() => {
    if (isGameOver || !isGameStarted || isGamePaused || !isCursorInGame) return;
    let animationFrame: number;

    const gameLoop = () => {
      setEnemies((prevEnemies) => {
        return prevEnemies
          .map((enemy) => {
            const dx = mousePosition.x - enemy.x;
            const dy = mousePosition.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Check if enemy touches the player
            if (distance < 20) {
              setPlayerHealth((prev) => {
                const newHealth = prev - 1;
                if (newHealth <= 0) {
                  setIsGameOver(true);
                }
                return newHealth;
              });
              return { ...enemy, health: 0 }; // Mark for removal
            }

            const vx = (dx / distance) * enemySpeed;
            const vy = (dy / distance) * enemySpeed;
            const newRotation = Math.atan2(vy, vx) * (180 / Math.PI);

            return {
              ...enemy,
              x: enemy.x + vx,
              y: enemy.y + vy,
              rotation: newRotation,
            };
          })
          .filter((enemy) => enemy.health > 0);
      });

      setBullets((prevBullets) => {
        const currentTime = Date.now();
        return prevBullets.filter((bullet) => {
          const timeElapsed = (currentTime - bullet.timestamp) / 1000;
          const progress = Math.min(
            (timeElapsed * bulletSpeed) /
              Math.sqrt(
                Math.pow(bullet.targetX - bullet.startX, 2) +
                  Math.pow(bullet.targetY - bullet.startY, 2)
              ),
            1
          );

          if (progress >= 1) return false;

          const currentX =
            bullet.startX + (bullet.targetX - bullet.startX) * progress;
          const currentY =
            bullet.startY + (bullet.targetY - bullet.startY) * progress;

          setEnemies((prevEnemies) => {
            return prevEnemies.filter((enemy) => {
              const dx = currentX - enemy.x;
              const dy = currentY - enemy.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              return distance > 25;
            });
          });

          return true;
        });
      });

      animationFrame = requestAnimationFrame(gameLoop);
    };

    animationFrame = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition, isGameOver, isGameStarted, isGamePaused, isCursorInGame]);

  const startGame = () => {
    setIsGameStarted(true);
    setPlayerHealth(6);
    setEnemies([]);
    setBullets([]);
    setIsGameOver(false);
    setIsGamePaused(false);
    setIsCursorInGame(true);
    setShowTutorial(false);
  };

  const resetGame = () => {
    setIsGameStarted(false);
    setPlayerHealth(6);
    setEnemies([]);
    setBullets([]);
    setIsGameOver(false);
    setIsGamePaused(false);
    setIsCursorInGame(false);
    setShowTutorial(true);
  };

  const resumeGame = () => {
    setCountdown(3);
  };

  return (
    <div
      ref={gameRef}
      className="relative w-full h-[600px] bg-[#18101e]/50 backdrop-blur-sm rounded-lg overflow-hidden border-2 border-[#f85c70]/20"
    >
      {!isGameStarted ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-30">
          {showTutorial && (
            <div className="mb-12 relative">
              <div className="flex items-center justify-center gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <svg
                    className="w-8 h-8 text-[#f85c70]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.23L7.65,2.22L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z" />
                  </svg>
                </motion.div>
                <motion.div className="relative h-1 w-24 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-[#f85c70]"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-[#f85c70] shadow-[0_0_10px_rgba(248,92,112,0.5)]" />
                </motion.div>
              </div>
              <motion.p
                className="text-[#f85c70] font-space-grotesk text-lg text-center"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Click and drag to shoot!
              </motion.p>
            </div>
          )}
          <button onClick={startGame} className="pixel-button enhanced">
            <div className="pixel-button-content">
              <span className="text-white font-space-grotesk">Start Game</span>
            </div>
          </button>
        </div>
      ) : isGamePaused || !isCursorInGame ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-30">
          <div className="text-center">
            {countdown !== null ? (
              <h2 className="text-6xl font-orbitron text-[#f85c70] mb-4">
                {countdown}
              </h2>
            ) : (
              <>
                <h2 className="text-2xl font-orbitron text-[#f85c70] mb-4">
                  {!isCursorInGame ? "Move Cursor Back to Game" : "Game Paused"}
                </h2>
                {isCursorInGame && (
                  <button
                    onClick={resumeGame}
                    className="pixel-button enhanced"
                  >
                    <div className="pixel-button-content">
                      <span className="text-white font-space-grotesk">
                        Resume
                      </span>
                    </div>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      ) : null}

      {/* Health Bar */}
      {isGameStarted && !isGamePaused && (
        <div className="absolute top-4 left-4 z-20 bg-[#2b2436]/80 p-2 rounded-lg backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="text-[#f85c70] font-orbitron">HP:</div>
            <div className="flex gap-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-sm ${
                    i < playerHealth ? "bg-[#f85c70]" : "bg-[#2b2436]"
                  } border border-[#f85c70]/50`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Message */}
      {isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-30">
          <div className="text-center">
            <h2 className="text-4xl font-orbitron text-[#f85c70] mb-4">
              Game Over
            </h2>
            <div className="flex gap-4 justify-center">
              <button onClick={startGame} className="pixel-button enhanced">
                <div className="pixel-button-content">
                  <span className="text-white font-space-grotesk">
                    Try Again
                  </span>
                </div>
              </button>
              <button onClick={resetGame} className="pixel-button enhanced">
                <div className="pixel-button-content">
                  <span className="text-white font-space-grotesk">
                    Main Menu
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enemies */}
      {isGameStarted &&
        !isGamePaused &&
        enemies.map((enemy) => (
          <motion.div
            key={enemy.id}
            className="absolute"
            style={{
              left: enemy.x - 20,
              top: enemy.y - 20,
              rotate: `${enemy.rotation}deg`,
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: 1,
              rotate: enemy.rotation,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <Image
              src="/images/enemy1.png"
              alt="Enemy"
              width={40}
              height={40}
              className="w-[40px] h-[40px] object-contain"
              style={{ imageRendering: "pixelated" }}
              priority
            />
          </motion.div>
        ))}

      {/* Bullets */}
      {isGameStarted &&
        !isGamePaused &&
        bullets.map((bullet) => (
          <motion.div
            key={bullet.id}
            className="absolute w-3 h-3"
            style={{
              left: bullet.startX - 1.5,
              top: bullet.startY - 1.5,
            }}
            animate={{
              x: bullet.targetX - bullet.startX,
              y: bullet.targetY - bullet.startY,
            }}
            transition={{
              duration:
                Math.sqrt(
                  Math.pow(bullet.targetX - bullet.startX, 2) +
                    Math.pow(bullet.targetY - bullet.startY, 2)
                ) / bulletSpeed,
              ease: "linear",
            }}
          >
            <div className="w-full h-full bg-[#f85c70] rounded-full shadow-[0_0_10px_rgba(248,92,112,0.5)] animate-pulse" />
          </motion.div>
        ))}

      {/* Drag Line */}
      {isGameStarted && !isGamePaused && isDragging && (
        <svg
          className="absolute inset-0 pointer-events-none z-10"
          style={{ filter: "drop-shadow(0 0 10px rgba(248,92,112,0.5))" }}
        >
          <line
            x1={dragStart.x}
            y1={dragStart.y}
            x2={mousePosition.x}
            y2={mousePosition.y}
            stroke="#f85c70"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
      )}
    </div>
  );
};

export default MiniGame;
