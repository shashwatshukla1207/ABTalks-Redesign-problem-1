export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Language = 'python' | 'cpp' | 'javascript' | 'java';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  explanation?: string;
  isSecret?: boolean;
}

export interface DailyChallenge {
  day: number;
  title: string;
  category: string;
  difficulty: Difficulty;
  xp: number;
  unlocked: boolean;
  unlockTimeIST: string; // e.g., "9:00 PM IST"
  description: string;
  constraints: string[];
  inputExample: string;
  outputExample: string;
  initialCode: Record<Language, string>;
  testCases: TestCase[];
  hints: string[];
  tags: string[];
  companies: string[];
  submissionsCount: number;
  successRate: number;
}

export interface Submission {
  id: string;
  day: number;
  title: string;
  language: Language;
  code: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error';
  runtimeMs: number;
  memoryMb: number;
  submittedAt: string;
  xpEarned: number;
}

export interface UserProgress {
  name: string;
  username: string;
  avatar: string;
  college: string;
  collegeTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  gradYear: string;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  totalXp: number;
  streakCount: number;
  maxStreak: number;
  streakFreezeCount: number;
  completedDays: number[];
  rank: number;
  badges: string[];
  submissions: Submission[];
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  username: string;
  avatar: string;
  college: string;
  collegeTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  xp: number;
  streak: number;
  badgesCount: number;
  solvedCount: number;
  isCurrentUser?: boolean;
}

export interface CollegeLeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  studentCount: number;
  totalXp: number;
  avgStreak: number;
  topCoder: string;
}

export interface CommunitySolution {
  id: string;
  day: number;
  title: string;
  author: string;
  authorAvatar: string;
  college: string;
  language: Language;
  code: string;
  explanation: string;
  upvotes: number;
  commentsCount: number;
  createdAt: string;
  isUpvoted?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'Streak' | 'Skill' | 'Circadian' | 'Special';
  unlockedAt?: string;
  isUnlocked: boolean;
  reqText: string;
}
