import { DailyChallenge, UserProgress, LeaderboardEntry, CollegeLeaderboardEntry, CommunitySolution, Badge } from '../types';

export const INITIAL_USER_PROGRESS: UserProgress = {
  name: 'Rohan Sharma',
  username: 'rohan_codes',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  college: 'IIT Delhi',
  collegeTier: 'Tier 1',
  gradYear: '2026',
  level: 12,
  currentXp: 840,
  nextLevelXp: 1200,
  totalXp: 4200,
  streakCount: 14,
  maxStreak: 14,
  streakFreezeCount: 2,
  completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  rank: 842,
  badges: ['streak-14', 'night-owl', 'dp-master', 'tier-champion'],
  submissions: [
    {
      id: 'sub-14',
      day: 14,
      title: 'Optimal Binary Search Tree',
      language: 'python',
      code: `def minSearchCost(keys, freq, n):\n    cost = [[0 for _ in range(n + 1)] for _ in range(n + 1)]\n    for i in range(n):\n        cost[i][i] = freq[i]\n    for L in range(2, n + 1):\n        for i in range(n - L + 1):\n            j = i + L - 1\n            cost[i][j] = float('inf')\n            fsum = sum(freq[i:j+1])\n            for r in range(i, j + 1):\n                c = (cost[i][r-1] if r > i else 0) + (cost[r+1][j] if r < j else 0) + fsum\n                if c < cost[i][j]:\n                    cost[i][j] = c\n    return cost[0][n-1]`,
      status: 'Accepted',
      runtimeMs: 18,
      memoryMb: 14.2,
      submittedAt: 'Today, 9:24 PM IST',
      xpEarned: 150
    }
  ]
};

