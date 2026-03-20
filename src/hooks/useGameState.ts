import { useCallback, useEffect, useState } from 'react'
import { buildDefaultHabits } from '../data/defaultHabits'
import { defaultAchievements } from '../data/defaultAchievements'
import { buildDefaultQuests } from '../data/defaultQuests'
import {
  Achievement,
  CharacterClass,
  GameState,
  XPNotification,
} from '../types'
import {
  applyStatBonus,
  applyStreak,
  checkAchievements,
  classStartingStats,
  performDailyReset,
  revertStatBonus,
  todayStr,
  updateQuestProgress,
  updateStreak,
} from '../utils/gameEngine'

const STORAGE_KEY = 'fitwarrior_v1'

const defaultState = (): GameState => ({
  setupComplete: false,
  lastDailyReset: '',
  character: {
    name: '',
    class: 'Warrior',
    totalXP: 0,
    stats: { str: 0, vit: 0, agi: 0, int: 0, end: 0 },
    streak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    xpEarnedToday: 0,
    habitsCompletedAllTime: 0,
    categoryCompletions: {
      exercise: 0, nutrition: 0, sleep: 0, mental: 0, hydration: 0,
    },
  },
  habits: buildDefaultHabits(),
  achievements: defaultAchievements,
  quests: buildDefaultQuests(),
})

const load = (): GameState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    return JSON.parse(raw) as GameState
  } catch {
    return defaultState()
  }
}

const save = (state: GameState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const useGameState = () => {
  const [state, setState] = useState<GameState>(() => {
    const loaded = load()
    return performDailyReset(loaded)
  })

  const [notifications, setNotifications] = useState<XPNotification[]>([])
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([])

  // Persist to localStorage whenever state changes
  useEffect(() => {
    save(state)
  }, [state])

  const addNotification = (amount: number, label: string) => {
    const id = Math.random().toString(36).slice(2)
    setNotifications(prev => [...prev, { id, amount, label }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 2500)
  }

  const setupCharacter = useCallback((name: string, charClass: CharacterClass) => {
    setState(prev => ({
      ...prev,
      setupComplete: true,
      character: {
        ...prev.character,
        name,
        class: charClass,
        stats: classStartingStats[charClass],
      },
    }))
  }, [])

  const completeHabit = useCallback((habitId: string) => {
    setState(prev => {
      const habit = prev.habits.find(h => h.id === habitId)
      if (!habit || habit.completedToday) return prev

      const today = todayStr()
      const xpGained = applyStreak(habit.xpReward, prev.character.streak)

      // Update habit
      const habits = prev.habits.map(h =>
        h.id === habitId
          ? {
              ...h,
              completedToday: true,
              completedDates: h.completedDates.includes(today)
                ? h.completedDates
                : [...h.completedDates, today],
            }
          : h
      )

      // Update character
      let character = {
        ...prev.character,
        totalXP: prev.character.totalXP + xpGained,
        xpEarnedToday: prev.character.xpEarnedToday + xpGained,
        habitsCompletedAllTime: prev.character.habitsCompletedAllTime + 1,
        categoryCompletions: {
          ...prev.character.categoryCompletions,
          [habit.category]: prev.character.categoryCompletions[habit.category] + 1,
        },
        stats: applyStatBonus(prev.character.stats, habit.statBonus),
      }

      character = updateStreak(character, true)

      // Update quests
      const questState = { ...prev, habits, character }
      const quests = updateQuestProgress(prev.quests, habit, questState, true)

      // Check for quest completions → bonus XP
      let bonusXP = 0
      quests.forEach((q, i) => {
        if (q.completed && !prev.quests[i].completed) {
          bonusXP += q.xpReward
        }
      })
      if (bonusXP > 0) {
        character = { ...character, totalXP: character.totalXP + bonusXP }
      }

      // Check achievements
      const nextState: GameState = { ...prev, habits, character, quests }
      const { achievements, newlyUnlocked } = checkAchievements(nextState)

      // Notifications (async)
      setTimeout(() => {
        addNotification(xpGained, habit.name)
        if (bonusXP > 0) addNotification(bonusXP, 'Quest Complete!')
        if (newlyUnlocked.length) setNewAchievements(na => [...na, ...newlyUnlocked])
      }, 0)

      return { ...nextState, achievements }
    })
  }, [])

  const uncompleteHabit = useCallback((habitId: string) => {
    setState(prev => {
      const habit = prev.habits.find(h => h.id === habitId)
      if (!habit || !habit.completedToday) return prev

      const today = todayStr()
      const xpToRemove = applyStreak(habit.xpReward, prev.character.streak)

      const habits = prev.habits.map(h =>
        h.id === habitId
          ? {
              ...h,
              completedToday: false,
              completedDates: h.completedDates.filter(d => d !== today),
            }
          : h
      )

      const character = {
        ...prev.character,
        totalXP: Math.max(0, prev.character.totalXP - xpToRemove),
        xpEarnedToday: Math.max(0, prev.character.xpEarnedToday - xpToRemove),
        habitsCompletedAllTime: Math.max(0, prev.character.habitsCompletedAllTime - 1),
        categoryCompletions: {
          ...prev.character.categoryCompletions,
          [habit.category]: Math.max(0, prev.character.categoryCompletions[habit.category] - 1),
        },
        stats: revertStatBonus(prev.character.stats, habit.statBonus),
      }

      const questState = { ...prev, habits, character }
      const quests = updateQuestProgress(prev.quests, habit, questState, false)

      return { ...prev, habits, character, quests }
    })
  }, [])

  const dismissAchievement = useCallback((id: string) => {
    setNewAchievements(prev => prev.filter(a => a.id !== id))
  }, [])

  const resetProgress = useCallback(() => {
    const fresh = defaultState()
    setState({
      ...fresh,
      character: { ...fresh.character },
      setupComplete: false,
    })
  }, [])

  return {
    state,
    notifications,
    newAchievements,
    setupCharacter,
    completeHabit,
    uncompleteHabit,
    dismissAchievement,
    resetProgress,
  }
}
