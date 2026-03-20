import { Achievement, Character, GameState, Habit, Quest, Stats } from '../types'

// ── XP & Level Math ──────────────────────────────────────────────────────────

/** XP needed to go from level N to N+1 */
export const xpForLevel = (level: number): number => 100 + (level - 1) * 50

/** Cumulative XP needed to reach a given level */
export const totalXPForLevel = (level: number): number => {
  let total = 0
  for (let l = 1; l < level; l++) total += xpForLevel(l)
  return total
}

/** Derive level and progress from total XP */
export const getLevelInfo = (totalXP: number) => {
  let level = 1
  let remaining = totalXP
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level)
    level++
  }
  return {
    level,
    xpIntoLevel: remaining,
    xpNeeded: xpForLevel(level),
    progress: remaining / xpForLevel(level),
  }
}

/** Streak multiplier — reward consistency */
export const streakMultiplier = (streak: number): number => {
  if (streak >= 14) return 3.0
  if (streak >= 7) return 2.0
  if (streak >= 4) return 1.5
  return 1.0
}

/** Apply streak multiplier and return final XP gained */
export const applyStreak = (baseXP: number, streak: number): number =>
  Math.round(baseXP * streakMultiplier(streak))

// ── Date Helpers ────────────────────────────────────────────────────────────

export const todayStr = (): string => new Date().toISOString().split('T')[0]

