"use client";

import React, { useState, useEffect, useRef } from "react";
import GameShell from "@/components/games/GameShell";
import GameHUD from "@/components/games/GameHUD";
import GameStartScreen from "@/components/games/GameStartScreen";
import GamePauseModal from "@/components/games/GamePauseModal";
import GameResultModal from "@/components/games/GameResultModal";
import GameTutorialModal, { TutorialConfig } from "@/components/games/GameTutorialModal";
import { sounds } from "@/components/Play/SoundEffects";
import { gameStorage } from "@/lib/gameStorage";
import { Eye, Clock, Zap, Sparkles, HelpCircle, Layers } from "lucide-react";

const MEMORY_TUTORIAL: TutorialConfig = {
  gameId: "memory",
  gameTitle: "Memory of My Journey",
  objective: "Match all 8 pairs before time runs out.",
  controlText: "Click or tap any card to flip it face up.",
  doText: "Find pairs of matching milestones. Rapid consecutive matches (<4.5s) activate combos!",
  avoidText: "Mismatches reset your combo multiplier. Watch out for sudden Memory Fog!",
  winText: "Clear all 8 milestone pairs across 3 levels to win.",
  demoType: "memory",
};

interface MilestoneCard {
  id: number;
  pairId: string;
  title: string;
  category: string;
  emoji: string;
  color: string;
  isSpecial?: "freeze" | "peek" | "double";
  isFlipped: boolean;
  isMatched: boolean;
}

const MILESTONES = [
  {
    pairId: "ecorouter",
    title: "EcoRouter AI",
    category: "AI & Logistics",
    emoji: "🌱",
    color: "#10B981",
  },
  {
    pairId: "icoris",
    title: "ICORIS 2024",
    category: "IEEE Research",
    emoji: "📜",
    color: "#3B82F6",
    isSpecial: "peek" as const,
  },
  {
    pairId: "compfest",
    title: "CompFest AIC",
    category: "Top 41 Finalist",
    emoji: "🏆",
    color: "#F59E0B",
    isSpecial: "double" as const,
  },
  {
    pairId: "nextjs",
    title: "Next.js Fullstack",
    category: "Engineering",
    emoji: "⚛️",
    color: "#6366F1",
  },
  {
    pairId: "cv",
    title: "Deep Vision",
    category: "Machine Learning",
    emoji: "👁️",
    color: "#EC4899",
    isSpecial: "freeze" as const,
  },
  {
    pairId: "design",
    title: "Figma UI/UX",
    category: "Design System",
    emoji: "🎨",
    color: "#8B5CF6",
  },
  {
    pairId: "mc",
    title: "Stage Host MC",
    category: "Leadership",
    emoji: "🎙️",
    color: "#06B6D4",
  },
  {
    pairId: "walubi",
    title: "WALUBI Health",
    category: "Volunteer",
    emoji: "🤝",
    color: "#14B8A6",
  },
];

