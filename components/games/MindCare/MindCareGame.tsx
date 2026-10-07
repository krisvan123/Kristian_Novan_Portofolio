"use client";

import React, { useState, useEffect } from "react";
import GameShell from "@/components/games/GameShell";
import GameHUD from "@/components/games/GameHUD";
import GameStartScreen from "@/components/games/GameStartScreen";
import GamePauseModal from "@/components/games/GamePauseModal";
import GameResultModal from "@/components/games/GameResultModal";
import GameTutorialModal, { TutorialConfig } from "@/components/games/GameTutorialModal";
import { sounds } from "@/components/Play/SoundEffects";
import { gameStorage } from "@/lib/gameStorage";
import { Coffee, Trees, Laptop, BookOpen, Smartphone, Sun, Moon, Cloud, Heart, Sparkles, CheckCircle2 } from "lucide-react";

const MINDCARE_TUTORIAL: TutorialConfig = {
  gameId: "mindcare",
  gameTitle: "MindCare Choice",
  objective: "Balance your Energy, Clarity, and Flow across 6 mindful choices.",
  controlText: "Click or tap objects in the room (Window, Tea, Plant, Laptop, Bookshelf, Phone).",
  doText: "Tend to living things, take calming breaths at the window, and protect your focus.",
  avoidText: "Don't sprint on the laptop when your energy is low—rest first!",
  winText: "Complete 6 intentional choices to reach 1 of 4 unique story endings.",
  demoType: "mindcare",
};

interface NarrativeEnding {
  id: string;
  title: string;
  badge: string;
  description: string;
  reflection: string;
  icon: string;
}

const ENDINGS: Record<string, NarrativeEnding> = {
  flow: {
    id: "flow",
    title: "The Deep Creative Flow",
    badge: "Balanced Excellence",
    description: "You cultivated a calm workspace, balanced your energy, and channeled deep focus without burnout.",
    reflection: "Great craft doesn't come from relentless exhaustion; it emerges from clarity, intention, and well-nourished curiosity.",
    icon: "⚡",
  },
  sunset: {
    id: "sunset",
    title: "The Peaceful Golden Hour",
    badge: "Mindful Presence",
    description: "You stepped away from the glowing screen, opened the window, and let the evening breeze wash away the clutter.",
    reflection: "Rest doesn't have to be earned; it is essential sustenance for the road ahead.",
    icon: "🌅",
  },
  starlight: {
    id: "starlight",
    title: "The Midnight Starlight",
    badge: "Quiet Clarity",
    description: "Under the tranquil night sky, you sorted through your thoughts, closed unresolved tabs, and found peaceful quietude.",
    reflection: "Sometimes the most productive thing you can do is simply allow the day to come to a gentle close.",
    icon: "✨",
  },
  recharge: {
    id: "recharge",
    title: "The Recharged Spirit",
    badge: "Gentle Recovery",
    description: "You set boundaries with your devices, sipped hot tea, tended to living things, and gave your mind room to heal.",
    reflection: "Taking care of your inner ecosystem is the foundation upon which everything else is built.",
    icon: "🌸",
  },
};