export const yesterdayStr = (): string => {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

export const isToday = (date: string): boolean => date === todayStr()
export const isYesterday = (date: string): boolean => date === yesterdayStr()

// ── Streak Logic ─────────────────────────────────────────────────────────────

export const updateStreak = (char: Character, completedAHabitToday: boolean): Character => {
  if (!completedAHabitToday) return char

  const today = todayStr()
  if (char.lastActiveDate === today) return char  // already recorded today

  let newStreak = 1
  if (char.lastActiveDate === yesterdayStr()) {
    newStreak = char.streak + 1
  }

  return {
    ...char,
    streak: newStreak,
    longestStreak: Math.max(char.longestStreak, newStreak),
    lastActiveDate: today,
  }
}

// ── Stat Bonuses ─────────────────────────────────────────────────────────────

export const applyStatBonus = (stats: Stats, bonus: Partial<Stats>): Stats => ({
  str: stats.str + (bonus.str ?? 0),
  vit: stats.vit + (bonus.vit ?? 0),
  agi: stats.agi + (bonus.agi ?? 0),
  int: stats.int + (bonus.int ?? 0),
  end: stats.end + (bonus.end ?? 0),
})

export const revertStatBonus = (stats: Stats, bonus: Partial<Stats>): Stats => ({
  str: Math.max(0, stats.str - (bonus.str ?? 0)),
  vit: Math.max(0, stats.vit - (bonus.vit ?? 0)),
  agi: Math.max(0, stats.agi - (bonus.agi ?? 0)),
  int: Math.max(0, stats.int - (bonus.int ?? 0)),
  end: Math.max(0, stats.end - (bonus.end ?? 0)),
})

// ── Quest Progress ────────────────────────────────────────────────────────────

export const updateQuestProgress = (
  quests: Quest[],
  habit: Habit,
  state: GameState,
  add: boolean,
): Quest[] => {
  return quests.map(q => {
    if (q.completed) return q

    let delta = 0

    if (q.id === 'daily-3-habits' || q.id === 'daily-exercise' || q.id === 'daily-water') {
      if (q.category && habit.category !== q.category) return q
      if (!q.category) {
        // daily-3-habits: track total completed today
        const count = state.habits.filter(h => h.id !== habit.id && h.completedToday).length
        const newCount = add ? count + 1 : count
        return { ...q, progress: Math.min(newCount, q.target), completed: newCount >= q.target }
      }
      if (q.category && habit.category === q.category) delta = add ? 1 : -1
    } else {
      // weekly quests
      if (q.id === 'weekly-all-categories') {
        if (!add) return q
        const categoriesDone = new Set(
          state.habits.filter(h => h.completedToday || h.id === habit.id).map(h => h.category)
        )
        if (!add) categoriesDone.delete(habit.category)
        const newProgress = categoriesDone.size
        return { ...q, progress: newProgress, completed: newProgress >= q.target }
      }
      if (q.category && habit.category === q.category) delta = add ? 1 : -1
    }

    if (delta === 0) return q
    const newProgress = Math.max(0, Math.min(q.target, q.progress + delta))
    return { ...q, progress: newProgress, completed: newProgress >= q.target }
  })
}

// ── Achievement Checking ──────────────────────────────────────────────────────

export const checkAchievements = (state: GameState): { achievements: Achievement[]; newlyUnlocked: Achievement[] } => {
  const { character, habits, achievements } = state
  const today = todayStr()
  const { level } = getLevelInfo(character.totalXP)
  const habitsToday = habits.filter(h => h.completedToday).length
  const allHabitsToday = habitsToday === habits.length && habits.length > 0

  const conditions: Record<string, boolean> = {
    'first-blood': character.habitsCompletedAllTime >= 1,
    'triple-threat': habitsToday >= 3,
    'perfect-day': allHabitsToday,
    'streak-3': character.streak >= 3,
    'streak-7': character.streak >= 7,
    'streak-30': character.streak >= 30,
    'level-5': level >= 5,
    'level-10': level >= 10,
    'level-20': level >= 20,
    'xp-100': character.totalXP >= 100,
    'xp-1000': character.totalXP >= 1000,
    'xp-5000': character.totalXP >= 5000,
    'iron-body': character.categoryCompletions.exercise >= 20,
    'nutrition-ninja': character.categoryCompletions.nutrition >= 15,
    'well-rested': character.categoryCompletions.sleep >= 10,
    'mind-palace': character.categoryCompletions.mental >= 15,
    'hydration-hero': character.categoryCompletions.hydration >= 10,
    'no-life': new Set(habits.flatMap(h => h.completedDates)).size >= 50,
    'max-stat': Object.values(character.stats).some(v => v >= 30),
  }

  const newlyUnlocked: Achievement[] = []
  const updated = achievements.map(a => {
    if (a.unlocked) return a
    if (conditions[a.id]) {
      const unlocked = { ...a, unlocked: true, unlockedDate: today }
      newlyUnlocked.push(unlocked)
      return unlocked
    }
    return a
  })

  return { achievements: updated, newlyUnlocked }
}

// ── Class Bonuses ─────────────────────────────────────────────────────────────

export const classStartingStats: Record<string, Stats> = {
  Warrior:  { str: 5, vit: 3, agi: 2, int: 1, end: 2 },
  Ranger:   { str: 2, vit: 2, agi: 5, int: 2, end: 3 },
  Mage:     { str: 1, vit: 2, agi: 2, int: 6, end: 2 },
  Paladin:  { str: 3, vit: 4, agi: 2, int: 2, end: 3 },
}

export const classDescriptions: Record<string, string> = {
  Warrior:  'High STR. Focused on exercise and physical gains.',
  Ranger:   'High AGI. Built for cardio and endurance challenges.',
  Mage:     'High INT. Mental health and mindfulness is your power.',
  Paladin:  'Balanced VIT. The all-rounder who masters every habit.',
}

export const classIcons: Record<string, string> = {
  Warrior: '⚔️',
  Ranger:  '🏹',
  Mage:    '🔮',
  Paladin: '🛡️',
}

// ── Daily Reset ───────────────────────────────────────────────────────────────

export const performDailyReset = (state: GameState): GameState => {
  const today = todayStr()
  if (state.lastDailyReset === today) return state

  const resetHabits = state.habits.map(h => ({ ...h, completedToday: false }))

  const resetQuests = state.quests.map(q => {
    if (q.resetDate <= today) {
      const resetDate = q.type === 'daily'
        ? (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0] })()
        : (() => { const d = new Date(); const day = d.getDay(); const n = day === 0 ? 7 : 7 - day; d.setDate(d.getDate() + n); return d.toISOString().split('T')[0] })()
      return { ...q, progress: 0, completed: false, resetDate }
    }
    return q
  })

  return {
    ...state,
    habits: resetHabits,
    quests: resetQuests,
    lastDailyReset: today,
    character: { ...state.character, xpEarnedToday: 0 },
  }
}
