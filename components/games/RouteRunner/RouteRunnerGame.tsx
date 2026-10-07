"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import GameShell from "@/components/games/GameShell";
import GameHUD from "@/components/games/GameHUD";
import GameStartScreen from "@/components/games/GameStartScreen";
import GamePauseModal from "@/components/games/GamePauseModal";
import GameResultModal from "@/components/games/GameResultModal";
import GameTutorialModal, { TutorialConfig } from "@/components/games/GameTutorialModal";
import { sounds } from "@/components/Play/SoundEffects";
import { gameStorage } from "@/lib/gameStorage";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Fuel, Wrench, Sparkles, Navigation } from "lucide-react";

const ROUTE_RUNNER_TUTORIAL: TutorialConfig = {
  gameId: "route-runner",
  gameTitle: "Route Runner",
  objective: "Deliver all 3 packages before fuel or time runs out.",
  controlText: "WASD / Arrow Keys or virtual D-Pad to drive & steer.",
  doText: "Drive along asphalt roads to deliver to stops #1, #2, and #3 in sequence.",
  avoidText: "Avoid hitting civilian traffic (-4 fuel) and running out of gas.",
  winText: "Safely deliver all 3 packages to hospital, campus & tech hub.",
  demoType: "route",
};

interface DeliveryStop {
  id: number;
  name: string;
  x: number;
  y: number;
  color: string;
  isDelivered: boolean;
}