export default function MindCareGame() {
  // Game States
  const [gameState, setGameState] = useState<"start" | "playing" | "paused" | "gameover" | "victory">("start");
  const [showTutorial, setShowTutorial] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);

  // Core Metrics
  const [energy, setEnergy] = useState(65);
  const [clarity, setClarity] = useState(50);
  const [flow, setFlow] = useState(40);

  // Time of Day progression (0 = Afternoon, 1 = Sunset, 2 = Twilight, 3 = Night)
  const [timeStage, setTimeStage] = useState<0 | 1 | 2 | 3>(0);
  const [actionsTaken, setActionsTaken] = useState(0);
  const [plantWaterCount, setPlantWaterCount] = useState(0);
  const [isPlantBlooming, setIsPlantBlooming] = useState(false);
  const [activeStoryText, setActiveStoryText] = useState(
    "Afternoon light filters through the window. Your desk is quiet, but tabs and thoughts are gently accumulating. What would you like to tend to first?"
  );
  const [chosenEnding, setChosenEnding] = useState<NarrativeEnding | null>(null);

  const [feedbackPopups, setFeedbackPopups] = useState<Array<{ id: string; text: string; color?: string; y?: number }>>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Array<{ id: string; title: string; icon: string }>>([]);
  const [isMuted, setIsMuted] = useState(true);

  // Load High Score on Mount
  useEffect(() => {
    setBestScore(gameStorage.getBestScore("mindcare"));
    setIsMuted(sounds.isMuted);

    if (typeof window !== "undefined") {
      const tutDone = localStorage.getItem("kn_tut_mindcare");
      if (!tutDone) {
        setShowTutorial(true);
      }
    }
  }, []);

  // Popup helper
  const addPopup = (text: string, color = "#10B981") => {
    const id = Math.random().toString();
    setFeedbackPopups((prev) => [...prev, { id, text, color }]);
    setTimeout(() => {
      setFeedbackPopups((prev) => prev.filter((p) => p.id !== id));
    }, 1200);
  };

  // Check Ending trigger after 6 meaningful actions
  const advanceTurn = (newEnergy: number, newClarity: number, newFlow: number) => {
    const nextActions = actionsTaken + 1;
    setActionsTaken(nextActions);

    // Progress time stage
    if (nextActions === 2) setTimeStage(1); // Sunset
    else if (nextActions === 4) setTimeStage(2); // Twilight
    else if (nextActions >= 5) setTimeStage(3); // Starry Night

    if (nextActions >= 6) {
      // Determine Ending
      let endKey = "recharge";
      if (newFlow >= 70 && newEnergy >= 60) endKey = "flow";
      else if (newClarity >= 75) endKey = "sunset";
      else if (timeStage >= 2 && newClarity >= 60) endKey = "starlight";

      triggerEnding(ENDINGS[endKey]);
    }
  };

  const triggerEnding = (ending: NarrativeEnding) => {
    setChosenEnding(ending);
    setGameState("victory");

    const calculatedScore = Math.floor(energy * 10 + clarity * 12 + flow * 15);
    setScore(calculatedScore);

    const isNew = gameStorage.saveBestScore("mindcare", calculatedScore);
    setIsNewRecord(isNew);

    gameStorage.addStars(4);
    setStarsEarned(4);

    const newlyUnlocked: Array<{ id: string; title: string; icon: string }> = [];
    if (gameStorage.unlockAchievement("mc_mindful_pause")) {
      newlyUnlocked.push({ id: "mc_mindful_pause", title: "Gentle Pause", icon: "☕" });
    }
    setUnlockedAchievements(newlyUnlocked);
  };

  // Start / Reset
  const startGame = () => {
    sounds.playClick();
    setScore(0);
    setEnergy(65);
    setClarity(50);
    setFlow(40);
    setTimeStage(0);
    setActionsTaken(0);
    setPlantWaterCount(0);
    setIsPlantBlooming(false);
    setChosenEnding(null);
    setIsNewRecord(false);
    setStarsEarned(0);
    setUnlockedAchievements([]);
    setActiveStoryText(
      "Warm light pours through the window. The room is peacefully quiet. Choose an object to interact with."
    );
    setGameState("playing");
  };

  // 1. Water the Plant
  const handleInteractPlant = () => {
    sounds.playCollect();
    const nextCount = plantWaterCount + 1;
    setPlantWaterCount(nextCount);

    const nextClarity = Math.min(100, clarity + 12);
    setClarity(nextClarity);

    if (nextCount >= 3 && !isPlantBlooming) {
      setIsPlantBlooming(true);
      sounds.playPowerUp();
      gameStorage.unlockAchievement("mc_flower_bloom");
      gameStorage.addStars(2);
      addPopup("🌸 The Monstera bloomed with pink petals!", "#EC4899");
      setActiveStoryText(
        "You gently poured fresh water over the soil. Miraculously, a tiny vibrant flower unfurls its petals toward the light! (+Clarity, Secret Unlocked)"
      );
    } else {
      addPopup("+12 Clarity (Plant Tended)", "#10B981");
      setActiveStoryText(
        "You mist the leaves with cool water and wipe away the dust. Taking care of another living thing brings quiet stillness to your mind."
      );
    }

    advanceTurn(energy, nextClarity, flow);
  };

  // 2. Sip Tea / Coffee
  const handleInteractTea = () => {
    sounds.playCollect();
    const nextEnergy = Math.min(100, energy + 18);
    const nextClarity = Math.min(100, clarity + 6);
    setEnergy(nextEnergy);
    setClarity(nextClarity);

    addPopup("+18 Energy (Hot Tea Sipped)", "#F59E0B");
    setActiveStoryText(
      "You take a slow, warming sip of freshly brewed tea. The steam warms your face. Your shoulders drop an inch from your ears."
    );
    advanceTurn(nextEnergy, nextClarity, flow);
  };

  // 3. Look Out the Window
  const handleInteractWindow = () => {
    sounds.playCardFlip();
    const nextClarity = Math.min(100, clarity + 20);
    const nextEnergy = Math.min(100, energy + 8);
    setClarity(nextClarity);
    setEnergy(nextEnergy);

    addPopup("+20 Clarity (Mindful Breaths)", "#38BDF8");
    setActiveStoryText(
      "You gaze out the large glass pane. Distant birds sweep past clouds changing tone. You inhale for 4 counts, hold for 4, and gently release."
    );
    advanceTurn(nextEnergy, nextClarity, flow);
  };

  // 4. Laptop Focus Sprint
  const handleInteractLaptop = () => {
    sounds.playClick();
    if (energy < 20) {
      sounds.playGlitch();
      addPopup("Too tired for sprint! Sip tea or gaze out window.", "#EF4444");
      setActiveStoryText("Your eyes are strained. Pushing through right now would lead to frustration. Take a brief pause first.");
      return;
    }

    const nextFlow = Math.min(100, flow + 22);
    const nextEnergy = Math.max(10, energy - 15);
    setFlow(nextFlow);
    setEnergy(nextEnergy);

    addPopup("+22 Flow (-15 Energy)", "#6366F1");
    setActiveStoryText(
      "You open your code editor and lock into a crisp 20-minute feature sprint. Clean algorithms fall neatly into place. Ideas materialize."
    );
    advanceTurn(nextEnergy, clarity, nextFlow);
  };

  // 5. Bookshelf
  const handleInteractBookshelf = () => {
    sounds.playCardFlip();
    const nextClarity = Math.min(100, clarity + 14);
    const nextFlow = Math.min(100, flow + 10);
    setClarity(nextClarity);
    setFlow(nextFlow);

    addPopup("+14 Clarity, +10 Flow (Design Philosophy)", "#8B5CF6");
    setActiveStoryText(
      "You pull a worn volume on Dieter Rams and Humane Interface Design from the shelf. A single highlighted line resonates deeply: 'Good design is as little design as possible.'"
    );
    advanceTurn(energy, nextClarity, nextFlow);
  };

  // 6. Phone: Do Not Disturb
  const handleInteractPhone = () => {
    sounds.playCollect();
    const nextClarity = Math.min(100, clarity + 16);
    setClarity(nextClarity);

    addPopup("+16 Clarity (Do Not Disturb Enabled)", "#10B981");
    setActiveStoryText(
      "You flip on 'Do Not Disturb' and turn the smartphone facedown. The constant stream of pings ceases. The room belongs solely to you."
    );
    advanceTurn(energy, nextClarity, flow);
  };

  // Sky Colors by Stage
  const skyGradients = [
    "from-amber-100 via-sky-200 to-sky-300", // Afternoon
    "from-rose-400 via-amber-300 to-sky-400", // Sunset
    "from-purple-900 via-indigo-800 to-slate-900", // Twilight
    "from-[#070913] via-[#0e1424] to-[#161c30]", // Starry Night
  ];

  return (
    <GameShell
      gameId="mindcare"
      gameTitle="MindCare Choice"
      subtitle="Cozy Room Interactive Narrative & Balance Simulation"
      score={score}
      bestScore={bestScore}
      isPaused={gameState === "paused"}
      onTogglePause={() => setGameState((s) => (s === "playing" ? "paused" : s === "paused" ? "playing" : s))}
    >
      {/* Living Room Interactive Canvas / Stage */}
      <div className="relative w-full h-full flex flex-col justify-between p-3 sm:p-5 select-none overflow-y-auto sm:overflow-hidden bg-[#161720]">
        {/* Active HUD */}
        {gameState === "playing" && (
          <>
            <GameHUD
              score={Math.floor(energy * 10 + clarity * 12 + flow * 15)}
              objective={`Nurture your workspace (${actionsTaken}/6 turns)`}
              secondaryMetric={{
                label: "Turn",
                value: `${actionsTaken}/6`,
                icon: <Heart className="w-3.5 h-3.5 text-rose-400" />,
              }}
              feedbackPopups={feedbackPopups}
              onOpenTutorial={() => setShowTutorial(true)}
            />

            {/* Contextual In-Game Hint */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] sm:text-[11px] shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                <span>💡</span>
                {actionsTaken === 0 ? (
                  <span>Click any room object (Window, Tea, Plant, Laptop) to make your first choice!</span>
                ) : energy < 25 ? (
                  <span className="text-amber-400 font-bold">Energy is low! Sip tea ☕ or breathe at the window 🪟 to recharge</span>
                ) : plantWaterCount === 2 ? (
                  <span className="text-emerald-400 font-bold">The monstera is ready to bloom! Tend it once more 🌸</span>
                ) : (
                  <span>Balance Energy, Clarity, and Flow to reach a peaceful story ending ({6 - actionsTaken} turns left)</span>
                )}
              </div>
            </div>
          </>
        )}

        {/* Dynamic Metric Bars (Top) */}
        {gameState === "playing" && (
          <div className="w-full max-w-xl mx-auto grid grid-cols-3 gap-1.5 sm:gap-2 pt-16 sm:pt-14 z-10 font-mono text-[10px] sm:text-[11px]">
            {/* Energy */}
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-1.5 sm:p-2 flex flex-col gap-1 text-white">
              <div className="flex justify-between items-center text-amber-300">
                <span>Energy</span>
                <span className="font-bold">{energy}%</span>
              </div>
              <div className="w-full h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${energy}%` }}
                />
              </div>
            </div>

            {/* Clarity */}
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-1.5 sm:p-2 flex flex-col gap-1 text-white">
              <div className="flex justify-between items-center text-sky-300">
                <span>Clarity</span>
                <span className="font-bold">{clarity}%</span>
              </div>
              <div className="w-full h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-400 rounded-full transition-all duration-300"
                  style={{ width: `${clarity}%` }}
                />
              </div>
            </div>

            {/* Flow */}
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-1.5 sm:p-2 flex flex-col gap-1 text-white">
              <div className="flex justify-between items-center text-indigo-300">
                <span>Flow</span>
                <span className="font-bold">{flow}%</span>
              </div>
              <div className="w-full h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-400 rounded-full transition-all duration-300"
                  style={{ width: `${flow}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Center Room Visual Scene */}
        <div className="relative flex-1 w-full max-w-2xl mx-auto flex items-center justify-center my-1 sm:my-2 min-h-[140px]">
          {/* Arched Window Showing Dynamic Sky */}
          <div
            onClick={handleInteractWindow}
            className={`relative w-40 sm:w-56 h-36 sm:h-48 rounded-t-full border-4 border-[#333748] bg-gradient-to-b ${skyGradients[timeStage]} overflow-hidden shadow-2xl cursor-pointer hover:border-accent transition-colors group`}
            title="Click to gaze out window and breathe"
          >
            {/* Drifting Clouds or Twinkling Stars */}
            {timeStage < 2 ? (
              <div className="absolute top-4 sm:top-6 left-3 sm:left-4 flex gap-3 sm:gap-4 text-white/70 animate-pulse">
                <Cloud className="w-6 h-6 sm:w-8 sm:h-8" />
                <Cloud className="w-5 h-5 sm:w-6 sm:h-6 ml-4" />
              </div>
            ) : (
              <div className="absolute inset-0 p-3 flex flex-wrap gap-4 text-amber-200/80 animate-pulse">
                <Sparkles className="w-3 h-3 top-2 left-6 absolute" />
                <Sparkles className="w-4 h-4 top-8 right-8 absolute" />
                <Sparkles className="w-3 h-3 top-14 left-10 absolute" />
                <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200 absolute top-3 right-4" />
              </div>
            )}
            {/* Window Pane Grid */}
            <div className="absolute inset-x-0 top-1/2 h-1 bg-[#333748]" />
            <div className="absolute inset-y-0 left-1/2 w-1 bg-[#333748]" />

            {/* Window label pill */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-[9px] sm:text-[10px] font-mono text-white/90 group-hover:bg-accent/80 transition-colors flex items-center gap-1 shadow-sm whitespace-nowrap">
              <span>🪟</span>
              <span>Gaze &amp; Breathe</span>
            </div>
          </div>

          {/* Plant next to window */}
          <div
            onClick={handleInteractPlant}
            className="absolute -right-1 sm:right-10 bottom-3 sm:bottom-6 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform group"
            title="Click to water the plant"
          >
            <div className="text-2xl sm:text-4xl animate-bounce">
              {isPlantBlooming ? "🌸" : "🪴"}
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono text-emerald-300 group-hover:underline mt-0.5 bg-black/60 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-500/30 shadow-sm flex items-center gap-1">
              <span>💧</span>
              <span>{isPlantBlooming ? "Blooming!" : "Monstera"}</span>
            </span>
          </div>

          {/* Steaming Mug on Desk */}
          <div
            onClick={handleInteractTea}
            className="absolute -left-1 sm:left-10 bottom-4 sm:bottom-8 flex flex-col items-center cursor-pointer hover:scale-110 transition-transform group"
            title="Click to sip hot tea"
          >
            <div className="text-2xl sm:text-3xl">☕</div>
            <span className="text-[9px] sm:text-[10px] font-mono text-amber-300 group-hover:underline mt-0.5 bg-black/60 px-1.5 sm:px-2 py-0.5 rounded-full border border-amber-500/30 shadow-sm flex items-center gap-1">
              <span>☕</span>
              <span>Warm Tea</span>
            </span>
          </div>
        </div>

        {/* Narrative Dialogue Box (Bottom) */}
        {gameState === "playing" && (
          <div className="w-full max-w-xl mx-auto bg-black/80 backdrop-blur-md border border-white/15 rounded-2xl p-2.5 sm:p-4 text-white space-y-2 sm:space-y-3 z-10 shadow-xl">
            <p className="text-[11px] sm:text-xs md:text-sm font-sans leading-relaxed text-white/90 italic line-clamp-2 sm:line-clamp-none">
              "{activeStoryText}"
            </p>

            {/* Quick Interactive Object Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 pt-0.5 font-mono text-[11px] sm:text-xs">
              <button
                type="button"
                onClick={handleInteractWindow}
                className="py-1.5 px-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-sky-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Breathe</span>
              </button>
              <button
                type="button"
                onClick={handleInteractLaptop}
                className="py-1.5 px-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-indigo-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Code Sprint</span>
              </button>
              <button
                type="button"
                onClick={handleInteractBookshelf}
                className="py-1.5 px-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-purple-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Read Book</span>
              </button>
              <button
                type="button"
                onClick={handleInteractPhone}
                className="py-1.5 px-2 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-emerald-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Silence Phone</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Start Screen */}
      {gameState === "start" && (
        <GameStartScreen
          title="MINDCARE CHOICE"
          tagline="Cozy Room Interactive Narrative & Balance Quest"
          description="A reflective, ambient workspace journey. Step into Kristian's room, manage your Mental Energy, Emotional Clarity, and Creative Flow, and discover 4 peaceful narrative endings."
          badge="Interactive Narrative"
          bestScore={bestScore}
          controls={{
            mouse: "Click window, plant, tea, laptop, and books",
            touch: "Tap interactive items directly on screen",
            keyboard: "ESC to pause anytime",
          }}
          objectives={[
            "Balance your Energy, Clarity, and Flow gauges across 6 turns.",
            "Water the room plant 3 times to discover the secret blooming flower 🌸.",
            "Choose intentional pauses over relentless burnout.",
            "Reach one of 4 distinct reflective story endings.",
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
        config={MINDCARE_TUTORIAL}
        onComplete={() => {
          setShowTutorial(false);
          if (typeof window !== "undefined") {
            localStorage.setItem("kn_tut_mindcare", "true");
          }
          if (gameState === "start") startGame();
        }}
        onClose={() => setShowTutorial(false)}
      />

      {/* Victory / Ending Modal */}
      <GameResultModal
        isOpen={gameState === "victory"}
        isVictory={true}
        title={chosenEnding?.title || "JOURNEY CONCLUDED"}
        score={score}
        bestScore={bestScore}
        isNewRecord={isNewRecord}
        starsEarned={starsEarned}
        breakdown={[
          { label: "Ending Badge", value: chosenEnding?.badge || "Mindful Reflection" },
          { label: "Mental Energy", value: `${energy}%` },
          { label: "Emotional Clarity", value: `${clarity}%` },
          { label: "Creative Flow", value: `${flow}%` },
        ]}
        unlockedAchievements={unlockedAchievements}
        onReplay={startGame}
      />
    </GameShell>
  );
}
