"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import GameShell from "@/components/games/GameShell";
import GameHUD from "@/components/games/GameHUD";
import GameStartScreen from "@/components/games/GameStartScreen";
import GamePauseModal from "@/components/games/GamePauseModal";
import GameResultModal from "@/components/games/GameResultModal";
import { sounds } from "@/components/Play/SoundEffects";
import { gameStorage } from "@/lib/gameStorage";

interface Packet {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: "target" | "noise" | "glitch" | "golden" | "powerup";
  powerType?: "slow" | "magnet" | "double" | "shield";
  color: string;
  angle: number;
  spin: number;
  hp?: number;
}

interface Boss {
  active: boolean;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  radius: number;
  angle: number;
  attackTimer: number;
}

export default function CatchDataGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game States
  const [gameState, setGameState] = useState<"start" | "playing" | "paused" | "gameover" | "victory">("start");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);
  const [combo, setCombo] = useState(1);
  const [wave, setWave] = useState(1);
  const [shields, setShields] = useState(3);
  const [feedbackPopups, setFeedbackPopups] = useState<Array<{ id: string; text: string; color?: string; y?: number }>>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Array<{ id: string; title: string; icon: string }>>([]);
  const [isMuted, setIsMuted] = useState(true);

  // Scanner Reticle Position
  const reticleRef = useRef({ x: 400, y: 250, radius: 24, targetRadius: 24 });
  const packetsRef = useRef<Packet[]>([]);
  const bossRef = useRef<Boss>({
    active: false,
    x: 400,
    y: 120,
    hp: 100,
    maxHp: 100,
    radius: 45,
    angle: 0,
    attackTimer: 0,
  });

  // Power-up active timers
  const powerUpsRef = useRef({
    slowMo: 0,
    magnet: 0,
    doubleScore: 0,
  });

  const animationFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const waveTimerRef = useRef<number>(0);
  const spawnTimerRef = useRef<number>(0);

  // Load High Score on Mount
  useEffect(() => {
    setBestScore(gameStorage.getBestScore("catch-the-data"));
    setIsMuted(sounds.isMuted);
  }, []);

  // Popup feedback helper
  const addPopup = (text: string, color = "#10B981") => {
    const id = Math.random().toString();
    setFeedbackPopups((prev) => [...prev, { id, text, color }]);
    setTimeout(() => {
      setFeedbackPopups((prev) => prev.filter((p) => p.id !== id));
    }, 1100);
  };

  // Keyboard / Pointer listeners for Reticle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      reticleRef.current.x = (clientX - rect.left) * scaleX;
      reticleRef.current.y = (clientY - rect.top) * scaleY;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
    };
  }, []);

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

  // Spawn Data Packets
  const spawnPacket = (forcedType?: Packet["type"]) => {
    const w = 800;
    const h = 500;
    let type = forcedType;

    if (!type) {
      const rand = Math.random();
      if (rand < 0.04) type = "golden";
      else if (rand < 0.12) type = "powerup";
      else if (rand < 0.35 && wave >= 2) type = "noise";
      else if (rand < 0.50 && wave >= 3) type = "glitch";
      else type = "target";
    }

    const side = Math.floor(Math.random() * 4);
    let x = 0;
    let y = 0;
    if (side === 0) {
      x = Math.random() * w;
      y = -20;
    } else if (side === 1) {
      x = w + 20;
      y = Math.random() * h;
    } else if (side === 2) {
      x = Math.random() * w;
      y = h + 20;
    } else {
      x = -20;
      y = Math.random() * h;
    }

    // Velocity towards center with slight drift
    const targetX = w / 2 + (Math.random() - 0.5) * 200;
    const targetY = h / 2 + (Math.random() - 0.5) * 160;
    const angle = Math.atan2(targetY - y, targetX - x);
    const speed = 1.2 + Math.random() * 1.5 + wave * 0.3;

    const powerTypes: Array<Packet["powerType"]> = ["slow", "magnet", "double", "shield"];
    const powerType = type === "powerup" ? powerTypes[Math.floor(Math.random() * powerTypes.length)] : undefined;

    let color = "#10B981"; // Target cyan-emerald
    if (type === "noise") color = "#EF4444"; // Red spiked
    if (type === "glitch") color = "#A855F7"; // Purple
    if (type === "golden") color = "#F59E0B"; // Gold
    if (type === "powerup") color = "#06B6D4"; // Cyan power

    packetsRef.current.push({
      id: Math.random(),
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: type === "golden" ? 18 : type === "noise" ? 16 : 14,
      type,
      powerType,
      color,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.08,
    });
  };

  // Main Loop
  const updateGame = useCallback(
    (timestamp: number) => {
      if (gameState !== "playing") return;

      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const reticle = reticleRef.current;
      const packets = packetsRef.current;
      const boss = bossRef.current;
      const powerUps = powerUpsRef.current;

      // Update Power-up timers
      if (powerUps.slowMo > 0) powerUps.slowMo -= dt;
      if (powerUps.magnet > 0) powerUps.magnet -= dt;
      if (powerUps.doubleScore > 0) powerUps.doubleScore -= dt;

      // Wave Progression & Timers
      waveTimerRef.current += dt;
      if (wave < 5 && waveTimerRef.current > 18) {
        waveTimerRef.current = 0;
        setWave((w) => {
          const nextWave = w + 1;
          sounds.playPowerUp();
          addPopup(`WAVE ${nextWave} INCOMING!`, "#38BDF8");
          if (nextWave === 5) {
            boss.active = true;
            boss.hp = 100;
            boss.x = 400;
            boss.y = 130;
          }
          return nextWave;
        });
      }

      // Spawning
      spawnTimerRef.current += dt;
      const spawnInterval = Math.max(0.35, 1.1 - wave * 0.14);
      if (spawnTimerRef.current > spawnInterval) {
        spawnTimerRef.current = 0;
        spawnPacket();
      }

      // Boss Logic (Wave 5)
      if (boss.active) {
        boss.angle += 0.03;
        boss.attackTimer += dt;
        // Boss swaying
        boss.x = 400 + Math.sin(Date.now() / 800) * 160;

        // Boss fires projectiles
        if (boss.attackTimer > 2.2) {
          boss.attackTimer = 0;
          for (let i = -1; i <= 1; i++) {
            packets.push({
              id: Math.random(),
              x: boss.x,
              y: boss.y + 30,
              vx: i * 1.5,
              vy: 2.8,
              radius: 14,
              type: "noise",
              color: "#EF4444",
              angle: 0,
              spin: 0.1,
            });
          }
        }
      }

      // Speed multiplier (slow-mo)
      const speedMultiplier = powerUps.slowMo > 0 ? 0.45 : 1;

      // Update packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.angle += p.spin;

        // Magnetism: target packets pulled towards scanner
        if (powerUps.magnet > 0 && (p.type === "target" || p.type === "golden")) {
          const angleToReticle = Math.atan2(reticle.y - p.y, reticle.x - p.x);
          p.vx += Math.cos(angleToReticle) * 0.4;
          p.vy += Math.sin(angleToReticle) * 0.4;
        }

        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        // Collision check with Reticle
        const dist = Math.hypot(reticle.x - p.x, reticle.y - p.y);
        if (dist < reticle.radius + p.radius) {
          // CAPTURE EVENT!
          packets.splice(i, 1);

          if (p.type === "target") {
            const nextCombo = Math.min(5, combo + 1);
            setCombo(nextCombo);
            sounds.playCombo(nextCombo);

            const mult = (powerUps.doubleScore > 0 ? 2 : 1) * nextCombo;
            const pts = 100 * mult;
            setScore((s) => s + pts);
            addPopup(`+${pts} ${nextCombo > 1 ? `x${nextCombo}` : ""}`, "#10B981");

            // Damage boss if active
            if (boss.active) {
              boss.hp -= 6;
              if (boss.hp <= 0) {
                handleVictory();
                return;
              }
            }

            if (nextCombo >= 5) {
              gameStorage.unlockAchievement("cd_combo_king");
            }
          } else if (p.type === "golden") {
            sounds.playPowerUp();
            const pts = 500 * (powerUps.doubleScore > 0 ? 2 : 1);
            setScore((s) => s + pts);
            addPopup(`+${pts} GOLDEN SMILE! ✨`, "#F59E0B");
            gameStorage.unlockAchievement("cd_golden_smile");
          } else if (p.type === "noise") {
            sounds.playGlitch();
            setCombo(1);
            setShields((sh) => {
              const next = sh - 1;
              if (next <= 0) {
                handleGameOver();
              }
              return next;
            });
            addPopup("-1 SHIELD! NOISE HIT", "#EF4444");
          } else if (p.type === "glitch") {
            sounds.playGlitch();
            setCombo(1);
            addPopup("COMBO RESET!", "#A855F7");
          } else if (p.type === "powerup") {
            sounds.playPowerUp();
            if (p.powerType === "slow") {
              powerUps.slowMo = 5;
              addPopup("⏱️ SLOW MOTION ACTIVE!", "#06B6D4");
            } else if (p.powerType === "magnet") {
              powerUps.magnet = 6;
              addPopup("🧲 DATA MAGNET ACTIVE!", "#38BDF8");
            } else if (p.powerType === "double") {
              powerUps.doubleScore = 6;
              addPopup("⚡ DOUBLE POINTS ACTIVE!", "#F59E0B");
            } else if (p.powerType === "shield") {
              setShields((sh) => Math.min(3, sh + 1));
              addPopup("🛡️ SHIELD RESTORED!", "#10B981");
            }
          }
          continue;
        }

        // Remove out-of-bounds packets
        if (p.x < -40 || p.x > 840 || p.y < -40 || p.y > 540) {
          packets.splice(i, 1);
        }
      }

      // Render Scene
      renderCanvas();

      animationFrameId.current = requestAnimationFrame(updateGame);
    },
    [gameState, combo, wave, score]
  );

  // Victory Handler
  const handleVictory = () => {
    setGameState("victory");
    const bonus = 1500 + shields * 300;
    const finalScore = score + bonus;
    setScore(finalScore);

    const isNew = gameStorage.saveBestScore("catch-the-data", finalScore);
    setIsNewRecord(isNew);

    gameStorage.addStars(3);
    setStarsEarned(3);

    const newlyUnlocked: Array<{ id: string; title: string; icon: string }> = [];
    if (gameStorage.unlockAchievement("cd_anomaly_crusher")) {
      newlyUnlocked.push({ id: "cd_anomaly_crusher", title: "Anomaly Defeated", icon: "👑" });
    }
    setUnlockedAchievements(newlyUnlocked);
  };

  // Game Over Handler
  const handleGameOver = () => {
    setGameState("gameover");
    const isNew = gameStorage.saveBestScore("catch-the-data", score);
    setIsNewRecord(isNew);
  };

  // Start / Reset
  const startGame = () => {
    sounds.playClick();
    setScore(0);
    setCombo(1);
    setWave(1);
    setShields(3);
    setIsNewRecord(false);
    setStarsEarned(0);
    setUnlockedAchievements([]);
    packetsRef.current = [];
    powerUpsRef.current = { slowMo: 0, magnet: 0, doubleScore: 0 };
    bossRef.current = {
      active: false,
      x: 400,
      y: 120,
      hp: 100,
      maxHp: 100,
      radius: 45,
      angle: 0,
      attackTimer: 0,
    };
    waveTimerRef.current = 0;
    spawnTimerRef.current = 0;
    setGameState("playing");
  };

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

  // Render Canvas
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Background Matrix Grid
    ctx.fillStyle = "#0c0e14";
    ctx.fillRect(0, 0, w, h);

    // Neon Scanlines
    ctx.strokeStyle = "rgba(45, 90, 67, 0.15)";
    ctx.lineWidth = 1;
    for (let y = 0; y < h; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    // Swirling Data Vortex in Center
    const time = Date.now() / 1000;
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(time * 0.2);
    ctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
    ctx.lineWidth = 2;
    for (let r = 50; r <= 220; r += 40) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 1.5);
      ctx.stroke();
    }
    ctx.restore();

    // Render Boss if Active
    const boss = bossRef.current;
    if (boss.active) {
      ctx.save();
      ctx.translate(boss.x, boss.y);
      ctx.rotate(boss.angle);

      // Boss pulsating aura
      ctx.fillStyle = "rgba(239, 68, 68, 0.2)";
      ctx.beginPath();
      ctx.arc(0, 0, boss.radius + 12 + Math.sin(time * 6) * 6, 0, Math.PI * 2);
      ctx.fill();

      // Boss polygon body
      ctx.fillStyle = "#991b1b";
      ctx.strokeStyle = "#f87171";
      ctx.lineWidth = 3;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const rad = (i * Math.PI) / 3;
        const px = Math.cos(rad) * boss.radius;
        const py = Math.sin(rad) * boss.radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Boss Core Eye
      ctx.fillStyle = "#fef08a";
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Boss HP Bar
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(boss.x - 70, boss.y - 65, 140, 10);
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(boss.x - 68, boss.y - 63, (136 * boss.hp) / boss.maxHp, 6);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.strokeRect(boss.x - 70, boss.y - 65, 140, 10);

      ctx.font = "bold 9px monospace";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.fillText("ANOMALY CORE", boss.x, boss.y - 70);
    }

    // Render Packets
    packetsRef.current.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      if (p.type === "target") {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === "golden") {
        // Golden Smiling Data (Easter Egg)
        ctx.fillStyle = "#F59E0B";
        ctx.shadowColor = "#F59E0B";
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Smile face
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(-5, -3, 2, 0, Math.PI * 2);
        ctx.arc(5, -3, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 2, 6, 0, Math.PI);
        ctx.stroke();
      } else if (p.type === "noise") {
        // Spiked noise polygon
        ctx.fillStyle = p.color;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const r = i % 2 === 0 ? p.radius : p.radius * 0.5;
          const a = (i * Math.PI) / 4;
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      } else if (p.type === "glitch") {
        // Glitch rectangle
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
        ctx.strokeStyle = "#ffffff";
        ctx.strokeRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
      } else if (p.type === "powerup") {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          p.powerType === "slow"
            ? "⏱️"
            : p.powerType === "magnet"
            ? "🧲"
            : p.powerType === "double"
            ? "⚡"
            : "🛡️",
          0,
          0
        );
      }

      ctx.restore();
    });

    // Render Reticle / Scanner
    const reticle = reticleRef.current;
    ctx.save();
    ctx.translate(reticle.x, reticle.y);

    // Scanner Outer Pulse
    ctx.strokeStyle = "rgba(16, 185, 129, 0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, reticle.radius, 0, Math.PI * 2);
    ctx.stroke();

    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(-reticle.radius - 6, 0);
    ctx.lineTo(reticle.radius + 6, 0);
    ctx.moveTo(0, -reticle.radius - 6);
    ctx.lineTo(0, reticle.radius + 6);
    ctx.stroke();

    // Rotating bracket corners
    ctx.rotate(time * 2);
    ctx.strokeStyle = "#34d399";
    ctx.lineWidth = 3;
    for (let i = 0; i < 4; i++) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.arc(0, 0, reticle.radius + 4, -0.3, 0.3);
      ctx.stroke();
    }

    ctx.restore();
  };

  return (
    <GameShell
      gameId="catch-the-data"
      gameTitle="Catch the Data"
      subtitle="ML Stream Classifier & Anomaly Interceptor"
      score={score}
      bestScore={bestScore}
      isPaused={gameState === "paused"}
      onTogglePause={() => setGameState((s) => (s === "playing" ? "paused" : s === "paused" ? "playing" : s))}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        className="w-full h-full object-cover cursor-crosshair select-none"
      />

      {/* Active In-Game HUD */}
      {gameState === "playing" && (
        <GameHUD
          score={score}
          combo={combo}
          level={wave}
          maxLevel={5}
          health={(shields / 3) * 100}
          objective={wave === 5 ? "DEFEAT THE BOSS DATA ANOMALY!" : `Capture green target packets & reach Wave 5`}
          feedbackPopups={feedbackPopups}
        />
      )}

      {/* Start Screen */}
      {gameState === "start" && (
        <GameStartScreen
          title="CATCH THE DATA"
          tagline="Data Stream Classification & Anomaly Interceptor"
          description="Control the high-precision laser scanner. Separate high-value target packets from adversarial noise and survive 5 progressive waves to neutralize the Boss Data Anomaly."
          badge="Machine Learning Arcade"
          bestScore={bestScore}
          controls={{
            mouse: "Move cursor to aim scanner reticle",
            touch: "Drag finger across arena to track packets",
            keyboard: "ESC to pause game anytime",
          }}
          objectives={[
            "Capture Emerald Target Packets to build Combo Multipliers (x1 to x5).",
            "DODGE Red Spiked Noise and Purple Glitch packets to preserve shields.",
            "Grab Power-Ups (Slow-Mo, Magnet, Double Points, Shield Boost).",
            "Defeat the Boss Anomaly in Wave 5 to win the challenge!",
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
      />

      {/* Victory / Game Over Modal */}
      <GameResultModal
        isOpen={gameState === "victory" || gameState === "gameover"}
        isVictory={gameState === "victory"}
        title={gameState === "victory" ? "ANOMALY CORE NEUTRALIZED!" : "DATA INTEGRITY COMPROMISED"}
        score={score}
        bestScore={bestScore}
        isNewRecord={isNewRecord}
        starsEarned={starsEarned}
        breakdown={[
          { label: "Final Wave", value: `Wave ${wave} / 5` },
          { label: "Shields Preserved", value: `${shields} / 3` },
          { label: "Peak Combo", value: `x${combo}` },
        ]}
        unlockedAchievements={unlockedAchievements}
        onReplay={startGame}
      />
    </GameShell>
  );
}
