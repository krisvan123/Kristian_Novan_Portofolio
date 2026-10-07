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
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Sun, Moon, Sparkles, MessageCircle, BookOpen, CheckCircle2, X } from "lucide-react";

const PORTFOLIO_QUEST_TUTORIAL: TutorialConfig = {
  gameId: "portfolio-quest",
  gameTitle: "Portfolio Quest",
  objective: "Visit all 5 milestone pavilions and collect 5 stars.",
  controlText: "WASD / Arrow Keys or on-screen directional buttons to move.",
  doText: "Walk up to pavilions & residents, then press [E] or tap 'Talk / Inspect'.",
  avoidText: "Don't miss the secret northern grove where the golden sunflower blooms!",
  winText: "Inspect all 5 pavilions (Projects, AI, Garden, Design, Arch) to complete the quest.",
  demoType: "quest",
};

interface Pavilion {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  badge: string;
  tagline: string;
  description: string;
  highlights: string[];
  visited: boolean;
}

interface NPC {
  id: string;
  name: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  dialogue: string;
  emoji: string;
  talked: boolean;
}

interface StarItem {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

export default function PortfolioQuestGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game States
  const [gameState, setGameState] = useState<"start" | "playing" | "paused" | "gameover" | "victory">("start");
  const [showTutorial, setShowTutorial] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);
  const [visitedCount, setVisitedCount] = useState(0);
  const [starsCollectedCount, setStarsCollectedCount] = useState(0);
  const [isNight, setIsNight] = useState(false);
  const [activePavilionModal, setActivePavilionModal] = useState<Pavilion | null>(null);
  const [activeNPCModal, setActiveNPCModal] = useState<NPC | null>(null);
  const [feedbackPopups, setFeedbackPopups] = useState<Array<{ id: string; text: string; color?: string; y?: number }>>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Array<{ id: string; title: string; icon: string }>>([]);
  const [isMuted, setIsMuted] = useState(true);

  // Player RPG state
  const playerRef = useRef({
    x: 600,
    y: 500,
    speed: 3.5,
    facing: "down" as "up" | "down" | "left" | "right",
    isMoving: false,
    walkFrame: 0,
  });

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Pavilions
  const pavilionsRef = useRef<Pavilion[]>([
    {
      id: "projects",
      name: "Projects Pavilion",
      x: 260,
      y: 280,
      width: 140,
      height: 100,
      color: "#3B82F6",
      badge: "Software Engineering",
      tagline: "Coursework, ML prototypes & web architectures",
      description: "Home of Kristian's applied engineering projects: EcoRouter AI heuristic solver, Trobos Next.js prototype, and Clinical Heart Disease ML predictors.",
      highlights: ["EcoRouter AI Delivery Heuristics", "Trobos Food Prototype (Next.js)", "Heart Disease ML Risk Models", "IoT Smart Trash Bin Controller"],
      visited: false,
    },
    {
      id: "ai",
      name: "Intelligent Systems Lab",
      x: 880,
      y: 240,
      width: 150,
      height: 100,
      color: "#10B981",
      badge: "AI & Research",
      tagline: "Computer vision, deep learning & bioinformatics",
      description: "Cutting-edge algorithmic research: Peer-reviewed ICORIS 2024 paper on CNN-LSTM deep models, CompFest AIC 2026 Top 41 finalist, and vision architectures.",
      highlights: ["ICORIS 2024 IEEE Research Paper", "CompFest 18 AIC Top 41 Finalist", "Deep Learning CNN-LSTM Ensembles", "Computer Vision Segmentation"],
      visited: false,
    },
    {
      id: "activities",
      name: "Volunteer & Stage Garden",
      x: 240,
      y: 600,
      width: 140,
      height: 100,
      color: "#EC4899",
      badge: "Community & Leadership",
      tagline: "Stage hosting, humanitarian work & student clubs",
      description: "Dedicated campus leadership: Master of Ceremony stage moderation for institutional seminars and volunteer work with WALUBI humanitarian health programs.",
      highlights: ["Master of Ceremony Stage Moderation", "WALUBI Health Service Volunteer", "Google Developer Student Clubs", "Binus AI Student Community"],
      visited: false,
    },
    {
      id: "design",
      name: "UI/UX Design Studio",
      x: 900,
      y: 580,
      width: 140,
      height: 100,
      color: "#F59E0B",
      badge: "Design & Interaction",
      tagline: "Figma design systems & tactile user experiences",
      description: "Where engineering meets aesthetics: User flow wireframes, responsive design systems, micro-interactions, and accessibility standards.",
      highlights: ["Figma Design Systems", "Human-Centered Wireframing", "Tailwind CSS Craft", "Interactive Micro-Interactions"],
      visited: false,
    },
    {
      id: "certificates",
      name: "Credentials Arch",
      x: 580,
      y: 180,
      width: 120,
      height: 80,
      color: "#8B5CF6",
      badge: "Verified Honors",
      tagline: "Academic degree, certifications & international conference",
      description: "Verified academic and professional credentials from Binus University, Microsoft Azure AI, Dicoding Indonesia, and IEEE ICORIS 2024.",
      highlights: ["Binus University Computer Science", "Microsoft Certified: Azure AI", "Dicoding Machine Learning Path", "Verified IEEE Conference Certificate"],
      visited: false,
    },
  ]);

  // NPCs
  const npcsRef = useRef<NPC[]>([
    {
      id: "prof",
      name: "Prof. Hartono",
      x: 750,
      y: 280,
      targetX: 750,
      targetY: 280,
      dialogue: "Greetings, Kristian! Your research paper on CNN-LSTM neural networks in ICORIS was thoroughly rigorous. Keep pushing algorithmic frontiers!",
      emoji: "👨‍🏫",
      talked: false,
    },
    {
      id: "dev",
      name: "Junior Dev Alex",
      x: 420,
      y: 350,
      targetX: 420,
      targetY: 350,
      dialogue: "Hey! I was inspecting your Trobos app prototype—shifting from basic HTML to Next.js App Router made a massive difference in server rendering speed!",
      emoji: "🧑‍💻",
      talked: false,
    },
    {
      id: "cat",
      name: "Mochi the Campus Cat",
      x: 520,
      y: 640,
      targetX: 520,
      targetY: 640,
      dialogue: "Purrrr... *Mochi stretches in the warm sunlight and nuzzles against your shoes happily.* +5 Joy!",
      emoji: "🐱",
      talked: false,
    },
  ]);

  // 5 Collectible Stars
  const starsRef = useRef<StarItem[]>([
    { id: 1, x: 180, y: 180, collected: false },
    { id: 2, x: 740, y: 150, collected: false },
    { id: 3, x: 1040, y: 450, collected: false },
    { id: 4, x: 150, y: 680, collected: false },
    { id: 5, x: 780, y: 680, collected: false },
  ]);

  // Secret Garden (Northern pine grove gap)
  const secretGarden = { x: 590, y: 60, discovered: false };

  // Load High Score on Mount
  useEffect(() => {
    setBestScore(gameStorage.getBestScore("portfolio-quest"));
    setIsMuted(sounds.isMuted);

    if (typeof window !== "undefined") {
      const tutDone = localStorage.getItem("kn_tut_portfolio-quest");
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

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        if (activePavilionModal) {
          setActivePavilionModal(null);
          return;
        }
        if (activeNPCModal) {
          setActiveNPCModal(null);
          return;
        }
        if (gameState === "playing") setGameState("paused");
        else if (gameState === "paused") setGameState("playing");
        return;
      }

      if (e.code === "KeyE" && gameState === "playing") {
        checkNearbyInteractions();
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
  }, [gameState, activePavilionModal, activeNPCModal]);

  // Check nearby pavilion or NPC for inspection
  const checkNearbyInteractions = () => {
    const player = playerRef.current;

    // Check Pavilions
    for (const pav of pavilionsRef.current) {
      const centerX = pav.x + pav.width / 2;
      const centerY = pav.y + pav.height / 2;
      if (Math.hypot(player.x - centerX, player.y - centerY) < 95) {
        sounds.playClick();
        if (!pav.visited) {
          pav.visited = true;
          setScore((s) => s + 400);
          setVisitedCount((c) => {
            const next = c + 1;
            if (next === 5) {
              handleVictory();
            }
            return next;
          });
          addPopup(`+400 ${pav.name} Discovered!`, pav.color);
        }
        setActivePavilionModal(pav);
        return;
      }
    }

    // Check NPCs
    for (const npc of npcsRef.current) {
      if (Math.hypot(player.x - npc.x, player.y - npc.y) < 60) {
        sounds.playClick();
        if (!npc.talked) {
          npc.talked = true;
          setScore((s) => s + 150);
          addPopup(`+150 Talked to ${npc.name}`, "#38BDF8");
        }
        // Check social butterfly achievement
        if (npcsRef.current.every((n) => n.talked)) {
          gameStorage.unlockAchievement("pq_social_butterfly");
        }
        setActiveNPCModal(npc);
        return;
      }
    }
  };

  // Main Loop
  const updateGame = useCallback(
    (timestamp: number) => {
      if (gameState !== "playing" || activePavilionModal || activeNPCModal) return;

      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const player = playerRef.current;
      const keys = keysPressed.current;

      // 1. Movement Handling
      let dx = 0;
      let dy = 0;

      if (keys["ArrowUp"] || keys["KeyW"] || keys["w"]) {
        dy -= 1;
        player.facing = "up";
      }
      if (keys["ArrowDown"] || keys["KeyS"] || keys["s"]) {
        dy += 1;
        player.facing = "down";
      }
      if (keys["ArrowLeft"] || keys["KeyA"] || keys["a"]) {
        dx -= 1;
        player.facing = "left";
      }
      if (keys["ArrowRight"] || keys["KeyD"] || keys["d"]) {
        dx += 1;
        player.facing = "right";
      }

      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }

      player.isMoving = dx !== 0 || dy !== 0;
      if (player.isMoving) {
        player.walkFrame += dt * 10;
        player.x += dx * player.speed;
        player.y += dy * player.speed;
      }

      // World boundaries (1200 x 800)
      player.x = Math.max(40, Math.min(1160, player.x));
      player.y = Math.max(40, Math.min(760, player.y));

      // 2. Stars Collect Check
      starsRef.current.forEach((star) => {
        if (!star.collected && Math.hypot(player.x - star.x, player.y - star.y) < 32) {
          star.collected = true;
          sounds.playCollect();
          setScore((s) => s + 200);
          setStarsCollectedCount((c) => c + 1);
          gameStorage.addStars(1);
          addPopup("+1 Star Collected! ⭐", "#FBBF24");
        }
      });

      // 3. Secret Garden Easter Egg Check
      if (!secretGarden.discovered && Math.hypot(player.x - secretGarden.x, player.y - secretGarden.y) < 45) {
        secretGarden.discovered = true;
        sounds.playPowerUp();
        setScore((s) => s + 500);
        gameStorage.unlockAchievement("pq_secret_garden");
        gameStorage.addStars(3);
        addPopup("🌻 Secret Garden Discovered! (+500)", "#10B981");
      }

      // Render Scene
      renderCanvas();

      animationFrameId.current = requestAnimationFrame(updateGame);
    },
    [gameState, activePavilionModal, activeNPCModal, isNight]
  );

  // Victory Handler
  const handleVictory = () => {
    setGameState("victory");
    const bonus = 1000 + starsCollectedCount * 250;
    const finalScore = score + bonus;
    setScore(finalScore);

    const isNew = gameStorage.saveBestScore("portfolio-quest", finalScore);
    setIsNewRecord(isNew);

    gameStorage.addStars(5);
    setStarsEarned(5);

    const newlyUnlocked: Array<{ id: string; title: string; icon: string }> = [];
    if (gameStorage.unlockAchievement("pq_full_explorer")) {
      newlyUnlocked.push({ id: "pq_full_explorer", title: "Portfolio Master", icon: "🗺️" });
    }
    setUnlockedAchievements(newlyUnlocked);
  };

  // Start / Reset
  const startGame = () => {
    sounds.playClick();
    setScore(0);
    setVisitedCount(0);
    setStarsCollectedCount(0);
    setIsNewRecord(false);
    setStarsEarned(0);
    setUnlockedAchievements([]);
    setActivePavilionModal(null);
    setActiveNPCModal(null);

    playerRef.current = {
      x: 600,
      y: 500,
      speed: 3.5,
      facing: "down",
      isMoving: false,
      walkFrame: 0,
    };

    pavilionsRef.current.forEach((p) => (p.visited = false));
    starsRef.current.forEach((s) => (s.collected = false));
    npcsRef.current.forEach((n) => (n.talked = false));
    secretGarden.discovered = false;

    setGameState("playing");
  };

  // Animation kickoff
  useEffect(() => {
    if (gameState === "playing") {
      lastTimeRef.current = performance.now();
      animationFrameId.current = requestAnimationFrame(updateGame);
    }
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [gameState, updateGame]);

  // Render Canvas with Smooth Follow Camera
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const viewportW = canvas.width;
    const viewportH = canvas.height;
    const player = playerRef.current;

    // Follow camera: Center camera on player clamped to world
    const worldW = 1200;
    const worldH = 800;

    let camX = player.x - viewportW / 2;
    let camY = player.y - viewportH / 2;
    camX = Math.max(0, Math.min(worldW - viewportW, camX));
    camY = Math.max(0, Math.min(worldH - viewportH, camY));

    ctx.save();
    // Clear and translate camera
    ctx.clearRect(0, 0, viewportW, viewportH);
    ctx.translate(-camX, -camY);

    // 1. Campus Ground (Lush Grass)
    ctx.fillStyle = isNight ? "#122018" : "#2d4a3e";
    ctx.fillRect(0, 0, worldW, worldH);

    // Subtle grass grid texture
    ctx.strokeStyle = isNight ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < worldW; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, worldH);
      ctx.stroke();
    }
    for (let y = 0; y < worldH; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(worldW, y);
      ctx.stroke();
    }

    // 2. Stone Walkways & Central Plaza
    ctx.fillStyle = isNight ? "#272a33" : "#d8d3c5";
    // Central Plaza
    ctx.beginPath();
    ctx.arc(600, 450, 110, 0, Math.PI * 2);
    ctx.fill();

    // Cross Paths
    ctx.fillRect(560, 0, 80, worldH); // Vertical avenue
    ctx.fillRect(0, 410, worldW, 80); // Horizontal promenade

    // Plaza concentric ring
    ctx.strokeStyle = isNight ? "#3b404f" : "#b8b2a2";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(600, 450, 90, 0, Math.PI * 2);
    ctx.stroke();

    // 3. Central Fountain
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.arc(600, 450, 24, 0, Math.PI * 2);
    ctx.fill();
    // Water pulse
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(600, 450, 12 + ((Date.now() % 1200) / 1200) * 12, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Secret Garden Clearing (North)
    ctx.fillStyle = isNight ? "#1e3a29" : "#3e6b52";
    ctx.beginPath();
    ctx.arc(secretGarden.x, secretGarden.y, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("🌻", secretGarden.x, secretGarden.y);

    // 5. Pavilions
    pavilionsRef.current.forEach((pav) => {
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(pav.x + 6, pav.y + 6, pav.width, pav.height);

      // Building Wall
      ctx.fillStyle = isNight ? "#1e222d" : "#f1ede4";
      ctx.fillRect(pav.x, pav.y, pav.width, pav.height);
      ctx.strokeStyle = pav.color;
      ctx.lineWidth = pav.visited ? 3 : 2;
      ctx.strokeRect(pav.x, pav.y, pav.width, pav.height);

      // Roof Banner
      ctx.fillStyle = pav.color;
      ctx.fillRect(pav.x, pav.y, pav.width, 24);

      // Roof Title
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(pav.name, pav.x + pav.width / 2, pav.y + 16);

      // Doorway
      ctx.fillStyle = isNight ? "#0d1017" : "#334155";
      ctx.fillRect(pav.x + pav.width / 2 - 14, pav.y + pav.height - 24, 28, 24);

      // Visited Checkmark Badge
      if (pav.visited) {
        ctx.fillStyle = "#10B981";
        ctx.beginPath();
        ctx.arc(pav.x + pav.width - 12, pav.y + 12, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px sans-serif";
        ctx.fillText("✓", pav.x + pav.width - 12, pav.y + 15);
      }
    });

    // 6. Collectible Stars
    starsRef.current.forEach((s) => {
      if (!s.collected) {
        const floatY = Math.sin(Date.now() / 300) * 4;
        ctx.font = "18px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("⭐", s.x, s.y + floatY);
      }
    });

    // 7. NPCs
    npcsRef.current.forEach((npc) => {
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.beginPath();
      ctx.ellipse(npc.x, npc.y + 12, 12, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Emoji Avatar
      ctx.font = "24px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(npc.emoji, npc.x, npc.y);

      // Name Tag
      ctx.fillStyle = isNight ? "#ffffff" : "#0f172a";
      ctx.font = "bold 10px monospace";
      ctx.fillText(npc.name, npc.x, npc.y - 18);
    });

    // 8. Player Avatar
    ctx.save();
    ctx.translate(player.x, player.y);

    // Player Shadow
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.ellipse(0, 14, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body (Warm ivory/amber jacket)
    ctx.fillStyle = "#2563eb";
    ctx.beginPath();
    ctx.roundRect(-8, -4, 16, 18, 4);
    ctx.fill();

    // Head
    ctx.fillStyle = "#fcd34d";
    ctx.beginPath();
    ctx.arc(0, -10, 8, 0, Math.PI * 2);
    ctx.fill();

    // Hair / Glasses
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(0, -13, 7, Math.PI, Math.PI * 2);
    ctx.fill();

    // Walking leg animation
    const legOffset = player.isMoving ? Math.sin(player.walkFrame) * 4 : 0;
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(-6, 14, 4, 6 + legOffset);
    ctx.fillRect(2, 14, 4, 6 - legOffset);

    // Player Name
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 10px monospace";
    ctx.textAlign = "center";
    ctx.fillText("Kristian", 0, -22);

    ctx.restore();

    // 9. Night Tint / Lamp Lights
    if (isNight) {
      ctx.fillStyle = "rgba(10, 15, 26, 0.45)";
      ctx.fillRect(0, 0, worldW, worldH);
    }

    ctx.restore();
  };

  // Mobile & Touch virtual movement
  const handleTouchKey = (key: string, isDown: boolean) => {
    keysPressed.current[key] = isDown;
  };

  return (
    <GameShell
      gameId="portfolio-quest"
      gameTitle="Portfolio Quest"
      subtitle="2D RPG Campus & Milestone Exploration"
      score={score}
      bestScore={bestScore}
      isPaused={gameState === "paused"}
      onTogglePause={() => setGameState((s) => (s === "playing" ? "paused" : s === "paused" ? "playing" : s))}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="w-full h-full object-cover select-none"
      />

      {/* Active In-Game HUD */}
      {gameState === "playing" && (
        <>
          <GameHUD
            score={score}
            objective={`FIND & INSPECT 5 PAVILIONS (${visitedCount}/5) · Stars (${starsCollectedCount}/5)`}
            secondaryMetric={{
              label: "Pavilions",
              value: `${visitedCount}/5`,
              icon: <BookOpen className="w-3.5 h-3.5 text-accent" />,
            }}
            feedbackPopups={feedbackPopups}
            onOpenTutorial={() => setShowTutorial(true)}
          />

          {/* Contextual In-Game Hint */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] shadow-lg flex items-center gap-1.5">
              <span>💡</span>
              {visitedCount === 0 ? (
                <span>Walk up to any building or NPC and press [E] or tap 'Talk / Inspect'!</span>
              ) : visitedCount < 5 ? (
                <span>Follow stone promenades to remaining pavilions or explore the northern grove!</span>
              ) : (
                <span className="text-emerald-400 font-bold">All 5 Pavilions Explored! Master Explorer award unlocked!</span>
              )}
            </div>
          </div>

          {/* Action Bar Bottom Left: Inspect & Day/Night */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 pointer-events-auto">
            <button
              type="button"
              onClick={checkNearbyInteractions}
              className="px-3.5 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Talk / Inspect [E]</span>
            </button>

            <button
              type="button"
              onClick={() => setIsNight((n) => !n)}
              className="p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white cursor-pointer"
              title="Toggle Day/Night"
            >
              {isNight ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-sky-300" />}
            </button>
          </div>

          {/* Dual-Thumb On-Screen Controls (Visible on mobile, tablets & touch devices) */}
          <div className="absolute inset-x-0 bottom-3 px-3 sm:px-4 z-20 flex justify-between items-end pointer-events-none select-none">
            {/* Left Thumb: 4-Way D-Pad */}
            <div className="flex flex-col items-center gap-1.5 pointer-events-auto">
              <button
                type="button"
                aria-label="Walk Up"
                style={{ touchAction: "none" }}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleTouchKey("ArrowUp", true);
                }}
                onPointerUp={() => handleTouchKey("ArrowUp", false)}
                onPointerLeave={() => handleTouchKey("ArrowUp", false)}
                onPointerCancel={() => handleTouchKey("ArrowUp", false)}
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-black/60 active:bg-accent/80 border border-white/20 active:border-accent text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label="Walk Left"
                  style={{ touchAction: "none" }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    handleTouchKey("ArrowLeft", true);
                  }}
                  onPointerUp={() => handleTouchKey("ArrowLeft", false)}
                  onPointerLeave={() => handleTouchKey("ArrowLeft", false)}
                  onPointerCancel={() => handleTouchKey("ArrowLeft", false)}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-black/60 active:bg-accent/80 border border-white/20 active:border-accent text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Walk Down"
                  style={{ touchAction: "none" }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    handleTouchKey("ArrowDown", true);
                  }}
                  onPointerUp={() => handleTouchKey("ArrowDown", false)}
                  onPointerLeave={() => handleTouchKey("ArrowDown", false)}
                  onPointerCancel={() => handleTouchKey("ArrowDown", false)}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-black/60 active:bg-accent/80 border border-white/20 active:border-accent text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <ArrowDown className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Walk Right"
                  style={{ touchAction: "none" }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    handleTouchKey("ArrowRight", true);
                  }}
                  onPointerUp={() => handleTouchKey("ArrowRight", false)}
                  onPointerLeave={() => handleTouchKey("ArrowRight", false)}
                  onPointerCancel={() => handleTouchKey("ArrowRight", false)}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-black/60 active:bg-accent/80 border border-white/20 active:border-accent text-white flex items-center justify-center backdrop-blur-md shadow-lg transition-transform active:scale-95 cursor-pointer"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Thumb: Interact / Inspect Action Button */}
            <div className="pointer-events-auto">
              <button
                type="button"
                onClick={checkNearbyInteractions}
                className="px-4 py-3 rounded-2xl bg-gradient-to-r from-accent to-emerald-600 hover:from-accent-hover hover:to-emerald-500 active:scale-95 text-white font-mono font-bold text-xs flex items-center gap-2 backdrop-blur-md shadow-xl border border-white/20 cursor-pointer transition-all"
                title="Interact or inspect nearby item (E)"
              >
                <span className="text-base">💬</span>
                <span>INTERACT [E]</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Pavilion Interactive Inspection Modal */}
      {activePavilionModal && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-md my-auto bg-[#181920] border-2 border-white/15 rounded-3xl p-5 sm:p-6 text-white space-y-4 shadow-2xl max-h-[88vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider mb-1"
                  style={{ backgroundColor: `${activePavilionModal.color}25`, color: activePavilionModal.color }}
                >
                  {activePavilionModal.badge}
                </span>
                <h3 className="text-xl font-display font-bold">{activePavilionModal.name}</h3>
                <p className="text-xs font-mono text-white/60">{activePavilionModal.tagline}</p>
              </div>
              <button
                type="button"
                onClick={() => setActivePavilionModal(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-white/80 leading-relaxed font-sans">
              {activePavilionModal.description}
            </p>

            <div className="space-y-1.5 bg-black/40 p-3 rounded-2xl">
              <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider block">Key Highlights</span>
              <ul className="text-xs space-y-1 font-mono text-white/90">
                {activePavilionModal.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setActivePavilionModal(null)}
              className="w-full py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono font-bold text-xs cursor-pointer"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}

      {/* NPC Dialogue Modal */}
      {activeNPCModal && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-sm my-auto bg-[#181920] border-2 border-white/15 rounded-3xl p-5 text-white space-y-4 shadow-2xl max-h-[88vh] overflow-y-auto">
            <div className="flex items-center gap-3">
              <div className="text-3xl p-2 rounded-2xl bg-white/10">{activeNPCModal.emoji}</div>
              <div>
                <h3 className="text-base font-display font-bold">{activeNPCModal.name}</h3>
                <span className="text-[11px] font-mono text-white/50">Campus Resident</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-xs font-sans text-white/90 leading-relaxed italic">
              "{activeNPCModal.dialogue}"
            </div>

            <button
              type="button"
              onClick={() => setActiveNPCModal(null)}
              className="w-full py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-mono font-bold text-xs cursor-pointer"
            >
              Wave & Goodbye
            </button>
          </div>
        </div>
      )}

      {/* Start Screen */}
      {gameState === "start" && (
        <GameStartScreen
          title="PORTFOLIO QUEST"
          tagline="2D RPG Campus & Milestones Adventure"
          description="Step into Kristian's campus world. Walk across stone promenades, visit the 5 major pavilions, talk with campus friends, and uncover secret stars."
          badge="Interactive RPG Adventure"
          bestScore={bestScore}
          controls={{
            keyboard: "WASD / Arrows to move · E to inspect",
            touch: "On-screen directional buttons · Talk button",
            mouse: "Click inspect & toggle day/night lighting",
          }}
          objectives={[
            "Visit and inspect all 5 Pavilions to earn the Portfolio Master award.",
            "Gather all 5 hidden stars scattered around campus pathways.",
            "Talk to campus residents (Prof. Hartono, Alex, & Mochi the Cat).",
            "Seek out the hidden secret garden in the northern grove!",
          ]}
          onStart={startGame}
        />
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
        config={PORTFOLIO_QUEST_TUTORIAL}
        onComplete={() => {
          setShowTutorial(false);
          if (gameState === "start") startGame();
        }}
        onClose={() => setShowTutorial(false)}
      />

      {/* Victory Modal */}
      <GameResultModal
        isOpen={gameState === "victory" || gameState === "gameover"}
        isVictory={gameState === "victory"}
        title="CAMPUS JOURNEY COMPLETE!"
        score={score}
        bestScore={bestScore}
        isNewRecord={isNewRecord}
        starsEarned={starsEarned}
        breakdown={[
          { label: "Pavilions Discovered", value: `${visitedCount} / 5` },
          { label: "Campus Stars Collected", value: `${starsCollectedCount} / 5` },
          { label: "Secret Garden", value: secretGarden.discovered ? "Discovered! 🌻" : "Undiscovered" },
        ]}
        unlockedAchievements={unlockedAchievements}
        onReplay={startGame}
      />
    </GameShell>
  );
}
