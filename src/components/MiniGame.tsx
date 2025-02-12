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

const MiniGame = () => {
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [playerHealth, setPlayerHealth] = useState(5);
  const [isGameOver, setIsGameOver] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const enemySpawnInterval = useRef<NodeJS.Timeout>();
  const bulletSpeed = 1200;
  const enemySpeed = 1; // Reduced enemy speed

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
    if (isGameOver) return;

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
  }, [isGameOver]);

  // Game loop with smoother enemy movement and health check
  useEffect(() => {
    if (isGameOver) return;
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
  }, [mousePosition, isGameOver]);

  return (
    <div
      ref={gameRef}
      className="relative w-full h-[600px] bg-[#18101e]/50 backdrop-blur-sm rounded-lg overflow-hidden border-2 border-[#f85c70]/20"
    >
      {/* Health Bar */}
      <div className="absolute top-4 left-4 z-20 bg-[#2b2436]/80 p-2 rounded-lg backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="text-[#f85c70] font-orbitron">HP:</div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
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

      {/* Game Over Message */}
      {isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-30">
          <div className="text-center">
            <h2 className="text-4xl font-orbitron text-[#f85c70] mb-4">
              Game Over
            </h2>
            <button
              onClick={() => {
                setPlayerHealth(5);
                setEnemies([]);
                setBullets([]);
                setIsGameOver(false);
              }}
              className="pixel-button enhanced"
            >
              <div className="pixel-button-content">
                <span className="text-white font-space-grotesk">Try Again</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Enemies */}
      {enemies.map((enemy) => (
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
      {bullets.map((bullet) => (
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
      {isDragging && !isGameOver && (
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