export default function MemoryJourneyGame() {
  // Game States
  const [gameState, setGameState] = useState<"start" | "playing" | "paused" | "gameover" | "victory">("start");
  const [showTutorial, setShowTutorial] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);
  const [level, setLevel] = useState(1);
  const [cards, setCards] = useState<MilestoneCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(75);
  const [combo, setCombo] = useState(1);
  const [isFrozen, setIsFrozen] = useState(false);
  const [isFogActive, setIsFogActive] = useState(false);
  const [feedbackPopups, setFeedbackPopups] = useState<Array<{ id: string; text: string; color?: string; y?: number }>>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Array<{ id: string; title: string; icon: string }>>([]);
  const [isMuted, setIsMuted] = useState(true);

  const lastMatchTimeRef = useRef<number>(0);
  const consecutiveMissesRef = useRef<number>(0);

  // Load High Score on Mount
  useEffect(() => {
    setBestScore(gameStorage.getBestScore("memory"));
    setIsMuted(sounds.isMuted);

    if (typeof window !== "undefined") {
      const tutDone = localStorage.getItem("kn_tut_memory");
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

  // Keyboard ESC listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        if (gameState === "playing") setGameState("paused");
        else if (gameState === "paused") setGameState("playing");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  // Countdown timer loop
  useEffect(() => {
    if (gameState !== "playing" || isFrozen) return;

    const timer = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          handleGameOver();
          return 0;
        }

        // Random Memory Fog hazard on Level 2 & 3
        if (level >= 2 && Math.random() < 0.05 && !isFogActive) {
          setIsFogActive(true);
          setTimeout(() => setIsFogActive(false), 2500);
        }

        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, isFrozen, level, isFogActive]);

  // Initialize deck for current level
  const setupDeck = (currentLvl: number) => {
    const deck: MilestoneCard[] = [];
    MILESTONES.forEach((m, idx) => {
      // Create two cards per milestone
      deck.push({
        id: idx * 2,
        pairId: m.pairId,
        title: m.title,
        category: m.category,
        emoji: m.emoji,
        color: m.color,
        isSpecial: m.isSpecial,
        isFlipped: false,
        isMatched: false,
      });
      deck.push({
        id: idx * 2 + 1,
        pairId: m.pairId,
        title: m.title,
        category: m.category,
        emoji: m.emoji,
        color: m.color,
        isSpecial: m.isSpecial,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle deck
    const shuffled = deck.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIds([]);
    setMatchedPairs(0);
    consecutiveMissesRef.current = 0;

    const timeAlloc = currentLvl === 1 ? 75 : currentLvl === 2 ? 60 : 45;
    setTimeRemaining(timeAlloc);
  };

  // Start game
  const startGame = () => {
    sounds.playClick();
    setScore(0);
    setLevel(1);
    setMoves(0);
    setCombo(1);
    setIsNewRecord(false);
    setStarsEarned(0);
    setUnlockedAchievements([]);
    setupDeck(1);
    setGameState("playing");
  };

  // Card Flip Click Handler
  const handleCardClick = (clickedCard: MilestoneCard) => {
    if (gameState !== "playing" || clickedCard.isFlipped || clickedCard.isMatched || flippedIds.length >= 2) {
      return;
    }

    sounds.playCardFlip();

    // Flip card
    const nextFlippedIds = [...flippedIds, clickedCard.id];
    setCards((prev) =>
      prev.map((c) => (c.id === clickedCard.id ? { ...c, isFlipped: true } : c))
    );
    setFlippedIds(nextFlippedIds);

    // If 2 cards now flipped, evaluate match
    if (nextFlippedIds.length === 2) {
      setMoves((m) => m + 1);

      const firstCard = cards.find((c) => c.id === nextFlippedIds[0]);
      const secondCard = clickedCard;

      if (!firstCard) return;

      if (firstCard.pairId === secondCard.pairId) {
        // MATCH!
        sounds.playCollect();

        // Check Combo Timing (< 4.5 seconds)
        const now = Date.now();
        const timeDiff = (now - lastMatchTimeRef.current) / 1000;
        lastMatchTimeRef.current = now;

        let nextCombo = 1;
        if (timeDiff < 4.5 && moves > 1) {
          nextCombo = Math.min(4, combo + 1);
          setCombo(nextCombo);
          sounds.playCombo(nextCombo);
        } else {
          setCombo(1);
        }

        const basePoints = 250;
        const earned = basePoints * nextCombo;
        setScore((s) => s + earned);
        addPopup(`+${earned} ${nextCombo > 1 ? `COMBO x${nextCombo}!` : "MATCH!"}`, firstCard.color);

        // Mark as matched
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === firstCard.pairId ? { ...c, isMatched: true } : c
            )
          );
          setFlippedIds([]);
          setMatchedPairs((mp) => {
            const nextMp = mp + 1;
            if (nextMp === 8) {
              // Level cleared!
              handleLevelComplete();
            }
            return nextMp;
          });
        }, 350);

        // Handle Special Cards
        if (firstCard.isSpecial === "freeze") {
          setIsFrozen(true);
          addPopup("⏱️ TIME FROZEN (5s)!", "#06B6D4");
          gameStorage.unlockAchievement("mj_time_freeze");
          setTimeout(() => setIsFrozen(false), 5000);
        } else if (firstCard.isSpecial === "peek") {
          // Peek Hint
          addPopup("👁️ PEEK HINT REVEALED!", "#3B82F6");
          setCards((prev) => prev.map((c) => ({ ...c, isFlipped: true })));
          setTimeout(() => {
            setCards((prev) => prev.map((c) => (c.isMatched ? c : { ...c, isFlipped: false })));
          }, 1200);
        }
      } else {
        // MISMATCH
        consecutiveMissesRef.current++;
        setCombo(1);

        // Turn back face down after 800ms
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              nextFlippedIds.includes(c.id) ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedIds([]);
        }, 750);
      }
    }
  };

  // Level Complete / Victory
  const handleLevelComplete = () => {
    sounds.playVictory();

    if (level < 3) {
      // Advance to next level
      const nextLvl = level + 1;
      setLevel(nextLvl);
      addPopup(`LEVEL ${nextLvl} UNLOCKED!`, "#10B981");
      setTimeout(() => {
        setupDeck(nextLvl);
      }, 1000);
    } else {
      // Victory!
      setGameState("victory");
      const bonus = timeRemaining * 20 + 1000;
      const finalScore = score + bonus;
      setScore(finalScore);

      const isNew = gameStorage.saveBestScore("memory", finalScore);
      setIsNewRecord(isNew);

      gameStorage.addStars(4);
      setStarsEarned(4);

      const newlyUnlocked: Array<{ id: string; title: string; icon: string }> = [];
      if (consecutiveMissesRef.current === 0) {
        if (gameStorage.unlockAchievement("mj_flawless")) {
          newlyUnlocked.push({ id: "mj_flawless", title: "Sharp Mind", icon: "🧠" });
        }
      }
      if (timeRemaining > 20) {
        if (gameStorage.unlockAchievement("mj_speedrun")) {
          newlyUnlocked.push({ id: "mj_speedrun", title: "Speed Reader", icon: "🚀" });
        }
      }
      setUnlockedAchievements(newlyUnlocked);
    }
  };

  // Game Over
  const handleGameOver = () => {
    setGameState("gameover");
    const isNew = gameStorage.saveBestScore("memory", score);
    setIsNewRecord(isNew);
  };

  return (
    <GameShell
      gameId="memory"
      gameTitle="Memory of My Journey"
      subtitle="Milestone Matching & Recall Quest"
      score={score}
      bestScore={bestScore}
      isPaused={gameState === "paused"}
      onTogglePause={() => setGameState((s) => (s === "playing" ? "paused" : s === "paused" ? "playing" : s))}
    >
      {/* 4x4 Cards Board Arena */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 select-none overflow-hidden bg-gradient-to-b from-[#14151b] via-[#101116] to-[#0c0d12]">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:28px_28px] opacity-5 pointer-events-none" />

        {/* Memory Fog Hazard Overlay */}
        {isFogActive && (
          <div className="absolute inset-0 z-20 bg-slate-200/25 dark:bg-slate-700/35 backdrop-blur-md flex items-center justify-center pointer-events-none animate-pulse">
            <span className="font-mono font-bold text-white text-sm bg-black/60 px-4 py-1.5 rounded-full">
              🌫️ MEMORY FOG HAZARD! RECALL POSITIONS!
            </span>
          </div>
        )}

        {/* Active HUD */}
        {gameState === "playing" && (
          <>
            <GameHUD
              score={score}
              combo={combo}
              level={level}
              maxLevel={3}
              timeRemaining={timeRemaining}
              objective={`Match milestone pairs (${matchedPairs}/8)`}
              secondaryMetric={{
                label: "Moves",
                value: moves,
                icon: <Layers className="w-3.5 h-3.5 text-accent" />,
              }}
              feedbackPopups={feedbackPopups}
              onOpenTutorial={() => setShowTutorial(true)}
            />

            {/* Contextual In-Game Hint */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                <span>💡</span>
                {matchedPairs === 0 ? (
                  <span>Click any card to reveal its milestone icon and name</span>
                ) : flippedIds.length === 1 ? (
                  <span>Now find the identical matching card before it flips back!</span>
                ) : (
                  <span>Chain rapid pairs under 4.5s to multiply combo bonus!</span>
                )}
              </div>
            </div>
          </>
        )}

        {/* 4x4 Grid of Cards */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-lg aspect-square mt-10 sm:mt-12">
          {cards.map((card) => {
            const isRevealed = card.isFlipped || card.isMatched;

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`relative w-full h-full rounded-2xl cursor-pointer transition-all duration-300 transform perspective-1000 ${
                  card.isMatched ? "opacity-75 scale-95" : "hover:scale-102"
                }`}
              >
                {/* 3D Flip Card Container */}
                <div
                  className={`w-full h-full rounded-2xl transition-transform duration-500 transform-style-3d ${
                    isRevealed ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Card Back (Tactile Wax Crest) */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#232733] to-[#151720] border-2 border-white/10 flex flex-col items-center justify-center backface-hidden shadow-md group">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="font-display font-extrabold text-xs sm:text-sm text-accent-light">
                        KN
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-white/40 mt-1 tracking-widest uppercase">
                      JOURNEY
                    </span>
                  </div>

                  {/* Card Front (Milestone Face) */}
                  <div
                    className="absolute inset-0 rounded-2xl border-2 flex flex-col items-center justify-center p-2 backface-hidden rotate-y-180 shadow-lg text-center"
                    style={{
                      backgroundColor: "#1c1f2b",
                      borderColor: card.isMatched ? "#10B981" : card.color,
                    }}
                  >
                    <span className="text-2xl sm:text-3xl mb-1">{card.emoji}</span>
                    <span className="text-[11px] sm:text-xs font-display font-bold text-white line-clamp-1">
                      {card.title}
                    </span>
                    <span
                      className="text-[9px] font-mono uppercase tracking-wider line-clamp-1"
                      style={{ color: card.color }}
                    >
                      {card.category}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start Screen */}
      {gameState === "start" && (
        <GameStartScreen
          title="MEMORY OF MY JOURNEY"
          tagline="Tactile Milestone Matching Challenge"
          description="Test your memory and reflex recall. Match 8 milestones across Kristian's academic and engineering journey. Chain rapid matches for combo multipliers and unlock special abilities."
          badge="Memory & Recall Quest"
          bestScore={bestScore}
          controls={{
            mouse: "Click cards to flip and match pairs",
            touch: "Tap cards directly on touchscreen",
            keyboard: "ESC to pause the timer",
          }}
          objectives={[
            "Find all 8 milestone pairs before the timer ticks to zero.",
            "Chain consecutive matches in under 4.5s for Combo Multipliers (x2, x3, x4).",
            "Trigger Special Cards (Time Freeze ⏱️ and Peek Hint 👁️).",
            "Survive Memory Fog hazards across 3 progressive levels!",
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
        config={MEMORY_TUTORIAL}
        onComplete={() => {
          setShowTutorial(false);
          if (typeof window !== "undefined") {
            localStorage.setItem("kn_tut_memory", "true");
          }
          if (gameState === "start") startGame();
        }}
        onClose={() => setShowTutorial(false)}
      />

      {/* Victory / Game Over Modal */}
      <GameResultModal
        isOpen={gameState === "victory" || gameState === "gameover"}
        isVictory={gameState === "victory"}
        title={gameState === "victory" ? "ALL MILESTONES RECALLED!" : "TIME EXPIRED"}
        score={score}
        bestScore={bestScore}
        isNewRecord={isNewRecord}
        starsEarned={starsEarned}
        breakdown={[
          { label: "Level Reached", value: `Level ${level} / 3` },
          { label: "Total Moves", value: moves },
          { label: "Time Preserved", value: `${timeRemaining}s` },
        ]}
        unlockedAchievements={unlockedAchievements}
        onReplay={startGame}
      />
    </GameShell>
  );
}
