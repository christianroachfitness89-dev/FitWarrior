import { GameState } from '../types'
import { classIcons, getLevelInfo, streakMultiplier } from '../utils/gameEngine'

interface Props {
  state: GameState
  onGoToHabits: () => void
}

const statLabels: Record<string, { label: string; gradient: string; glow: string }> = {
  str: { label: 'STR', gradient: 'from-rose-500 to-red-400',    glow: 'rgba(244,63,94,0.5)' },
  vit: { label: 'VIT', gradient: 'from-emerald-500 to-green-400', glow: 'rgba(16,185,129,0.5)' },
  agi: { label: 'AGI', gradient: 'from-cyan-500 to-sky-400',    glow: 'rgba(6,182,212,0.5)' },
  int: { label: 'INT', gradient: 'from-violet-500 to-purple-400', glow: 'rgba(139,92,246,0.5)' },
  end: { label: 'END', gradient: 'from-amber-500 to-yellow-400',  glow: 'rgba(245,158,11,0.5)' },
}

const categoryInfo: Record<string, { icon: string; label: string }> = {
  exercise:  { icon: '💪', label: 'Exercise' },
  nutrition: { icon: '🥗', label: 'Nutrition' },
  sleep:     { icon: '😴', label: 'Sleep' },
  mental:    { icon: '🧠', label: 'Mental' },
  hydration: { icon: '💧', label: 'Hydration' },
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
    <div className="space-y-3">
      {/* ── Character Card ─────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(88,28,135,0.35) 0%, rgba(30,27,75,0.5) 50%, rgba(9,9,15,0.8) 100%)',
          border: '1px solid rgba(139,92,246,0.2)',
          boxShadow: '0 8px 32px rgba(109,40,217,0.15)',
        }}
      >
        {/* Subtle radial glow inside card */}
        <div
          className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(139,92,246,0.12), transparent 70%)' }}
        />

        <div className="flex items-start gap-4 relative">
          {/* Class icon */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 animate-glow-pulse"
            style={{
              background: 'rgba(109,40,217,0.2)',
              border: '1px solid rgba(139,92,246,0.35)',
            }}
          >
            {icon}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h2 className="text-xl font-bold text-white truncate">{character.name}</h2>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                style={{
                  background: 'rgba(245,158,11,0.15)',
                  border: '1px solid rgba(245,158,11,0.3)',
                  color: '#fbbf24',
                }}
              >
                LVL {level}
              </span>
            </div>
            <p className="text-violet-300/60 text-sm font-medium mb-3">{character.class}</p>

            {/* XP Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">{xpIntoLevel.toLocaleString()} / {xpNeeded.toLocaleString()} XP</span>
                <span className="text-amber-400 font-semibold">+{character.xpEarnedToday} today</span>
              </div>
              <div
                className="h-2.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700 bar-glow-gold"
                  style={{
                    width: `${Math.min(progress * 100, 100)}%`,
                    background: 'linear-gradient(90deg, #d97706, #fbbf24)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Streak + Multiplier + XP */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            {
              value: character.streak > 0 ? `🔥 ${character.streak}` : '—',
              label: 'Day Streak',
              color: '#fb923c',
            },
            {
              value: `${mult}x`,
              label: 'XP Multiplier',
              color: '#22d3ee',
            },
            {
              value: character.totalXP.toLocaleString(),
              label: 'Total XP',
              color: '#a78bfa',
            },
          ].map(({ value, label, color }) => (
            <div
              key={label}
              className="rounded-xl p-3 text-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="text-lg font-bold" style={{ color }}>{value}</div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Today's Progress ───────────────────────────────────────── */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-white text-sm tracking-wide uppercase" style={{ letterSpacing: '0.06em' }}>
            Today's Missions
          </h3>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}
          >
            {completedToday}/{totalHabits}
          </span>
        </div>

        <div className="mb-4">
          <div
            className="h-2.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-700 bar-glow-green"
              style={{
                width: `${totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0}%`,
                background: 'linear-gradient(90deg, #059669, #34d399)',
              }}
            />
          </div>
        </div>

        {completedToday === totalHabits && totalHabits > 0 ? (
          <div className="text-center py-1.5 font-semibold text-sm" style={{ color: '#34d399' }}>
            ⭐ Perfect Day — All missions complete!
          </div>
        ) : completedToday === 0 ? (
          <button
            onClick={onGoToHabits}
            className="w-full text-center py-1.5 text-sm font-semibold transition-colors"
            style={{ color: '#a78bfa' }}
          >
            Start your first habit today →
          </button>
        ) : (
          <button
            onClick={onGoToHabits}
            className="w-full text-center py-1.5 text-sm font-semibold transition-colors"
            style={{ color: '#a78bfa' }}
          >
            {totalHabits - completedToday} missions remaining →
          </button>
        )}
      </div>

      {/* ── Character Stats ─────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <h3 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase" style={{ letterSpacing: '0.06em' }}>
          Character Stats
        </h3>
        <div className="space-y-3">
          {(Object.entries(character.stats) as [string, number][]).map(([key, val]) => {
            const info = statLabels[key]
            const pct = Math.min((val / maxStat) * 100, 100)
            return (
              <div key={key} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 w-7 tracking-wider">{info.label}</span>
                <div
                  className="flex-1 h-2 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                >
                  <div
                    className={`h-full bg-gradient-to-r ${info.gradient} rounded-full transition-all duration-700`}
                    style={{
                      width: `${pct}%`,
                      boxShadow: pct > 30 ? `0 0 6px ${info.glow}` : 'none',
                    }}
                  />
                </div>
                <span className="text-white font-bold text-sm w-6 text-right">{val}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Category Completions ───────────────────────────────────── */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <h3 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase" style={{ letterSpacing: '0.06em' }}>
          All-Time Completions
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {(Object.entries(character.categoryCompletions) as [string, number][]).map(([cat, count]) => {
            const info = categoryInfo[cat]
            return (
              <div
                key={cat}
                className="rounded-xl p-3 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="text-xl mb-1">{info.icon}</div>
                <div className="text-white font-bold text-sm">{count}</div>
                <div className="text-slate-500 text-xs mt-0.5">{info.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Records ─────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Best Streak</p>
            <p className="text-2xl font-bold" style={{ color: '#fb923c' }}>
              🔥 {character.longestStreak} days
            </p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Habits Done</p>
            <p className="text-2xl font-bold" style={{ color: '#34d399' }}>
              {character.habitsCompletedAllTime.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
