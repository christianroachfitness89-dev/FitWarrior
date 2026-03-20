import { GameState } from '../types'
import { classIcons, getLevelInfo, streakMultiplier } from '../utils/gameEngine'

interface Props {
  state: GameState
  onGoToHabits: () => void
}

const statLabels: Record<string, { label: string; color: string }> = {
  str: { label: 'STR', color: 'bg-red-500' },
  vit: { label: 'VIT', color: 'bg-green-500' },
  agi: { label: 'AGI', color: 'bg-cyan-500' },
  int: { label: 'INT', color: 'bg-purple-500' },
  end: { label: 'END', color: 'bg-yellow-500' },
}

const categoryInfo: Record<string, { icon: string; label: string }> = {
  exercise:   { icon: '💪', label: 'Exercise' },
  nutrition:  { icon: '🥗', label: 'Nutrition' },
  sleep:      { icon: '😴', label: 'Sleep' },
  mental:     { icon: '🧠', label: 'Mental' },
  hydration:  { icon: '💧', label: 'Hydration' },
}

export default function Dashboard({ state, onGoToHabits }: Props) {
  const { character, habits } = state
  const { level, xpIntoLevel, xpNeeded, progress } = getLevelInfo(character.totalXP)
  const completedToday = habits.filter(h => h.completedToday).length
  const totalHabits = habits.length
  const mult = streakMultiplier(character.streak)
  const icon = classIcons[character.class]

  const maxStat = Math.max(...Object.values(character.stats), 10)

  return (
    <div className="space-y-4">
      {/* ── Character Card ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-purple-900/50 to-slate-800 rounded-2xl p-5 border border-purple-700/30">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-4xl flex-shrink-0">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-xl font-bold text-white truncate">{character.name}</h2>
              <span className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-2 py-0.5 rounded-full border border-yellow-500/30 whitespace-nowrap">
                LVL {level}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-3">{character.class}</p>

            {/* XP Bar */}
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>{xpIntoLevel} / {xpNeeded} XP</span>
                <span className="text-yellow-400">+{character.xpEarnedToday} today</span>
              </div>
              <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(progress * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Streak + Multiplier */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="bg-slate-800/60 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {character.streak > 0 ? `🔥 ${character.streak}` : '—'}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Day Streak</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-cyan-400">{mult}x</div>
            <div className="text-xs text-slate-400 mt-0.5">XP Multiplier</div>
          </div>
          <div className="bg-slate-800/60 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-purple-400">{character.totalXP.toLocaleString()}</div>
            <div className="text-xs text-slate-400 mt-0.5">Total XP</div>
          </div>
        </div>
      </div>

      {/* ── Today's Progress ───────────────────────────────────────── */}
      <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">Today's Missions</h3>
          <span className="text-sm text-slate-400">{completedToday}/{totalHabits} done</span>
        </div>

        {/* Progress ring-ish bar */}
        <div className="mb-4">
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-700"
              style={{ width: `${totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0}%` }}
            />
          </div>
        </div>

        {completedToday === totalHabits && totalHabits > 0 ? (
          <div className="text-center py-2 text-green-400 font-bold">
            ⭐ Perfect Day! All missions complete!
          </div>
        ) : completedToday === 0 ? (
          <button
            onClick={onGoToHabits}
            className="w-full text-center py-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Start your first habit today →
          </button>
        ) : (
          <button
            onClick={onGoToHabits}
            className="w-full text-center py-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            {totalHabits - completedToday} missions remaining →
          </button>
        )}
      </div>

      {/* ── Stats ──────────────────────────────────────────────────── */}
      <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
        <h3 className="font-bold text-white mb-4">Character Stats</h3>
        <div className="space-y-3">
          {(Object.entries(character.stats) as [string, number][]).map(([key, val]) => {
            const info = statLabels[key]
            return (
              <div key={key} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 w-7">{info.label}</span>
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${info.color} rounded-full transition-all duration-700`}
                    style={{ width: `${Math.min((val / maxStat) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-white font-bold text-sm w-6 text-right">{val}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Category Completions ───────────────────────────────────── */}
      <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
        <h3 className="font-bold text-white mb-4">All-Time Completions</h3>
        <div className="grid grid-cols-5 gap-2">
          {(Object.entries(character.categoryCompletions) as [string, number][]).map(([cat, count]) => {
            const info = categoryInfo[cat]
            return (
              <div key={cat} className="bg-slate-700/50 rounded-xl p-3 text-center">
                <div className="text-xl mb-1">{info.icon}</div>
                <div className="text-white font-bold">{count}</div>
                <div className="text-slate-500 text-xs">{info.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Best Streak ────────────────────────────────────────────── */}
      <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-sm">Best Streak</p>
            <p className="text-2xl font-bold text-orange-400 mt-0.5">
              🔥 {character.longestStreak} days
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-sm text-right">Habits Completed</p>
            <p className="text-2xl font-bold text-green-400 mt-0.5 text-right">
              ✅ {character.habitsCompletedAllTime.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
