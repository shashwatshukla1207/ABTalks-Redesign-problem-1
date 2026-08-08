export interface ChallengeDay {
  dayNumber: number;
  title: string;
  category: "DSA" | "System Design" | "Frontend" | "Backend" | "DevOps" | "AI & ML";
  difficulty: "Easy" | "Medium" | "Hard";
  estimatedMinutes: number;
  description: string;
  problemStatement: string;
  starterCode?: string;
  hints: string[];
  resources: { title: string; url: string }[];
  isCompleted: boolean;
  isUnlocked: boolean;
}

export interface UserStats {
  streak: number;
  completedDays: number;
  totalPoints: number;
  rank: number;
  rankTitle: string;
}
