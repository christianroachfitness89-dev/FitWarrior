import { useState } from 'react'
import { Habit, HabitCategory } from '../types'
import { applyStreak } from '../utils/gameEngine'

interface Props {
  habits: Habit[]
  streak: number
  onComplete: (id: string) => void
  onUncomplete: (id: string) => void
}

const categoryMeta: Record<HabitCategory, {
  label: string; icon: string
  activeColor: string; activeBorder: string; activeBg: string
  cardBorder: string
}> = {
  exercise:  { label: 'Exercise',  icon: '💪', activeColor: '#fb923c', activeBorder: 'rgba(249,115,22,0.4)',  activeBg: 'rgba(249,115,22,0.1)',  cardBorder: 'rgba(249,115,22,0.18)' },
  nutrition: { label: 'Nutrition', icon: '🥗', activeColor: '#4ade80', activeBorder: 'rgba(34,197,94,0.4)',   activeBg: 'rgba(34,197,94,0.1)',   cardBorder: 'rgba(34,197,94,0.18)' },
  sleep:     { label: 'Sleep',     icon: '😴', activeColor: '#818cf8', activeBorder: 'rgba(99,102,241,0.4)',  activeBg: 'rgba(99,102,241,0.1)',  cardBorder: 'rgba(99,102,241,0.18)' },
  mental:    { label: 'Mental',    icon: '🧠', activeColor: '#c084fc', activeBorder: 'rgba(168,85,247,0.4)', activeBg: 'rgba(168,85,247,0.1)', cardBorder: 'rgba(168,85,247,0.18)' },
  hydration: { label: 'Hydration', icon: '💧', activeColor: '#22d3ee', activeBorder: 'rgba(6,182,212,0.4)',   activeBg: 'rgba(6,182,212,0.1)',   cardBorder: 'rgba(6,182,212,0.18)' },
}

const difficultyStyle: Record<string, { bg: string; color: string; border: string }> = {
  easy:   { bg: 'rgba(34,197,94,0.1)',   color: '#4ade80', border: 'rgba(34,197,94,0.25)' },
  medium: { bg: 'rgba(245,158,11,0.1)',  color: '#fbbf24', border: 'rgba(245,158,11,0.25)' },
  hard:   { bg: 'rgba(239,68,68,0.1)',   color: '#f87171', border: 'rgba(239,68,68,0.25)' },
}

const ALL = 'all'
type Filter = HabitCategory | 'all'

const filters: { id: Filter; label: string; icon: string }[] = [
  { id: 'all',       label: 'All',      icon: '🎮' },
  { id: 'exercise',  label: 'Exercise', icon: '💪' },
  { id: 'nutrition', label: 'Nutrition',icon: '🥗' },
  { id: 'sleep',     label: 'Sleep',    icon: '😴' },
  { id: 'mental',    label: 'Mental',   icon: '🧠' },
  { id: 'hydration', label: 'Hydrate',  icon: '💧' },
]

export default function HabitList({ habits, streak, onComplete, onUncomplete }: Props) {
  const [activeFilter, setActiveFilter] = useState<Filter>(ALL)

  const visible = activeFilter === ALL
    ? habits
    : habits.filter(h => h.category === activeFilter)

  const completedCount = habits.filter(h => h.completedToday).length

  return (
    <div>
      {/* Summary bar */}
      <div
        className="rounded-2xl p-4 mb-3 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Today's Progress</p>
          <p className="font-bold text-white mt-0.5">
            {completedCount}/{habits.length} habits
          </p>
        </div>
        {streak > 0 && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)' }}
          >
            <span className="text-lg">🔥</span>
            <div>
              <p className="font-bold text-sm" style={{ color: '#fb923c' }}>{streak} day streak</p>
              <p className="text-xs" style={{ color: 'rgba(253,186,116,0.6)' }}>
                {streak >= 14 ? '3x' : streak >= 7 ? '2x' : streak >= 4 ? '1.5x' : '1x'} XP
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
        {filters.map(f => {
          const isActive = activeFilter === f.id
          return (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 flex-shrink-0"
              style={
                isActive
                  ? {
                      background: 'rgba(139,92,246,0.2)',
                      border: '1px solid rgba(139,92,246,0.4)',
                      color: '#c4b5fd',
                    }
                  : {
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: '#64748b',
                    }
              }
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
            </button>
          )
        })}
      </div>

      {/* Habit cards */}
      <div className="space-y-2.5">
        {visible.map(habit => {
          const meta = categoryMeta[habit.category]
          const xpWithStreak = applyStreak(habit.xpReward, streak)
          const boosted = xpWithStreak > habit.xpReward
          const diff = difficultyStyle[habit.difficulty]

          return (
            <div
              key={habit.id}
              className="rounded-2xl transition-all duration-200"
              style={{
                background: habit.completedToday
                  ? 'rgba(255,255,255,0.025)'
                  : 'rgba(255,255,255,0.04)',
                border: `1px solid ${habit.completedToday ? 'rgba(34,197,94,0.15)' : meta.cardBorder}`,
                opacity: habit.completedToday ? 0.7 : 1,
              }}
            >
              <div className="p-4 flex items-start gap-3.5">
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: habit.completedToday ? 'rgba(34,197,94,0.12)' : meta.activeBg,
                    border: `1px solid ${habit.completedToday ? 'rgba(34,197,94,0.25)' : meta.activeBorder}`,
                  }}
                >
                  {habit.completedToday ? '✅' : habit.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold leading-tight mb-1 ${habit.completedToday ? 'line-through' : ''}`}
                    style={{ color: habit.completedToday ? '#64748b' : '#f1f5f9' }}
                  >
                    {habit.name}
                  </h3>
                  <p className="text-slate-500 text-xs mb-2 leading-relaxed">{habit.description}</p>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Category badge */}
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: meta.activeBg, color: meta.activeColor, border: `1px solid ${meta.activeBorder}` }}
                    >
                      {meta.icon} {meta.label}
                    </span>
                    {/* Difficulty */}
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium capitalize"
                      style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}` }}
                    >
                      {habit.difficulty}
                    </span>
                    {/* XP */}
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-bold"
                      style={
                        boosted
                          ? { background: 'rgba(245,158,11,0.18)', color: '#fde68a', border: '1px solid rgba(245,158,11,0.35)' }
                          : { background: 'rgba(245,158,11,0.08)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.15)' }
                      }
                    >
                      +{xpWithStreak} XP{boosted ? ' 🔥' : ''}
                    </span>
                  </div>
                </div>

                {/* Toggle button */}
                <button
                  onClick={() => habit.completedToday ? onUncomplete(habit.id) : onComplete(habit.id)}
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 font-bold text-sm"
                  style={
                    habit.completedToday
                      ? {
                          background: 'rgba(34,197,94,0.15)',
                          border: '2px solid rgba(34,197,94,0.5)',
                          color: '#34d399',
                        }
                      : {
                          background: 'rgba(255,255,255,0.04)',
                          border: '2px solid rgba(255,255,255,0.12)',
                          color: '#475569',
                        }
                  }
                  title={habit.completedToday ? 'Mark incomplete' : 'Mark complete'}
                >
                  {habit.completedToday ? '✓' : '○'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {visible.length === 0 && (
        <div className="text-center py-12 text-slate-600 text-sm">
          No habits in this category yet.
        </div>
      )}
    </div>
  )
}