interface TrafficCar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export default function RouteRunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game States
  const [gameState, setGameState] = useState<"start" | "playing" | "paused" | "gameover" | "victory">("start");
  const [showTutorial, setShowTutorial] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);
  const [fuel, setFuel] = useState(100);
  const [timeRemaining, setTimeRemaining] = useState(90);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [feedbackPopups, setFeedbackPopups] = useState<Array<{ id: string; text: string; color?: string; y?: number }>>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Array<{ id: string; title: string; icon: string }>>([]);
  const [isMuted, setIsMuted] = useState(true);

  // Upgrade stats
  const [upgrades, setUpgrades] = useState({ engine: 1, tires: 1, radar: 1 });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Player Van Physics state (ref for 60fps loop)
  const playerRef = useRef({
    x: 100,
    y: 400,
    angle: 0,
    speed: 0,
    maxSpeed: 4.2,
    acceleration: 0.16,
    turnSpeed: 0.05,
    friction: 0.96,
    width: 32,
    height: 18,
  });

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Stops to deliver
  const stopsRef = useRef<DeliveryStop[]>([
    { id: 1, name: "Binus Anggrek Hub", x: 680, y: 120, color: "#3B82F6", isDelivered: false },
    { id: 2, name: "Smart Tech District", x: 260, y: 140, color: "#10B981", isDelivered: false },
    { id: 3, name: "Green Care Hospital", x: 700, y: 410, color: "#EC4899", isDelivered: false },
  ]);

  // Traffic lights
  const trafficLightsRef = useRef([
    { x: 380, y: 220, state: "green", timer: 0 },
    { x: 620, y: 220, state: "red", timer: 3 },
  ]);

  // Civilian Traffic
  const trafficCarsRef = useRef<TrafficCar[]>([
    { x: 150, y: 220, vx: 1.8, vy: 0, width: 28, height: 16, color: "#64748B" },
    { x: 500, y: 220, vx: 1.5, vy: 0, width: 28, height: 16, color: "#F59E0B" },
    { x: 380, y: 80, vx: 0, vy: 1.6, width: 16, height: 28, color: "#8B5CF6" },
    { x: 620, y: 350, vx: 0, vy: -1.7, width: 16, height: 28, color: "#EF4444" },
  ]);

  // Gas Station position
  const gasStation = { x: 380, y: 420, width: 60, height: 40 };

  // Rooftop sunflower easter egg
  const easterSunflower = { x: 740, y: 60, discovered: false };

  // Particles
  const particlesRef = useRef<Particle[]>([]);

  // Load High Score & Upgrades on Mount
  useEffect(() => {
    setBestScore(gameStorage.getBestScore("route-runner"));
    setUpgrades(gameStorage.getRouteRunnerUpgrades());
    setIsMuted(sounds.isMuted);

    if (typeof window !== "undefined") {
      const tutDone = localStorage.getItem("kn_tut_route-runner");
      if (!tutDone) {
        setShowTutorial(true);
      }
    }
  }, []);

  // Popup feedback helper
  const addPopup = (text: string, color = "#FBBF24") => {
    const id = Math.random().toString();
    setFeedbackPopups((prev) => [...prev, { id, text, color }]);
    setTimeout(() => {
      setFeedbackPopups((prev) => prev.filter((p) => p.id !== id));
    }, 1200);
  };

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        if (gameState === "playing") setGameState("paused");
        else if (gameState === "paused") setGameState("playing");
        return;
      }
      keysPressed.current[e.code] = true;
      keysPressed.current[e.key.toLowerCase()] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameState]);

  // Upgrade modifiers
  useEffect(() => {
    playerRef.current.maxSpeed = 3.6 + upgrades.engine * 0.7;
    playerRef.current.acceleration = 0.14 + upgrades.engine * 0.04;
  }, [upgrades]);

  // Main Game Loop
  const updateGame = useCallback(
    (timestamp: number) => {
      if (gameState !== "playing") return;

      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const player = playerRef.current;
      const keys = keysPressed.current;

      // 1. Player Driving Controls
      const isAccelerating = keys["ArrowUp"] || keys["KeyW"] || keys["w"];
      const isReversing = keys["ArrowDown"] || keys["KeyS"] || keys["s"];
      const isTurningLeft = keys["ArrowLeft"] || keys["KeyA"] || keys["a"];
      const isTurningRight = keys["ArrowRight"] || keys["KeyD"] || keys["d"];
      const isBraking = keys["Space"];

      if (isAccelerating) {
        player.speed = Math.min(player.maxSpeed, player.speed + player.acceleration);
        // Fuel burn reduced by tires upgrade
        const fuelBurnRate = (0.045 / (1 + upgrades.tires * 0.25)) * (dt * 60);
        setFuel((f) => Math.max(0, f - fuelBurnRate));

        // Exhaust smoke particles
        if (Math.random() < 0.4) {
          particlesRef.current.push({
            x: player.x - Math.cos(player.angle) * 16,
            y: player.y - Math.sin(player.angle) * 16,
            vx: -Math.cos(player.angle) * 0.8 + (Math.random() - 0.5) * 0.5,
            vy: -Math.sin(player.angle) * 0.8 + (Math.random() - 0.5) * 0.5,
            life: 1,
            maxLife: 20,
            color: "rgba(180, 180, 190, 0.5)",
            size: 3 + Math.random() * 3,
          });
        }
      } else if (isReversing) {
        player.speed = Math.max(-player.maxSpeed * 0.5, player.speed - player.acceleration * 0.7);
        setFuel((f) => Math.max(0, f - 0.02 * (dt * 60)));
      } else {
        player.speed *= player.friction;
      }

      if (isBraking) {
        player.speed *= 0.88;
      }

      // Steer only when moving
      if (Math.abs(player.speed) > 0.1) {
        const dir = player.speed > 0 ? 1 : -1;
        if (isTurningLeft) player.angle -= player.turnSpeed * dir;
        if (isTurningRight) player.angle += player.turnSpeed * dir;
      }

      // Move player
      player.x += Math.cos(player.angle) * player.speed;
      player.y += Math.sin(player.angle) * player.speed;

      // Keep inside bounds (800x500 virtual canvas)
      player.x = Math.max(20, Math.min(780, player.x));
      player.y = Math.max(20, Math.min(480, player.y));

      // 2. Traffic Lights Timer
      trafficLightsRef.current.forEach((tl) => {
        tl.timer += dt;
        if (tl.state === "green" && tl.timer > 5.5) {
          tl.state = "amber";
          tl.timer = 0;
        } else if (tl.state === "amber" && tl.timer > 2) {
          tl.state = "red";
          tl.timer = 0;
        } else if (tl.state === "red" && tl.timer > 4.5) {
          tl.state = "green";
          tl.timer = 0;
        }
      });

      // 3. Civilian Traffic AI
      trafficCarsRef.current.forEach((car) => {
        car.x += car.vx;
        car.y += car.vy;

        // Wrap around roads
        if (car.x > 820) car.x = -20;
        if (car.x < -20) car.x = 820;
        if (car.y > 520) car.y = -20;
        if (car.y < -20) car.y = 520;

        // Collision check with player
        const dist = Math.hypot(player.x - car.x, player.y - car.y);
        if (dist < 26) {
          sounds.playGlitch();
          player.speed = -player.speed * 0.5;
          setFuel((f) => Math.max(0, f - 4));
          addPopup("-4 Fuel (Bump!)", "#EF4444");
        }
      });

      // 4. Gas Station Refueling Pit Stop
      const distToGas = Math.hypot(
        player.x - (gasStation.x + gasStation.width / 2),
        player.y - (gasStation.y + gasStation.height / 2)
      );
      if (distToGas < 38) {
        setFuel((f) => {
          if (f < 99) {
            sounds.playCollect();
            return Math.min(100, f + 0.6);
          }
          return f;
        });
      }

      // 5. Secret Sunflower Easter Egg check
      const distToSunflower = Math.hypot(player.x - easterSunflower.x, player.y - easterSunflower.y);
      if (distToSunflower < 45 && !easterSunflower.discovered) {
        easterSunflower.discovered = true;
        sounds.playPowerUp();
        gameStorage.unlockAchievement("rr_easter_sunflower");
        addPopup("🌻 Secret Sunflower Found!", "#FBBF24");
      }

      // 6. Deliveries Checking
      const currentStop = stopsRef.current[currentStopIndex];
      if (currentStop && !currentStop.isDelivered) {
        const distToStop = Math.hypot(player.x - currentStop.x, player.y - currentStop.y);
        if (distToStop < 34) {
          currentStop.isDelivered = true;
          sounds.playCollect();
          const deliveryPoints = 350 + Math.floor(fuel * 2);
          setScore((s) => s + deliveryPoints);
          addPopup(`+${deliveryPoints} Delivered!`, "#10B981");

          if (currentStopIndex + 1 < stopsRef.current.length) {
            setCurrentStopIndex((prev) => prev + 1);
          } else {
            // All deliveries done -> Victory!
            handleVictory();
            return;
          }
        }
      }

      // 7. Check Lose Conditions
      if (fuel <= 0 || timeRemaining <= 0) {
        handleGameOver();
        return;
      }

      // 8. Render Canvas
      renderCanvas();

      animationFrameId.current = requestAnimationFrame(updateGame);
    },
    [gameState, currentStopIndex, fuel, timeRemaining, upgrades]
  );

  // Time Countdown interval
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          handleGameOver();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  // Animation frame kickoff
  useEffect(() => {
    if (gameState === "playing") {
      lastTimeRef.current = performance.now();
      animationFrameId.current = requestAnimationFrame(updateGame);
    }
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [gameState, updateGame]);

  // Victory Handler
  const handleVictory = () => {
    setGameState("victory");
    const totalBonus = Math.floor(fuel * 4) + timeRemaining * 10;
    const finalScore = score + totalBonus;
    setScore(finalScore);

    const isNew = gameStorage.saveBestScore("route-runner", finalScore);
    setIsNewRecord(isNew);

    const stars = gameStorage.addStars(3);
    setStarsEarned(3);

    // Achievements check
    const newlyUnlocked: Array<{ id: string; title: string; icon: string }> = [];
    if (fuel >= 50) {
      if (gameStorage.unlockAchievement("rr_eco_master")) {
        newlyUnlocked.push({ id: "rr_eco_master", title: "Eco Master", icon: "🌱" });
      }
    }
    if (90 - timeRemaining < 45) {
      if (gameStorage.unlockAchievement("rr_speed_demon")) {
        newlyUnlocked.push({ id: "rr_speed_demon", title: "Express Courier", icon: "⚡" });
      }
    }
    setUnlockedAchievements(newlyUnlocked);
  };

  // Game Over Handler
  const handleGameOver = () => {
    setGameState("gameover");
    const isNew = gameStorage.saveBestScore("route-runner", score);
    setIsNewRecord(isNew);
  };

  // Start / Reset
  const startGame = () => {
    sounds.playClick();
    setScore(0);
    setFuel(100);
    setTimeRemaining(90);
    setCurrentStopIndex(0);
    setIsNewRecord(false);
    setStarsEarned(0);
    setUnlockedAchievements([]);

    stopsRef.current.forEach((s) => (s.isDelivered = false));
    playerRef.current = {
      x: 100,
      y: 400,
      angle: 0,
      speed: 0,
      maxSpeed: 3.6 + upgrades.engine * 0.7,
      acceleration: 0.14 + upgrades.engine * 0.04,
      turnSpeed: 0.05,
      friction: 0.96,
      width: 32,
      height: 18,
    };
    particlesRef.current = [];
    setGameState("playing");
  };

  // Render Canvas Scene
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Background Asphalt Ground
    ctx.fillStyle = "#1e212b";
    ctx.fillRect(0, 0, w, h);

    // City Blocks / Buildings (Greenish charcoal)
    ctx.fillStyle = "#151820";
    ctx.strokeStyle = "#282c38";
    ctx.lineWidth = 2;

    // Building Blocks
    const blocks = [
      { x: 30, y: 30, w: 200, h: 140 },
      { x: 260, y: 30, w: 220, h: 140 },
      { x: 510, y: 30, w: 250, h: 140 },
      { x: 30, y: 260, w: 200, h: 180 },
      { x: 260, y: 260, w: 220, h: 120 }, // Gas station sits under this block
      { x: 510, y: 260, w: 250, h: 180 },
    ];

    blocks.forEach((b) => {
      ctx.fillRect(b.x, b.y, b.w, b.h);
      ctx.strokeRect(b.x, b.y, b.w, b.h);

      // Window grid lights
      ctx.fillStyle = "rgba(251, 191, 36, 0.15)";
      for (let r = b.y + 16; r < b.y + b.h - 16; r += 24) {
        for (let c = b.x + 16; c < b.x + b.w - 16; c += 24) {
          ctx.fillRect(c, r, 8, 8);
        }
      }
      ctx.fillStyle = "#151820";
    });

    // Secret Rooftop Sunflower (Top right block)
    ctx.save();
    ctx.fillStyle = "#10B981";
    ctx.beginPath();
    ctx.arc(easterSunflower.x, easterSunflower.y, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "14px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🌻", easterSunflower.x, easterSunflower.y);
    ctx.restore();

    // Road Markings (Dotted yellow lane dividers)
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 2;
    ctx.setLineDash([12, 12]);

    // Horizontal Road Centerlines
    ctx.beginPath();
    ctx.moveTo(0, 220);
    ctx.lineTo(w, 220);
    ctx.stroke();

    // Vertical Road Centerlines
    ctx.beginPath();
    ctx.moveTo(245, 0);
    ctx.lineTo(245, h);
    ctx.moveTo(495, 0);
    ctx.lineTo(495, h);
    ctx.stroke();
    ctx.setLineDash([]);

    // Gas Station Area
    ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
    ctx.strokeStyle = "#10B981";
    ctx.lineWidth = 1.5;
    ctx.fillRect(gasStation.x, gasStation.y, gasStation.width, gasStation.height);
    ctx.strokeRect(gasStation.x, gasStation.y, gasStation.width, gasStation.height);
    ctx.font = "bold 10px monospace";
    ctx.fillStyle = "#10B981";
    ctx.fillText("⛽ REFUEL", gasStation.x + 6, gasStation.y + 24);

    // Traffic Lights
    trafficLightsRef.current.forEach((tl) => {
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(tl.x - 8, tl.y - 18, 16, 36);
      ctx.strokeStyle = "#334155";
      ctx.strokeRect(tl.x - 8, tl.y - 18, 16, 36);

      // Red
      ctx.fillStyle = tl.state === "red" ? "#EF4444" : "#450a0a";
      ctx.beginPath();
      ctx.arc(tl.x, tl.y - 10, 4, 0, Math.PI * 2);
      ctx.fill();

      // Amber
      ctx.fillStyle = tl.state === "amber" ? "#F59E0B" : "#451a03";
      ctx.beginPath();
      ctx.arc(tl.x, tl.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Green
      ctx.fillStyle = tl.state === "green" ? "#10B981" : "#022c22";
      ctx.beginPath();
      ctx.arc(tl.x, tl.y + 10, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Civilian Cars
    trafficCarsRef.current.forEach((car) => {
      ctx.save();
      ctx.translate(car.x, car.y);
      ctx.fillStyle = car.color;
      ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
      // Windshield
      ctx.fillStyle = "#94a3b8";
      ctx.fillRect(-car.width / 4, -car.height / 4, car.width / 2, car.height / 2);
      ctx.restore();
    });

    // Particles (Exhaust)
    particlesRef.current.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 - p.life / p.maxLife), 0, Math.PI * 2);
      ctx.fill();
      if (p.life >= p.maxLife) {
        particlesRef.current.splice(idx, 1);
      }
    });

    // Delivery Target Beacons
    stopsRef.current.forEach((stop, i) => {
      const isTarget = i === currentStopIndex;
      ctx.save();
      ctx.translate(stop.x, stop.y);

      if (stop.isDelivered) {
        ctx.fillStyle = "rgba(16, 185, 129, 0.4)";
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = "bold 10px monospace";
        ctx.fillStyle = "#10B981";
        ctx.textAlign = "center";
        ctx.fillText("✓ DONE", 0, -18);
      } else if (isTarget) {
        // Pulsing glowing ring
        const pulse = (Date.now() % 1000) / 1000;
        ctx.strokeStyle = stop.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 16 + pulse * 14, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = stop.color;
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 10px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`DELIVER #${i + 1}`, 0, -22);
        ctx.fillText(stop.name, 0, 24);
      } else {
        // Inactive stop
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    // Player Delivery Van
    const player = playerRef.current;
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.angle);

    // Van Body (Crisp navy with white roof)
    ctx.fillStyle = "#1e3a8a";
    ctx.beginPath();
    ctx.roundRect(-player.width / 2, -player.height / 2, player.width, player.height, 4);
    ctx.fill();
    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Windshield
    ctx.fillStyle = "#93c5fd";
    ctx.fillRect(player.width / 4 - 2, -player.height / 2 + 2, 5, player.height - 4);

    // Cargo Box Top
    ctx.fillStyle = "#2563eb";
    ctx.fillRect(-player.width / 2 + 3, -player.height / 2 + 2, 14, player.height - 4);

    // Headlights
    ctx.fillStyle = "#fef08a";
    ctx.fillRect(player.width / 2 - 2, -player.height / 2 + 2, 2, 4);
    ctx.fillRect(player.width / 2 - 2, player.height / 2 - 6, 2, 4);

    ctx.restore();
  };

  // Upgrades purchase handler
  const handleUpgrade = (type: "engine" | "tires" | "radar") => {
    sounds.playClick();
    const currentStars = gameStorage.getStarsCount();
    const cost = 2;
    if (currentStars >= cost && upgrades[type] < 3) {
      gameStorage.addStars(-cost);
      const next = { ...upgrades, [type]: upgrades[type] + 1 };
      setUpgrades(next);
      gameStorage.saveRouteRunnerUpgrades(next);
      addPopup(`${type.toUpperCase()} Upgraded!`, "#10B981");
    } else {
      sounds.playGlitch();
      addPopup("Need 2 Stars to Upgrade!", "#EF4444");
    }
  };

  // Mobile Touch Controls
  const handleTouchControl = (key: string, isDown: boolean) => {
    keysPressed.current[key] = isDown;
  };

  return (
    <GameShell
      gameId="route-runner"
      gameTitle="Route Runner"
      subtitle="Eco-routing delivery challenge"
      score={score}
      bestScore={bestScore}
      isPaused={gameState === "paused"}
      onTogglePause={() => setGameState((s) => (s === "playing" ? "paused" : s === "paused" ? "playing" : s))}
    >
      {/* Canvas Viewport */}
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="w-full h-full object-cover select-none"
        onClick={() => {
          // Check sunflower click
          const canvas = canvasRef.current;
          if (!canvas) return;
          if (!easterSunflower.discovered) {
            easterSunflower.discovered = true;
            sounds.playPowerUp();
            gameStorage.unlockAchievement("rr_easter_sunflower");
            addPopup("🌻 Rooftop Sunflower Discovered!", "#FBBF24");
          }
        }}
      />

      {/* Active In-Game HUD */}
      {gameState === "playing" && (
        <>
          <GameHUD
            score={score}
            objective={`Deliver package #${currentStopIndex + 1}/3 to ${stopsRef.current[currentStopIndex]?.name || "Destination"}`}
            fuel={fuel}
            timeRemaining={timeRemaining}
            feedbackPopups={feedbackPopups}
            secondaryMetric={{
              label: "Deliveries",
              value: `${currentStopIndex}/3`,
              icon: <Navigation className="w-3.5 h-3.5 text-accent" />,
            }}
            onOpenTutorial={() => setShowTutorial(true)}
          />

          {/* In-Game Contextual Hint */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] shadow-lg flex items-center gap-1.5">
              <span>💡</span>
              {fuel < 30 ? (
                <span className="text-amber-400 font-bold">LOW FUEL! Pull into ⛽ REFUEL station at bottom center</span>
              ) : playerRef.current.speed === 0 ? (
                <span>Press W / Up Arrow or tap D-Pad to drive forward!</span>
              ) : (
                <span>Follow road toward glowing {stopsRef.current[currentStopIndex]?.name} beacon</span>
              )}
            </div>
          </div>

          {/* Quick Upgrade Drawer Button */}
          <button
            type="button"
            onClick={() => setShowUpgradeModal(true)}
            className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-xs cursor-pointer"
          >
            <Wrench className="w-3.5 h-3.5 text-accent" />
            <span>Tuning Shop</span>
          </button>

          {/* On-Screen Mobile Controls */}
          <div className="md:hidden absolute bottom-4 right-4 z-20 flex flex-col items-center gap-1.5 pointer-events-auto">
            <button
              type="button"
              onPointerDown={() => handleTouchControl("ArrowUp", true)}
              onPointerUp={() => handleTouchControl("ArrowUp", false)}
              className="w-12 h-12 rounded-xl bg-white/20 active:bg-white/40 flex items-center justify-center text-white backdrop-blur-md"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onPointerDown={() => handleTouchControl("ArrowLeft", true)}
                onPointerUp={() => handleTouchControl("ArrowLeft", false)}
                className="w-12 h-12 rounded-xl bg-white/20 active:bg-white/40 flex items-center justify-center text-white backdrop-blur-md"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onPointerDown={() => handleTouchControl("ArrowDown", true)}
                onPointerUp={() => handleTouchControl("ArrowDown", false)}
                className="w-12 h-12 rounded-xl bg-white/20 active:bg-white/40 flex items-center justify-center text-white backdrop-blur-md"
              >
                <ArrowDown className="w-5 h-5" />
              </button>
              <button
                type="button"
                onPointerDown={() => handleTouchControl("ArrowRight", true)}
                onPointerUp={() => handleTouchControl("ArrowRight", false)}
                className="w-12 h-12 rounded-xl bg-white/20 active:bg-white/40 flex items-center justify-center text-white backdrop-blur-md"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Title Start Screen */}
      {gameState === "start" && (
        <GameStartScreen
          title="ROUTE RUNNER"
          tagline="Eco-Routing Delivery Simulation"
          description="Navigate the metropolitan grid under dynamic traffic and tight fuel budgets. Drop 3 packages to city destinations while preserving fuel efficiency."
          badge="Featured Optimization Game"
          bestScore={bestScore}
          controls={{
            keyboard: "WASD or Arrow Keys to steer & accelerate",
            mouse: "Click rooftop garden for hidden secret",
            touch: "On-screen virtual D-pad buttons",
          }}
          objectives={[
            "Deliver 3 parcels to Binus, Tech District, & Hospital in sequence.",
            "Watch fuel level! Pull into the green ⛽ REFUEL depot if running dry.",
            "Avoid bumping into civilian cars to save fuel and maintain speed.",
          ]}
          onStart={startGame}
        />
      )}

      {/* Upgrade Tuning Modal */}
      {showUpgradeModal && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#181920] border-2 border-white/15 rounded-3xl p-5 space-y-4 text-white">
            <div className="flex justify-between items-center">
              <h3 className="font-display font-bold text-lg flex items-center gap-2">
                <Wrench className="w-4 h-4 text-accent" />
                Vehicle Tuning Shop
              </h3>
              <span className="font-mono text-xs text-amber-400">
                ⭐ {gameStorage.getStarsCount()} Stars
              </span>
            </div>
            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-bold">Eco Engine (Lvl {upgrades.engine}/3)</div>
                  <div className="text-[10px] text-white/50">Higher top delivery speed</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleUpgrade("engine")}
                  disabled={upgrades.engine >= 3}
                  className="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-hover disabled:opacity-40 text-white font-bold"
                >
                  {upgrades.engine >= 3 ? "MAX" : "2 ⭐"}
                </button>
              </div>

              <div className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <div className="font-bold">Low-Rolling Tires (Lvl {upgrades.tires}/3)</div>
                  <div className="text-[10px] text-white/50">Reduces fuel burn by 25%</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleUpgrade("tires")}
                  disabled={upgrades.tires >= 3}
                  className="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-hover disabled:opacity-40 text-white font-bold"
                >
                  {upgrades.tires >= 3 ? "MAX" : "2 ⭐"}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold"
            >
              Close Shop
            </button>
          </div>
        </div>
      )}

      {/* Pause Modal */}
      <GamePauseModal
        isOpen={gameState === "paused"}
        onResume={() => setGameState("playing")}
        onRestart={startGame}
        isMuted={isMuted}
        onToggleMute={() => {
          const next = sounds.toggleMute();
          setIsMuted(next);
        }}
        onOpenTutorial={() => setShowTutorial(true)}
      />

      {/* Interactive Onboarding Tutorial Modal */}
      <GameTutorialModal
        isOpen={showTutorial}
        config={ROUTE_RUNNER_TUTORIAL}
        onComplete={() => {
          setShowTutorial(false);
          if (gameState === "start") startGame();
        }}
        onClose={() => setShowTutorial(false)}
      />

      {/* Victory / Game Over Modal */}
      <GameResultModal
        isOpen={gameState === "victory" || gameState === "gameover"}
        isVictory={gameState === "victory"}
        title={gameState === "victory" ? "ALL PACKAGES DELIVERED!" : "DELIVERY FAILED"}
        score={score}
        bestScore={bestScore}
        isNewRecord={isNewRecord}
        starsEarned={starsEarned}
        breakdown={[
          { label: "Remaining Fuel", value: `${Math.round(fuel)}%` },
          { label: "Time Left", value: `${timeRemaining}s` },
          { label: "Deliveries Completed", value: `${currentStopIndex + (gameState === "victory" ? 1 : 0)} / 3` },
        ]}
        unlockedAchievements={unlockedAchievements}
        onReplay={startGame}
      />
    </GameShell>
  );
}
