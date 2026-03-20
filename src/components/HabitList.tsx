import { useState } from 'react'
import { Habit, HabitCategory } from '../types'
import { applyStreak } from '../utils/gameEngine'

interface Props {
  habits: Habit[]
  streak: number
  onComplete: (id: string) => void
  onUncomplete: (id: string) => void
}

const categoryMeta: Record<HabitCategory, { label: string; icon: string; color: string; border: string; bg: string }> = {
  exercise:  { label: 'Exercise',   icon: '💪', color: 'text-orange-400',  border: 'border-orange-500/30', bg: 'bg-orange-500/10' },
  nutrition: { label: 'Nutrition',  icon: '🥗', color: 'text-green-400',   border: 'border-green-500/30',  bg: 'bg-green-500/10' },
  sleep:     { label: 'Sleep',      icon: '😴', color: 'text-indigo-400',  border: 'border-indigo-500/30', bg: 'bg-indigo-500/10' },
  mental:    { label: 'Mental',     icon: '🧠', color: 'text-purple-400',  border: 'border-purple-500/30', bg: 'bg-purple-500/10' },
  hydration: { label: 'Hydration',  icon: '💧', color: 'text-cyan-400',    border: 'border-cyan-500/30',   bg: 'bg-cyan-500/10' },
}

const difficultyBadge: Record<string, string> = {
  easy:   'bg-green-500/20 text-green-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  hard:   'bg-red-500/20 text-red-400',
}

const ALL = 'all'
type Filter = HabitCategory | 'all'

const filters: { id: Filter; label: string; icon: string }[] = [
  { id: 'all',      label: 'All',      icon: '🎮' },
  { id: 'exercise', label: 'Exercise', icon: '💪' },
  { id: 'nutrition',label: 'Nutrition',icon: '🥗' },
  { id: 'sleep',    label: 'Sleep',    icon: '😴' },
  { id: 'mental',   label: 'Mental',   icon: '🧠' },
  { id: 'hydration',label: 'Hydrate',  icon: '💧' },
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
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-4 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-xs">Today's Progress</p>
          <p className="font-bold text-white">
            {completedCount}/{habits.length} habits
          </p>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 rounded-xl px-3 py-1.5">
            <span className="text-orange-400 text-lg">🔥</span>
            <div>
              <p className="text-orange-400 font-bold text-sm">{streak} day streak</p>
              <p className="text-orange-300/70 text-xs">{applyStreak(0, streak) === 0 ? '' : `${(streak >= 14 ? 3 : streak >= 7 ? 2 : streak >= 4 ? 1.5 : 1)}x XP`}</p>
            </div>
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeFilter === f.id
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <span>{f.icon}</span>
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Habit cards */}
      <div className="space-y-3">
        {visible.map(habit => {
          const meta = categoryMeta[habit.category]
          const xpWithStreak = applyStreak(habit.xpReward, streak)
          const boosted = xpWithStreak > habit.xpReward

          return (
            <div
              key={habit.id}
              className={`rounded-2xl border transition-all ${
                habit.completedToday
                  ? 'bg-slate-800/50 border-green-500/20 opacity-75'
                  : `bg-slate-800 ${meta.border}`
              }`}
            >
              <div className="p-4 flex items-start gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                  habit.completedToday ? 'bg-green-500/20' : meta.bg
                }`}>
                  {habit.completedToday ? '✅' : habit.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <h3 className={`font-bold leading-tight ${habit.completedToday ? 'text-slate-400 line-through' : 'text-white'}`}>
                      {habit.name}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-xs mb-2 leading-relaxed">{habit.description}</p>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Category */}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${meta.bg} ${meta.color} border ${meta.border}`}>
                      {meta.icon} {meta.label}
                    </span>
                    {/* Difficulty */}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyBadge[habit.difficulty]}`}>
                      {habit.difficulty}
                    </span>
                    {/* XP */}
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      boosted
                        ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/40'
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      +{xpWithStreak} XP{boosted ? ' 🔥' : ''}
                    </span>
                  </div>
                </div>

                {/* Toggle button */}
                <button
                  onClick={() => habit.completedToday ? onUncomplete(habit.id) : onComplete(habit.id)}
                  className={`flex-shrink-0 w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${
                    habit.completedToday
                      ? 'bg-green-500/20 border-green-500 text-green-400 hover:bg-red-500/20 hover:border-red-500 hover:text-red-400'
                      : 'bg-slate-700/50 border-slate-600 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-400 text-slate-500'
                  }`}
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
        <div className="text-center py-12 text-slate-500">
          No habits in this category yet.
        </div>
      )}
    </div>
  )
}
