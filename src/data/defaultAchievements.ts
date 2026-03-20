import { Achievement } from '../types'

export const defaultAchievements: Achievement[] = [
  // ── FIRST STEPS ──────────────────────────────────────────────────────────
  {
    id: 'first-blood',
    name: 'First Blood',
    description: 'Completed your very first habit.',
    icon: '🗡️',
    hint: 'Complete any habit',
    unlocked: false,
  },
  {
    id: 'triple-threat',
    name: 'Triple Threat',
    description: 'Completed 3 habits in a single day.',
    icon: '🎯',
    hint: 'Complete 3 habits in one day',
    unlocked: false,
  },
  {
    id: 'perfect-day',
    name: 'Perfect Day',
    description: 'Completed ALL habits in a single day.',
    icon: '⭐',
    hint: 'Complete every habit in one day',
    unlocked: false,
  },

  // ── STREAKS ──────────────────────────────────────────────────────────────
  {
    id: 'streak-3',
    name: 'On Fire',
    description: 'Maintained a 3-day active streak.',
    icon: '🔥',
    hint: 'Reach a 3-day streak',
    unlocked: false,
  },
  {
    id: 'streak-7',
    name: 'Streak Warrior',
    description: 'Maintained a 7-day active streak.',
    icon: '🔥🔥',
    hint: 'Reach a 7-day streak',
    unlocked: false,
  },
  {
    id: 'streak-30',
    name: 'Streak Legend',
    description: '30 days of unstoppable momentum.',
    icon: '🌟',
    hint: 'Reach a 30-day streak',
    unlocked: false,
  },

  // ── LEVELS ───────────────────────────────────────────────────────────────
  {
    id: 'level-5',
    name: 'Rising Hero',
    description: 'Reached Level 5. You are no longer a novice.',
    icon: '🏆',
    hint: 'Reach Level 5',
    unlocked: false,
  },
  {
    id: 'level-10',
    name: 'Elite Warrior',
    description: 'Reached Level 10. True dedication.',
    icon: '👑',
    hint: 'Reach Level 10',
    unlocked: false,
  },
  {
    id: 'level-20',
    name: 'Legendary',
    description: 'Reached Level 20. You are the build.',
    icon: '💎',
    hint: 'Reach Level 20',
    unlocked: false,
  },

  // ── XP MILESTONES ────────────────────────────────────────────────────────
  {
    id: 'xp-100',
    name: 'Century',
    description: 'Earned 100 total XP.',
    icon: '💰',
    hint: 'Earn 100 XP total',
    unlocked: false,
  },
  {
    id: 'xp-1000',
    name: 'XP Grinder',
    description: 'Earned 1,000 total XP.',
    icon: '💰💰',
    hint: 'Earn 1,000 XP total',
    unlocked: false,
  },
  {
    id: 'xp-5000',
    name: 'XP Machine',
    description: 'Earned 5,000 total XP. Absolute unit.',
    icon: '🚀',
    hint: 'Earn 5,000 XP total',
    unlocked: false,
  },

  // ── CATEGORY MASTERY ─────────────────────────────────────────────────────
  {
    id: 'iron-body',
    name: 'Iron Body',
    description: 'Completed exercise habits 20 times.',
    icon: '🏋️',
    hint: 'Complete exercise habits 20 times total',
    unlocked: false,
  },
  {
    id: 'nutrition-ninja',
    name: 'Nutrition Ninja',
    description: 'Completed nutrition habits 15 times.',
    icon: '🥗',
    hint: 'Complete nutrition habits 15 times total',
    unlocked: false,
  },
  {
    id: 'well-rested',
    name: 'Well Rested',
    description: 'Completed sleep habits 10 times.',
    icon: '🌙',
    hint: 'Complete sleep habits 10 times total',
    unlocked: false,
  },
  {
    id: 'mind-palace',
    name: 'Mind Palace',
    description: 'Completed mental habits 15 times.',
    icon: '🧠',
    hint: 'Complete mental habits 15 times total',
    unlocked: false,
  },
  {
    id: 'hydration-hero',
    name: 'Hydration Hero',
    description: 'Completed hydration habits 10 times.',
    icon: '💧',
    hint: 'Complete hydration habits 10 times total',
    unlocked: false,
  },

  // ── SPECIAL ──────────────────────────────────────────────────────────────
  {
    id: 'no-life',
    name: 'Dedicated',
    description: 'Completed habits on 50 different days.',
    icon: '🎮',
    hint: 'Be active for 50 different days',
    unlocked: false,
  },
  {
    id: 'max-stat',
    name: 'Maxed Out',
    description: 'Any single stat reached 30.',
    icon: '⚡',
    hint: 'Max any stat to 30',
    unlocked: false,
  },
]
