"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw, Volume2, VolumeX, Sparkles, Heart, Coffee, Trees, MessageCircle, Sun, Wind, BookOpen } from "lucide-react";
import { sounds } from "./SoundEffects";

interface StoryNode {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  sceneTitle: string;
  narrative: string;
  reflection: string;
  options: {
    label: string;
    nextNodeId: string;
  }[];
  isEnding?: boolean;
}

const STORY_NODES: Record<string, StoryNode> = {
  root: {
    id: "root",
    icon: Coffee,
    sceneTitle: "A Heavy Afternoon",
    narrative:
      "Today feels a little overwhelming. The screen has been glowing for hours, unfinished tabs are stacking up, and your thoughts feel crowded.",
    reflection: "When the weight builds quietly, even simple decisions feel heavier.",
    options: [
      { label: "Step outside for a moment", nextNodeId: "outside" },
      { label: "Take a short pause right here", nextNodeId: "pause" },
      { label: "Reach out to a close friend", nextNodeId: "talk" },
      { label: "Keep going at a slower pace", nextNodeId: "slow_continue" },
    ],
  },
  outside: {
    id: "outside",
    icon: Trees,
    sceneTitle: "Stepping Into the Air",
    narrative:
      "The cool breeze hits your face as you step beyond the doorway. Overhead, leaves sway softly against the afternoon sky. The city hums in the distance, unhurried.",
    reflection: "Leaving the immediate room creates a tiny boundary between you and the rush.",
    options: [
      { label: "Notice three quiet details around you", nextNodeId: "mindful_sight" },
      { label: "Take five deep, slow breaths", nextNodeId: "deep_breath" },
    ],
  },
  pause: {
    id: "pause",
    icon: Wind,
    sceneTitle: "A Quiet Pause",
    narrative:
      "You push the chair back, set the phone facedown, and rest your hands on your lap. For a whole minute, nothing is required of you.",
    reflection: "Rest doesn't have to be earned; it's just fuel for continuing.",
    options: [
      { label: "Pour a glass of cool water", nextNodeId: "water" },
      { label: "Stretch your shoulders and neck gently", nextNodeId: "stretch" },
    ],
  },
  talk: {
    id: "talk",
    icon: MessageCircle,
    sceneTitle: "Reaching Out",
    narrative:
      "You send a simple message: 'Hey, today feels a bit crowded in my head. Just wanted to check in.' A few moments later, a warm reply buzzes back with a smile.",
    reflection: "Sharing a small piece of how you feel takes away the loneliness of carrying it.",
    options: [
      { label: "Share a small honest update", nextNodeId: "shared_relief" },
      { label: "Suggest catching up later this evening", nextNodeId: "evening_plan" },
    ],
  },
  slow_continue: {
    id: "slow_continue",
    icon: BookOpen,
    sceneTitle: "Easing the Stride",
    narrative:
      "Rather than rushing to finish everything at once, you pick just one single small task and put the rest aside for later.",
    reflection: "Progress doesn't have to be heroic. One clear step is enough.",
    options: [
      { label: "Focus only on the next 15 minutes", nextNodeId: "single_focus" },
      { label: "Write a small note to your future self", nextNodeId: "write_note" },
    ],
  },

  // Second tier branches leading to endings
  mindful_sight: {
    id: "mindful_sight",
    icon: Sun,
    sceneTitle: "Grounding in the Present",
    narrative:
      "A sparrow landing on a branch, the warm slant of sunlight against the brick wall, the sound of bicycle tires gliding over asphalt. The world is steady.",
    reflection: "Your thoughts slow down as you reconnect with the tangible world.",
    options: [{ label: "Embrace this calm moment", nextNodeId: "end_grounded" }],
  },
  deep_breath: {
    id: "deep_breath",
    icon: Wind,
    sceneTitle: "Catching Your Breath",
    narrative:
      "Inhale slowly... hold... exhale. With each breath, the tension in your shoulders softens a fraction.",
    reflection: "Your body remembers how to find equilibrium.",
    options: [{ label: "Return with a clearer perspective", nextNodeId: "end_breathe" }],
  },
  water: {
    id: "water",
    icon: Coffee,
    sceneTitle: "A Simple Reset",
    narrative:
      "The cool glass in your hand feels grounding. You take a slow sip and look out the window. The urgency of ten minutes ago begins to loosen its grip.",
    reflection: "Taking care of simple needs reminds us that we are human first.",
    options: [{ label: "Carry this gentle pace forward", nextNodeId: "end_reset" }],
  },
  stretch: {
    id: "stretch",
    icon: Heart,
    sceneTitle: "Releasing Physical Tension",
    narrative:
      "You roll your shoulders back and tilt your head. The tight muscles slowly yield. You realize how tightly you were clenching throughout the morning.",
    reflection: "Softening the body gives the mind permission to soften too.",
    options: [{ label: "Step forward lightly", nextNodeId: "end_breathe" }],
  },
  shared_relief: {
    id: "shared_relief",
    icon: Heart,
    sceneTitle: "Lightening the Load",
    narrative:
      "Reading their thoughtful note, you feel seen. You don't have to solve everything right now—just knowing someone understands is a relief.",
    reflection: "Connection makes heavy days manageable.",
    options: [{ label: "Finish with a lighter heart", nextNodeId: "end_connection" }],
  },
  evening_plan: {
    id: "evening_plan",
    icon: Sparkles,
    sceneTitle: "Looking Forward",
    narrative:
      "You agree to meet for a casual dinner. Having something warm to look forward to gives the rest of the afternoon a friendlier horizon.",
    reflection: "Anticipating warmth provides gentle strength for the present.",
    options: [{ label: "Move through the rest of the day", nextNodeId: "end_connection" }],
  },
  single_focus: {
    id: "single_focus",
    icon: BookOpen,
    sceneTitle: "One Step at a Time",
    narrative:
      "You finish that one small sentence, that one line of code, or that single tidy desk corner. A quiet satisfaction settles in.",
    reflection: "Small completions restore agency.",
    options: [{ label: "Appreciate what you accomplished", nextNodeId: "end_grounded" }],
  },
  write_note: {
    id: "write_note",
    icon: Heart,
    sceneTitle: "Gentle Encouragement",
    narrative:
      "You scribble: 'Be patient with yourself today. You are doing enough.' The words feel like a friendly hand on your shoulder.",
    reflection: "Compassion toward yourself is the most sustainable tool.",
    options: [{ label: "Accept this reminder", nextNodeId: "end_reset" }],
  },

  // Reflective Endings
  end_grounded: {
    id: "end_grounded",
    icon: Sun,
    sceneTitle: "Grounded & Present",
    narrative:
      "The day hasn't magically transformed, but the fog has parted. You stand on solid ground, ready to take the next step at your own natural pace.",
    reflection:
      "Sometimes the next step doesn't have to be a big one. Even a quiet pause gives you room to begin again.",
    options: [],
    isEnding: true,
  },
  end_breathe: {
    id: "end_breathe",
    icon: Wind,
    sceneTitle: "Room to Breathe",
    narrative:
      "Your shoulders are relaxed and your breathing has settled. You gave yourself permission to slow down, and that made all the difference.",
    reflection:
      "Sometimes the next step doesn't have to be a big one. What matters is treating yourself with patience.",
    options: [],
    isEnding: true,
  },
  end_reset: {
    id: "end_reset",
    icon: Coffee,
    sceneTitle: "Gentle Clarity",
    narrative:
      "With a clear workspace and a refreshed mind, the path ahead looks approachable again. No rush, just steady intention.",
    reflection:
      "Sometimes the next step doesn't have to be a big one. A small, intentional reset changes everything.",
    options: [],
    isEnding: true,
  },
  end_connection: {
    id: "end_connection",
    icon: Heart,
    sceneTitle: "Warmth & Solidarity",
    narrative:
      "Connected with people who care, the challenge doesn't feel like a solitary mountain anymore. You are supported.",
    reflection:
      "Sometimes the next step doesn't have to be a big one. Reaching out is always a brave and worthy choice.",
    options: [],
    isEnding: true,
  },
};

