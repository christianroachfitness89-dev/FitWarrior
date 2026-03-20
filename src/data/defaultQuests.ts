import { Quest } from '../types'

const today = () => new Date().toISOString().split('T')[0]

const nextDay = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().split('T')[0]
}

const nextSunday = () => {
  const d = new Date()
  const day = d.getDay()
  const daysUntilSunday = day === 0 ? 7 : 7 - day
  d.setDate(d.getDate() + daysUntilSunday)
  return d.toISOString().split('T')[0]
}

export const buildDefaultQuests = (): Quest[] => [
  // ── DAILY ─────────────────────────────────────────────────────────────────
  {
    id: 'daily-3-habits',
    name: 'Daily Grind',
    description: 'Complete at least 3 habits today.',
    xpReward: 30,
    progress: 0,
    target: 3,
    completed: false,
    type: 'daily',
    icon: '📋',
    resetDate: nextDay(),
  },
  {
    id: 'daily-exercise',
    name: 'Warrior\'s Warmup',
    description: 'Complete 1 exercise habit today.',
    xpReward: 20,
    progress: 0,
    target: 1,
    completed: false,
    type: 'daily',
    icon: '💪',
    category: 'exercise',
    resetDate: nextDay(),
  },
  {
    id: 'daily-water',
    name: 'Stay Hydrated',
    description: 'Complete 1 hydration habit today.',
    xpReward: 15,
    progress: 0,
    target: 1,
    completed: false,
    type: 'daily',
    icon: '💧',
    category: 'hydration',
    resetDate: nextDay(),
  },

  // ── WEEKLY ────────────────────────────────────────────────────────────────
  {
    id: 'weekly-exercise-5',
    name: 'Warrior\'s Workout',
    description: 'Complete exercise habits 5 times this week.',
    xpReward: 100,
    progress: 0,
    target: 5,
    completed: false,
    type: 'weekly',
    icon: '🏋️',
    category: 'exercise',
    resetDate: nextSunday(),
  },
  {
    id: 'weekly-water-7',
    name: 'Hydration Station',
    description: 'Complete a hydration habit every day this week.',
    xpReward: 80,
    progress: 0,
    target: 7,
    completed: false,
    type: 'weekly',
    icon: '🚰',
    category: 'hydration',
    resetDate: nextSunday(),
  },
  {
    id: 'weekly-sleep-5',
    name: 'Sleep Champion',
    description: 'Complete sleep habits 5 times this week.',
    xpReward: 90,
    progress: 0,
    target: 5,
    completed: false,
    type: 'weekly',
    icon: '😴',
    category: 'sleep',
    resetDate: nextSunday(),
  },
  {
    id: 'weekly-mental-3',
    name: 'Mental Fortress',
    description: 'Complete mental habits 3 times this week.',
    xpReward: 70,
    progress: 0,
    target: 3,
    completed: false,
    type: 'weekly',
    icon: '🧠',
    category: 'mental',
    resetDate: nextSunday(),
  },
  {
    id: 'weekly-all-categories',
    name: 'Full Build',
    description: 'Complete at least 1 habit from every category this week.',
    xpReward: 150,
    progress: 0,
    target: 5,
    completed: false,
    type: 'weekly',
    icon: '⚔️',
    resetDate: nextSunday(),
  },
]

export { today, nextDay, nextSunday }
