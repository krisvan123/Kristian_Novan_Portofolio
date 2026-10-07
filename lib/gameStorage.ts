"use client";

export interface Achievement {
  id: string;
  gameId: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface DailyChallenge {
  dateKey: string;
  gameId: string;
  title: string;
  description: string;
  targetScore?: number;
  rewardStars: number;
}

export const ALL_ACHIEVEMENTS: Achievement[] = [
  // Route Runner
  {
    id: "rr_eco_master",
    gameId: "route-runner",
    title: "Eco Master",
    description: "Complete a delivery with over 85% fuel efficiency.",
    icon: "🌱",
  },
  {
    id: "rr_speed_demon",
    gameId: "route-runner",
    title: "Express Courier",
    description: "Deliver all 3 packages in under 45 seconds.",
    icon: "⚡",
  },
  {
    id: "rr_easter_sunflower",
    gameId: "route-runner",
    title: "City Bloom",
    description: "Discover the hidden sunflower on the city rooftop.",
    icon: "🌻",
  },

  // Catch the Data
  {
    id: "cd_combo_king",
    gameId: "catch-the-data",
    title: "Combo Virtuoso",
    description: "Reach a continuous x5 capture combo.",
    icon: "🔥",
  },
  {
    id: "cd_anomaly_crusher",
    gameId: "catch-the-data",
    title: "Anomaly Defeated",
    description: "Defeat the final Boss Data Anomaly in Wave 5.",
    icon: "👑",
  },
  {
    id: "cd_golden_smile",
    gameId: "catch-the-data",
    title: "Friendly Data",
    description: "Catch the rare smiling golden data point.",
    icon: "✨",
  },

  // Portfolio Quest
  {
    id: "pq_full_explorer",
    gameId: "portfolio-quest",
    title: "Portfolio Master",
    description: "Visit all 5 major pavilions across the map.",
    icon: "🗺️",
  },
  {
    id: "pq_secret_garden",
    gameId: "portfolio-quest",
    title: "Secret Garden",
    description: "Find the hidden garden behind the northern grove.",
    icon: "🗝️",
  },
  {
    id: "pq_social_butterfly",
    gameId: "portfolio-quest",
    title: "Friendly Neighbor",
    description: "Speak with every wandering campus NPC.",
    icon: "💬",
  },

  // Memory of My Journey
  {
    id: "mj_flawless",
    gameId: "memory",
    title: "Sharp Mind",
    description: "Clear the memory board without any mismatched pairs in a row.",
    icon: "🧠",
  },
  {
    id: "mj_time_freeze",
    gameId: "memory",
    title: "Chrono Master",
    description: "Trigger a Time Freeze special card.",
    icon: "⏱️",
  },
  {
    id: "mj_speedrun",
    gameId: "memory",
    title: "Speed Reader",
    description: "Complete Level 3 in under 40 seconds.",
    icon: "🚀",
  },

  // MindCare Choice
  {
    id: "mc_mindful_pause",
    gameId: "mindcare",
    title: "Gentle Pause",
    description: "Complete an afternoon journey by resting and resetting.",
    icon: "☕",
  },
  {
    id: "mc_flower_bloom",
    gameId: "mindcare",
    title: "Green Thumb",
    description: "Tend to the room plant until a small blossom opens.",
    icon: "🌸",
  },
  {
    id: "mc_all_paths",
    gameId: "mindcare",
    title: "Story Explorer",
    description: "Reach all 4 reflective story endings.",
    icon: "📖",
  },
];

// Helper to get today's date key (e.g., "2026-10-08")
export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getDailyChallenge(): DailyChallenge {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );

  const challenges: Omit<DailyChallenge, "dateKey">[] = [
    {
      gameId: "route-runner",
      title: "Eco Fuel Crunch",
      description: "Deliver all cargo using less than 28 fuel units.",
      targetScore: 1200,
      rewardStars: 5,
    },
    {
      gameId: "catch-the-data",
      title: "Clean Sweep",
      description: "Reach Wave 4 with a 90% or higher accuracy rating.",
      targetScore: 2500,
      rewardStars: 5,
    },
    {
      gameId: "portfolio-quest",
      title: "Constellation Hunt",
      description: "Find at least 5 hidden stars in the campus world.",
      targetScore: 5,
      rewardStars: 5,
    },
    {
      gameId: "memory",
      title: "Fast Recall",
      description: "Clear the memory board in under 45 seconds.",
      targetScore: 1500,
      rewardStars: 5,
    },
    {
      gameId: "mindcare",
      title: "Evening Starlight",
      description: "Guide your character into the peaceful starry night ending.",
      targetScore: 1,
      rewardStars: 5,
    },
  ];

  const selected = challenges[dayOfYear % challenges.length];
  return {
    ...selected,
    dateKey: getTodayKey(),
  };
}

// Storage operations safe for SSR
export const gameStorage = {
  getBestScore: (gameId: string): number => {
    if (typeof window === "undefined") return 0;
    try {
      const v = localStorage.getItem(`kn_best_${gameId}`);
      return v ? parseInt(v, 10) || 0 : 0;
    } catch {
      return 0;
    }
  },

  saveBestScore: (gameId: string, score: number): boolean => {
    if (typeof window === "undefined") return false;
    try {
      const current = gameStorage.getBestScore(gameId);
      if (score > current) {
        localStorage.setItem(`kn_best_${gameId}`, score.toString());
        return true; // New record!
      }
      return false;
    } catch {
      return false;
    }
  },

  getUnlockedAchievements: (): string[] => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem("kn_achievements");
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  unlockAchievement: (id: string): boolean => {
    if (typeof window === "undefined") return false;
    try {
      const unlocked = gameStorage.getUnlockedAchievements();
      if (!unlocked.includes(id)) {
        unlocked.push(id);
        localStorage.setItem("kn_achievements", JSON.stringify(unlocked));
        // Also reward a star
        gameStorage.addStars(2);
        return true; // newly unlocked
      }
      return false;
    } catch {
      return false;
    }
  },

  getStarsCount: (): number => {
    if (typeof window === "undefined") return 0;
    try {
      const v = localStorage.getItem("kn_total_stars");
      return v ? parseInt(v, 10) || 0 : 0;
    } catch {
      return 0;
    }
  },

  addStars: (count: number = 1): number => {
    if (typeof window === "undefined") return 0;
    try {
      const current = gameStorage.getStarsCount();
      const next = Math.min(50, current + count);
      localStorage.setItem("kn_total_stars", next.toString());
      return next;
    } catch {
      return 0;
    }
  },

  isDailyCompleted: (dateKey?: string): boolean => {
    if (typeof window === "undefined") return false;
    const key = dateKey || getTodayKey();
    try {
      return localStorage.getItem(`kn_daily_${key}`) === "true";
    } catch {
      return false;
    }
  },

  completeDaily: (dateKey?: string): void => {
    if (typeof window === "undefined") return;
    const key = dateKey || getTodayKey();
    try {
      if (!gameStorage.isDailyCompleted(key)) {
        localStorage.setItem(`kn_daily_${key}`, "true");
        gameStorage.addStars(5);
      }
    } catch {}
  },

  // Route Runner Upgrades
  getRouteRunnerUpgrades: (): { engine: number; tires: number; radar: number } => {
    if (typeof window === "undefined") return { engine: 1, tires: 1, radar: 1 };
    try {
      const v = localStorage.getItem("kn_rr_upgrades");
      return v ? JSON.parse(v) : { engine: 1, tires: 1, radar: 1 };
    } catch {
      return { engine: 1, tires: 1, radar: 1 };
    }
  },

  saveRouteRunnerUpgrades: (upgrades: { engine: number; tires: number; radar: number }): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("kn_rr_upgrades", JSON.stringify(upgrades));
    } catch {}
  },
};
