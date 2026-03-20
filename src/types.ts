export type HabitCategory = 'exercise' | 'nutrition' | 'sleep' | 'mental' | 'hydration'
export type Difficulty = 'easy' | 'medium' | 'hard'
export type CharacterClass = 'Warrior' | 'Ranger' | 'Mage' | 'Paladin'
export type TabName = 'dashboard' | 'habits' | 'quests' | 'achievements'

export interface Stats {
  str: number  // Strength  – boosted by exercise
  vit: number  // Vitality  – boosted by sleep & nutrition
  agi: number  // Agility   – boosted by cardio & stretching
  int: number  // Intellect – boosted by mental habits
  end: number  // Endurance – boosted by hydration & consistency
}

export interface Habit {
  id: string
  name: string
  description: string
  category: HabitCategory
  xpReward: number
  statBonus: Partial<Stats>
  difficulty: Difficulty
  icon: string
  completedToday: boolean
  completedDates: string[]  // YYYY-MM-DD
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  hint: string
  unlocked: boolean
  unlockedDate?: string
}

export interface Quest {
  id: string
  name: string
  description: string
  xpReward: number
  progress: number
  target: number
  completed: boolean
  type: 'daily' | 'weekly'
  icon: string
  category?: HabitCategory
  resetDate: string  // YYYY-MM-DD – date when quest resets
}

export interface Character {
  name: string
  class: CharacterClass
  totalXP: number
  stats: Stats
  streak: number
  longestStreak: number
  lastActiveDate: string  // YYYY-MM-DD
  xpEarnedToday: number
  habitsCompletedAllTime: number
  categoryCompletions: Record<HabitCategory, number>
}

export interface GameState {
  character: Character
  habits: Habit[]
  achievements: Achievement[]
  quests: Quest[]
  lastDailyReset: string  // YYYY-MM-DD
  setupComplete: boolean
}

export interface XPNotification {
  id: string
  amount: number
  label: string
}