export const MOCK_CHALLENGES: DailyChallenge[] = [
  {
    day: 1,
    title: 'Two Sum & Hash Maps',
    category: 'Arrays & Hashing',
    difficulty: 'Easy',
    xp: 50,
    unlocked: true,
    unlockTimeIST: 'Completed',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume each input has exactly one solution.',
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Exactly one valid answer exists'],
    inputExample: 'nums = [2, 7, 11, 15], target = 9',
    outputExample: '[0, 1]',
    tags: ['Hash Table', 'Array'],
    companies: ['Google', 'Amazon', 'Airtel'],
    submissionsCount: 14200,
    successRate: 88.4,
    initialCode: {
      python: `def twoSum(nums, target):\n    # Write your solution here\n    seen = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in seen:\n            return [seen[diff], i]\n        seen[num] = i\n    return []`,
      javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
      cpp: `#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> mp;\n    for(int i = 0; i < nums.size(); i++) {\n        int diff = target - nums[i];\n        if(mp.count(diff)) return {mp[diff], i};\n        mp[nums[i]] = i;\n    }\n    return {};\n}`,
      java: `import java.util.HashMap;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        HashMap<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) return new int[]{map.get(diff), i};\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`
    },
    testCases: [
      { id: '1', input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0, 1]', explanation: '2 + 7 = 9, so index 0 and 1.' },
      { id: '2', input: 'nums = [3,2,4], target = 6', expectedOutput: '[1, 2]', explanation: '2 + 4 = 6, so index 1 and 2.' }
    ],
    hints: [
      'Think about using a Hash Map to reduce lookups to O(1).',
      'As you iterate, check if target - current_number exists in map.'
    ]
  },
  {
    day: 14,
    title: 'Optimal Binary Search Tree',
    category: 'Dynamic Programming',
    difficulty: 'Hard',
    xp: 150,
    unlocked: true,
    unlockTimeIST: 'Unlocked at 9:00 PM IST',
    description: 'Given a sorted array `keys[0...n-1]` of search keys and an array `freq[0...n-1]` of search frequencies, calculate the minimum search cost for a Binary Search Tree built from these keys.',
    constraints: ['1 <= n <= 100', '1 <= freq[i] <= 1000', 'Keys are sorted in strictly ascending order'],
    inputExample: 'keys = [10, 12, 20], freq = [34, 8, 50]',
    outputExample: '142',
    tags: ['Dynamic Programming', 'Trees'],
    companies: ['Microsoft', 'Flipkart', 'Atlassian'],
    submissionsCount: 8420,
    successRate: 64.2,
    initialCode: {
      python: `def optimalBST(keys, freq):\n    n = len(keys)\n    # DP matrix of size (n+1) x (n+1)\n    dp = [[0] * (n + 1) for _ in range(n + 1)]\n    \n    for i in range(n):\n        dp[i][i] = freq[i]\n        \n    for L in range(2, n + 1):\n        for i in range(n - L + 1):\n            j = i + L - 1\n            dp[i][j] = float('inf')\n            fsum = sum(freq[i:j+1])\n            for r in range(i, j + 1):\n                c = (dp[i][r-1] if r > i else 0) + (dp[r+1][j] if r < j else 0) + fsum\n                if c < dp[i][j]:\n                    dp[i][j] = c\n    return dp[0][n-1]`,
      javascript: `function optimalBST(keys, freq) {\n    const n = keys.length;\n    const dp = Array.from({length: n}, () => Array(n).fill(0));\n    for(let i=0; i<n; i++) dp[i][i] = freq[i];\n    for(let L=2; L<=n; L++) {\n        for(let i=0; i<=n-L; i++) {\n            let j = i + L - 1;\n            dp[i][j] = Infinity;\n            let fsum = freq.slice(i, j+1).reduce((a,b)=>a+b, 0);\n            for(let r=i; r<=j; r++) {\n                let c = (r>i ? dp[i][r-1] : 0) + (r<j ? dp[r+1][j] : 0) + fsum;\n                if(c < dp[i][j]) dp[i][j] = c;\n            }\n        }\n    }\n    return dp[0][n-1];\n}`,
      cpp: `#include <vector>\n#include <numeric>\n#include <algorithm>\nusing namespace std;\n\nint optimalBST(vector<int>& keys, vector<int>& freq) {\n    int n = keys.size();\n    vector<vector<int>> dp(n, vector<int>(n, 0));\n    for(int i=0; i<n; i++) dp[i][i] = freq[i];\n    for(int L=2; L<=n; L++) {\n        for(int i=0; i<=n-L; i++) {\n            int j = i + L - 1;\n            dp[i][j] = 1e9;\n            int fsum = accumulate(freq.begin()+i, freq.begin()+j+1, 0);\n            for(int r=i; r<=j; r++) {\n                int c = (r>i ? dp[i][r-1] : 0) + (r<j ? dp[r+1][j] : 0) + fsum;\n                dp[i][j] = min(dp[i][j], c);\n            }\n        }\n    }\n    return dp[0][n-1];\n}`,
      java: `class Solution {\n    public int optimalBST(int[] keys, int[] freq) {\n        int n = keys.length;\n        int[][] dp = new int[n][n];\n        for (int i = 0; i < n; i++) dp[i][i] = freq[i];\n        for (int L = 2; L <= n; L++) {\n            for (int i = 0; i <= n - L; i++) {\n                int j = i + L - 1;\n                dp[i][j] = Integer.MAX_VALUE;\n                int fsum = 0;\n                for (int k = i; k <= j; k++) fsum += freq[k];\n                for (int r = i; r <= j; r++) {\n                    int c = (r > i ? dp[i][r - 1] : 0) + (r < j ? dp[r + 1][j] : 0) + fsum;\n                    dp[i][j] = Math.min(dp[i][j], c);\n                }\n            }\n        }\n        return dp[0][n - 1];\n    }\n}`
    },
    testCases: [
      { id: '1', input: 'keys = [10, 12, 20], freq = [34, 8, 50]', expectedOutput: '142', explanation: 'Root 20 gives min cost 142.' },
      { id: '2', input: 'keys = [10, 12], freq = [34, 50]', expectedOutput: '118', explanation: 'Root 12 with child 10.' }
    ],
    hints: [
      'Consider all keys r as root one by one from i to j.',
      'Sum of frequencies from i to j will be added because all nodes below increase in depth by 1.'
    ]
  },
  {
    day: 15,
    title: 'LRU Cache Architecture',
    category: 'Design & Linked List',
    difficulty: 'Medium',
    xp: 100,
    unlocked: false,
    unlockTimeIST: 'Unlocks Tonight at 9:00 PM IST',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement LRUCache with `get(key)` and `put(key, value)` in O(1) average time complexity.',
    constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5', 'At most 2*10^5 calls to get and put'],
    inputExample: '["LRUCache", "put", "put", "get", "put", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2]]',
    outputExample: '[null, null, null, 1, null, -1]',
    tags: ['Linked List', 'Hash Table', 'Design'],
    companies: ['Uber', 'Swiggy', 'Zomato', 'Meta'],
    submissionsCount: 0,
    successRate: 0,
    initialCode: {
      python: `class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n    def get(self, key: int) -> int:\n        pass\n    def put(self, key: int, value: int) -> None:\n        pass`,
      javascript: `class LRUCache {\n  constructor(capacity) {}\n  get(key) {}\n  put(key, value) {}\n}`,
      cpp: `class LRUCache {\npublic:\n    LRUCache(int capacity) {}\n    int get(int key) {}\n    void put(int key, int value) {}\n};`,
      java: `class LRUCache {\n    public LRUCache(int capacity) {}\n    public int get(int key) {}\n    public void put(int key, int value) {}\n}`
    },
    testCases: [
      { id: '1', input: 'capacity = 2, operations = put(1,1), put(2,2), get(1)', expectedOutput: '1' }
    ],
    hints: ['Combine a Doubly Linked List with a Hash Map.']
  },
  {
    day: 21,
    title: 'Course Schedule & Topo Sort',
    category: 'Graphs',
    difficulty: 'Medium',
    xp: 100,
    unlocked: false,
    unlockTimeIST: 'Unlocks Day 21 at 9:00 PM IST',
    description: 'There are numCourses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites. Return true if you can finish all courses.',
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000'],
    inputExample: 'numCourses = 2, prerequisites = [[1,0]]',
    outputExample: 'true',
    tags: ['Graph', 'Topological Sort', 'DFS'],
    companies: ['CRED', 'Acko', 'PhonePe'],
    submissionsCount: 0,
    successRate: 0,
    initialCode: {
      python: `def canFinish(numCourses, prerequisites):\n    # Kahns algorithm or DFS Cycle detection\n    pass`,
      javascript: `function canFinish(numCourses, prerequisites) {}`,
      cpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {}`,
      java: `class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {}\n}`
    },
    testCases: [],
    hints: ['Detect cycle in directed graph.']
  },
  {
    day: 30,
    title: 'Median of Two Sorted Arrays',
    category: 'Binary Search',
    difficulty: 'Hard',
    xp: 150,
    unlocked: false,
    unlockTimeIST: 'Unlocks Day 30 at 9:00 PM IST',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays in O(log(m+n)) time complexity.',
    constraints: ['nums1.length == m', 'nums2.length == n', '0 <= m, n <= 1000'],
    inputExample: 'nums1 = [1,3], nums2 = [2]',
    outputExample: '2.00000',
    tags: ['Binary Search', 'Divide and Conquer'],
    companies: ['Directi', 'Tower Research', 'Razorpay'],
    submissionsCount: 0,
    successRate: 0,
    initialCode: {
      python: `def findMedianSortedArrays(nums1, nums2):\n    pass`,
      javascript: `function findMedianSortedArrays(nums1, nums2) {}`,
      cpp: `double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {}`,
      java: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {}\n}`
    },
    testCases: [],
    hints: ['Perform binary search on the smaller array partition index.']
  },
  {
    day: 60,
    title: 'Distributed Rate Limiter (Token Bucket)',
    category: 'System Design & Algorithms',
    difficulty: 'Hard',
    xp: 300,
    unlocked: false,
    unlockTimeIST: 'Final Graduation Sprint (Day 60)',
    description: 'Implement a thread-safe Token Bucket Rate Limiter with burst capacity and refill rate in a distributed concurrency setup.',
    constraints: ['Capacity <= 1,000,000', 'Refill rate in tokens/sec', 'Sub-millisecond latency requirement'],
    inputExample: 'capacity = 10, refillRate = 2 tokens/sec',
    outputExample: 'Allowed / Throttled stream',
    tags: ['System Design', 'Concurrency', 'Algorithms'],
    companies: ['Stripe', 'Google', 'Uber', 'Atlassian'],
    submissionsCount: 0,
    successRate: 0,
    initialCode: {
      python: `class TokenBucket:\n    def __init__(self, capacity: int, refill_rate: float):\n        pass\n    def allow_request(self, tokens: int = 1) -> bool:\n        pass`,
      javascript: `class TokenBucket {\n  constructor(capacity, refillRate) {}\n  allowRequest(tokens = 1) {}\n}`,
      cpp: `class TokenBucket {\npublic:\n    TokenBucket(int capacity, double refillRate) {}\n    bool allowRequest(int tokens = 1) {}\n};`,
      java: `class TokenBucket {\n    public TokenBucket(int capacity, double refillRate) {}\n    public boolean allowRequest(int tokens) {}\n}`
    },
    testCases: [],
    hints: ['Calculate elapsed time since last refill rather than continuously running a timer thread.']
  }
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, id: 'l1', name: 'Aarav Sharma', username: 'aarav_iitd', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80', college: 'IIT Delhi', collegeTier: 'Tier 1', xp: 8950, streak: 60, badgesCount: 14, solvedCount: 60 },
  { rank: 2, id: 'l2', name: 'Priya Nambiar', username: 'priya_bits', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80', college: 'BITS Pilani', collegeTier: 'Tier 1', xp: 8820, streak: 60, badgesCount: 13, solvedCount: 60 },
  { rank: 3, id: 'l3', name: 'Kabir Verma', username: 'kabir_nitk', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80', college: 'NIT Surathkal', collegeTier: 'Tier 1', xp: 8400, streak: 58, badgesCount: 12, solvedCount: 58 },
  { rank: 4, id: 'l4', name: 'Ananya Gupta', username: 'ananya_dtu', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80', college: 'DTU Delhi', collegeTier: 'Tier 1', xp: 7920, streak: 52, badgesCount: 11, solvedCount: 54 },
  { rank: 5, id: 'l5', name: 'Vikramaditya Roy', username: 'vicky_vit', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80', college: 'VIT Vellore', collegeTier: 'Tier 2', xp: 7650, streak: 48, badgesCount: 10, solvedCount: 51 },
  { rank: 6, id: 'l6', name: 'Siddharth Rao', username: 'sid_rvce', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80', college: 'RVCE Bangalore', collegeTier: 'Tier 2', xp: 7200, streak: 44, badgesCount: 9, solvedCount: 48 },
  { rank: 7, id: 'l7', name: 'Meera Deshmukh', username: 'meera_coep', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80', college: 'COEP Pune', collegeTier: 'Tier 2', xp: 6950, streak: 41, badgesCount: 9, solvedCount: 46 },
  { rank: 8, id: 'l8', name: 'Tanmay Kulkarni', username: 'tanmay_iiit', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80', college: 'IIIT Hyderabad', collegeTier: 'Tier 1', xp: 6800, streak: 39, badgesCount: 8, solvedCount: 45 },
  { rank: 9, id: 'l9', name: 'Kavya Pillai', username: 'kavya_srm', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80', college: 'SRM KTR', collegeTier: 'Tier 2', xp: 6420, streak: 36, badgesCount: 8, solvedCount: 42 },
  { rank: 10, id: 'l10', name: 'Devendra Patel', username: 'dev_chitkara', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80', college: 'Chitkara University', collegeTier: 'Tier 3', xp: 6100, streak: 34, badgesCount: 7, solvedCount: 39 },
  { rank: 842, id: 'user-curr', name: 'Rohan Sharma', username: 'rohan_codes', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', college: 'IIT Delhi', collegeTier: 'Tier 1', xp: 4200, streak: 14, badgesCount: 4, solvedCount: 14, isCurrentUser: true }
];

export const MOCK_COLLEGE_LEADERBOARD: CollegeLeaderboardEntry[] = [
  { rank: 1, id: 'c1', name: 'IIT Delhi', tier: 'Tier 1', studentCount: 1420, totalXp: 482000, avgStreak: 18.4, topCoder: 'Aarav Sharma' },
  { rank: 2, id: 'c2', name: 'BITS Pilani', tier: 'Tier 1', studentCount: 1280, totalXp: 415000, avgStreak: 17.1, topCoder: 'Priya Nambiar' },
  { rank: 3, id: 'c3', name: 'IIIT Hyderabad', tier: 'Tier 1', studentCount: 890, totalXp: 392000, avgStreak: 21.2, topCoder: 'Tanmay Kulkarni' },
  { rank: 4, id: 'c4', name: 'VIT Vellore', tier: 'Tier 2', studentCount: 2450, totalXp: 368000, avgStreak: 12.8, topCoder: 'Vikramaditya Roy' },
  { rank: 5, id: 'c5', name: 'DTU Delhi', tier: 'Tier 1', studentCount: 1100, totalXp: 342000, avgStreak: 15.6, topCoder: 'Ananya Gupta' },
  { rank: 6, id: 'c6', name: 'NIT Surathkal', tier: 'Tier 1', studentCount: 950, totalXp: 310000, avgStreak: 16.2, topCoder: 'Kabir Verma' },
  { rank: 7, id: 'c7', name: 'SRM KTR', tier: 'Tier 2', studentCount: 2100, totalXp: 289000, avgStreak: 10.4, topCoder: 'Kavya Pillai' },
  { rank: 8, id: 'c8', name: 'RVCE Bangalore', tier: 'Tier 2', studentCount: 820, totalXp: 275000, avgStreak: 14.8, topCoder: 'Siddharth Rao' },
  { rank: 9, id: 'c9', name: 'COEP Pune', tier: 'Tier 2', studentCount: 640, totalXp: 231000, avgStreak: 13.9, topCoder: 'Meera Deshmukh' },
  { rank: 10, id: 'c10', name: 'Chitkara University', tier: 'Tier 3', studentCount: 1850, totalXp: 198000, avgStreak: 9.2, topCoder: 'Devendra Patel' }
];

export const MOCK_COMMUNITY_SOLUTIONS: CommunitySolution[] = [
  {
    id: 'cs-1',
    day: 14,
    title: 'Clean O(N^3) DP with Interval Partition Explanation',
    author: 'Priya Nambiar',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    college: 'BITS Pilani',
    language: 'python',
    code: `def minSearchCost(keys, freq):\n    # Interval DP pattern similar to Matrix Chain Multiplication\n    # Cost = left_subtree_cost + right_subtree_cost + sum_of_freqs\n    pass`,
    explanation: 'The key insight for Optimal BST is recognizing that choosing root k in interval [i...j] adds sum(freq[i..j]) because every child node moves 1 level deeper in the tree structure.',
    upvotes: 142,
    commentsCount: 28,
    createdAt: '1 hour ago'
  },
  {
    id: 'cs-2',
    day: 14,
    title: 'C++ DP table initialization & speed optimizations for interview',
    author: 'Aarav Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
    college: 'IIT Delhi',
    language: 'cpp',
    code: `// Fast IO for competitive coding\n#pragma GCC optimize("O3")`,
    explanation: 'We pre-calculate prefix sums of freq array so we get sum(freq[i..j]) in O(1) instead of re-summing inside the inner loop.',
    upvotes: 98,
    commentsCount: 14,
    createdAt: '2 hours ago'
  }
];

export const ALL_BADGES: Badge[] = [
  {
    id: 'streak-14',
    name: 'Streak Sentinel',
    description: 'Maintained a uninterrupted 14-day coding streak!',
    icon: '🔥',
    category: 'Streak',
    unlockedAt: 'Day 14',
    isUnlocked: true,
    reqText: '14 Days Streak'
  },
  {
    id: 'night-owl',
    name: '9 PM Circadian Solved',
    description: 'Submitted solution within 30 minutes of 9 PM IST unlock',
    icon: '🦉',
    category: 'Circadian',
    unlockedAt: 'Day 12',
    isUnlocked: true,
    reqText: 'Solve within 30m of unlock'
  },
  {
    id: 'dp-master',
    name: 'DP Specialist',
    description: 'Mastered 5 Hard Dynamic Programming challenges',
    icon: '🧠',
    category: 'Skill',
    unlockedAt: 'Day 14',
    isUnlocked: true,
    reqText: '5 Hard DP Problems'
  },
  {
    id: 'tier-champion',
    name: 'College MVP',
    description: 'Top 5 coder in your college leaderboard',
    icon: '👑',
    category: 'Special',
    unlockedAt: 'Day 10',
    isUnlocked: true,
    reqText: 'Top 5 in College'
  },
  {
    id: 'freeze-shield',
    name: 'Freeze Guard',
    description: 'Equipped a Streak Freeze shield during semester exams',
    icon: '🛡️',
    category: 'Streak',
    unlockedAt: undefined,
    isUnlocked: false,
    reqText: 'Equip 1 Streak Freeze'
  },
  {
    id: 'sprint-master',
    name: '60-Day Graduate',
    description: 'Successfully completed the full 60-Day ABTalks Challenge!',
    icon: '🎓',
    category: 'Special',
    unlockedAt: undefined,
    isUnlocked: false,
    reqText: 'Complete All 60 Days'
  }
];