export default function MindCareGame() {
  const [currentNodeId, setCurrentNodeId] = useState<string>("root");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const currentNode = STORY_NODES[currentNodeId] || STORY_NODES.root;
  const Icon = currentNode.icon;

  const handleToggleMute = () => {
    const next = sounds.toggleMute();
    setIsMuted(next);
  };

  const handleChoose = (nextNodeId: string) => {
    sounds.playClick();
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentNodeId(nextNodeId);
      setIsTransitioning(false);
      if (STORY_NODES[nextNodeId]?.isEnding) {
        sounds.playVictory();
      }
    }, 320);
  };

  const restartStory = () => {
    sounds.playClick();
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentNodeId("root");
      setIsTransitioning(false);
    }, 280);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Top Controls */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-canvas-card-dark border border-surface-border shadow-2xs">
        <Link
          href="/play"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-charcoal-soft hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Play</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-accent-light dark:bg-accent-soft text-accent dark:text-accent-dark font-medium border border-accent-border/60">
            Interactive Story
          </span>
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

      {/* Main Storybook Container */}
      <div
        className={`relative p-7 sm:p-10 md:p-12 rounded-3xl bg-gradient-to-b from-[#FAF7EE] via-[#F4EFE0] to-[#EFE8D6] dark:from-[#1C1B19] dark:via-[#181715] dark:to-[#141312] border border-amber-900/10 dark:border-white/10 shadow-md min-h-[440px] flex flex-col justify-between transition-all duration-300 ${
          isTransitioning ? "opacity-30 scale-[0.99]" : "opacity-100 scale-100"
        }`}
      >
        {/* Soft atmospheric glow decoration */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-amber-400/10 dark:bg-emerald-500/5 blur-3xl pointer-events-none" />

        {/* Scene Content */}
        <div className="relative space-y-6 max-w-xl mx-auto text-center">
          {/* Scene Icon */}
          <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-white/10 border border-amber-900/15 dark:border-white/15 mx-auto flex items-center justify-center text-accent dark:text-accent-dark shadow-xs animate-float-subtle">
            <Icon className="w-6 h-6 stroke-[1.8]" />
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-accent dark:text-accent-dark font-medium">
              {currentNode.sceneTitle}
            </span>

            <p
              style={{ fontFamily: "var(--font-quote), Georgia, serif" }}
              className="text-xl sm:text-2xl md:text-3xl text-charcoal leading-relaxed font-normal tracking-tight"
            >
              &ldquo;{currentNode.narrative}&rdquo;
            </p>

            <p className="text-xs sm:text-sm text-charcoal-soft font-sans italic pt-2 max-w-md mx-auto">
              {currentNode.reflection}
            </p>
          </div>
        </div>

        {/* Options / Action Choices */}
        <div className="relative pt-8 max-w-md mx-auto w-full">
          {currentNode.isEnding ? (
            <div className="space-y-3 text-center animate-fade-in-up">
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/10 border border-surface-border text-xs text-charcoal-muted leading-relaxed font-sans shadow-2xs">
                Take a moment to let this feeling settle before diving back into your day.
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={restartStory}
                  className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold font-display shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Begin Journey Again</span>
                </button>
                <Link
                  href="/play"
                  className="px-4 py-2.5 rounded-xl border border-surface-border bg-white dark:bg-canvas-card-dark text-charcoal text-xs font-mono transition-colors"
                >
                  Back to Play
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal-soft/80 block text-center mb-2">
                What do you want to do next?
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {currentNode.options.map((opt) => (
                  <button
                    key={opt.nextNodeId}
                    type="button"
                    onClick={() => handleChoose(opt.nextNodeId)}
                    className="p-3.5 sm:p-4 rounded-xl bg-white/85 dark:bg-canvas-card-dark/85 hover:bg-white dark:hover:bg-canvas-card-dark border border-surface-border hover:border-accent-border/90 text-left text-xs sm:text-sm font-display font-medium text-charcoal hover:text-accent shadow-2xs hover:shadow-xs hover:translate-x-1 active:scale-98 transition-all duration-200 cursor-pointer flex items-center justify-between group"
                  >
                    <span>{opt.label}</span>
                    <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Thoughtful Disclaimer */}
      <div className="p-3.5 rounded-xl bg-canvas-subtle border border-surface-border text-center text-[11px] text-charcoal-soft font-sans leading-normal">
        <strong>Note:</strong> MindCare Choice is a personal narrative reflection experiment. It does not provide medical diagnosis or replace professional healthcare.
      </div>
    </div>
  );
}
