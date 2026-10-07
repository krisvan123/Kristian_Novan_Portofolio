"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, Clock, Hash, Code, PenTool, Cpu, Eye, MessageSquare, Terminal, Database, Layout } from "lucide-react";
import { sounds } from "./SoundEffects";

interface CardItem {
  id: number;
  pairKey: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  isFlipped: boolean;
  isMatched: boolean;
}

const CARD_TEMPLATES = [
  { key: "python", name: "Python", category: "Language", icon: Terminal },
  { key: "figma", name: "Figma", category: "Design", icon: PenTool },
  { key: "ml", name: "Machine Learning", category: "AI", icon: Cpu },
  { key: "cv", name: "Computer Vision", category: "AI", icon: Eye },
  { key: "nlp", name: "NLP", category: "AI", icon: MessageSquare },
  { key: "js", name: "JavaScript", category: "Web", icon: Code },
  { key: "sql", name: "SQL", category: "Database", icon: Database },
  { key: "uiux", name: "UI/UX Design", category: "Interface", icon: Layout },
];

export default function MemoryJourneyGame() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleToggleMute = () => {
    const next = sounds.toggleMute();
    setIsMuted(next);
  };

  // Initialize and shuffle 16 cards (8 pairs)
  const initGame = () => {
    const deck: CardItem[] = [];
    CARD_TEMPLATES.forEach((tmpl, idx) => {
      // Create pair: 2 cards per template
      deck.push({
        id: idx * 2,
        pairKey: tmpl.key,
        name: tmpl.name,
        category: tmpl.category,
        icon: tmpl.icon,
        isFlipped: false,
        isMatched: false,
      });
      deck.push({
        id: idx * 2 + 1,
        pairKey: tmpl.key,
        name: tmpl.name,
        category: tmpl.category,
        icon: tmpl.icon,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle deck
    const shuffled = deck.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setIsCompleted(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  // Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && !isCompleted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isCompleted]);

  // Handle card click
  const handleCardClick = (index: number) => {
    const card = cards[index];
    if (card.isFlipped || card.isMatched || flippedIndices.length >= 2) return;

    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    sounds.playClick();

    // Flip chosen card
    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;
    setCards(updatedCards);

    const nextFlipped = [...flippedIndices, index];
    setFlippedIndices(nextFlipped);

    // If 2 cards are now open, compare them
    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [idx1, idx2] = nextFlipped;
      const card1 = updatedCards[idx1];
      const card2 = updatedCards[idx2];

      if (card1.pairKey === card2.pairKey) {
        // Matched!
        sounds.playSuccess();
        setTimeout(() => {
          setCards((prev) => {
            const next = [...prev];
            next[idx1].isMatched = true;
            next[idx2].isMatched = true;
            return next;
          });
          setFlippedIndices([]);
          const nextMatches = matches + 1;
          setMatches(nextMatches);

          if (nextMatches === 8) {
            sounds.playVictory();
            setIsCompleted(true);
            setIsTimerRunning(false);
          }
        }, 400);
      } else {
        // Mismatch - flip back
        sounds.playMiss();
        setTimeout(() => {
          setCards((prev) => {
            const next = [...prev];
            next[idx1].isFlipped = false;
            next[idx2].isFlipped = false;
            return next;
          });
          setFlippedIndices([]);
        }, 850);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-canvas-card-dark border border-surface-border shadow-2xs">
        <Link
          href="/play"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal-soft hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Play</span>
        </Link>

        {/* Live Score Metrics */}
        <div className="flex items-center gap-4 text-xs font-mono text-charcoal-soft">
          <div className="flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-accent" />
            <span>Moves: <strong className="text-charcoal font-semibold">{moves}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Matches: <strong className="text-charcoal font-semibold">{matches}</strong>/8</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-charcoal-soft" />
            <span>{formatTime(timerSeconds)}</span>
          </div>
          <button
            type="button"
            onClick={handleToggleMute}
            className="p-1.5 rounded-lg border border-surface-border text-charcoal-soft hover:text-accent hover:bg-canvas-subtle transition-colors cursor-pointer"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-accent" />}
          </button>
        </div>
      </div>

      {/* Main 4x4 Grid of 3D Flip Cards */}
      <div className="relative p-4 sm:p-6 rounded-3xl bg-[#FAF9F5] dark:bg-[#141416] border border-surface-border shadow-inner">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-2xl mx-auto">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            const isRevealed = card.isFlipped || card.isMatched;

            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(idx)}
                style={{ perspective: "1000px" }}
                className="aspect-square cursor-pointer select-none"
              >
                <div
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                  className={`relative w-full h-full rounded-2xl transition-transform duration-500 shadow-2xs hover:scale-103 ${
                    card.isMatched ? "ring-2 ring-emerald-500/70" : ""
                  }`}
                >
                  {/* CARD BACK (Hand-drawn star & constellation pattern) */}
                  <div
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                    className="absolute inset-0 rounded-2xl bg-[#2D5A43] dark:bg-[#1C3628] border-2 border-[#1E3E2E] dark:border-[#2F5943] p-3 flex flex-col items-center justify-center text-emerald-200/90 shadow-md"
                  >
                    <div className="text-xl sm:text-2xl animate-pulse">✦</div>
                    <span className="text-[9px] font-mono tracking-widest uppercase opacity-75 mt-1">
                      KN
                    </span>
                  </div>

                  {/* CARD FRONT (Revealed Icon & Skill name) */}
                  <div
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                    className="absolute inset-0 rounded-2xl bg-white dark:bg-canvas-card-dark border-2 border-accent-border/70 p-2 sm:p-3 flex flex-col items-center justify-between text-center shadow-md"
                  >
                    <span className="text-[9px] font-mono uppercase text-accent font-medium">
                      {card.category}
                    </span>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-canvas-subtle flex items-center justify-center text-charcoal">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-display font-semibold text-charcoal leading-tight truncate max-w-full">
                      {card.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Modal */}
        {isCompleted && (
          <div className="absolute inset-0 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 z-20 animate-fade-in-up">
            <div className="bg-white dark:bg-canvas-card-dark rounded-3xl border border-surface-border p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-xl font-display font-semibold text-charcoal">
                  Nice memory.
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-muted font-sans mt-1">
                  You matched all 8 pairs in <strong className="text-charcoal">{moves}</strong> moves and <strong className="text-charcoal">{formatTime(timerSeconds)}</strong>.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={initGame}
                  className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold font-display shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Play Again</span>
                </button>
                <Link
                  href="/play"
                  className="px-4 py-2.5 rounded-xl border border-surface-border bg-canvas-subtle hover:bg-white text-charcoal text-xs font-mono transition-colors"
                >
                  Back to Play
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Explanatory footer note */}
      <div className="flex items-center justify-between text-xs font-mono text-charcoal-soft px-2">
        <span>Tap cards to uncover matching pairs</span>
        <button
          type="button"
          onClick={initGame}
          className="hover:text-accent flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Board</span>
        </button>
      </div>
    </div>
  );
}
