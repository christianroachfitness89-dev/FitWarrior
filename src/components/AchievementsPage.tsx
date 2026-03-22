import { Achievement } from '../types'

interface Props {
  achievements: Achievement[]
}

export default function AchievementsPage({ achievements }: Props) {
  const unlocked = achievements.filter(a => a.unlocked)
  const locked   = achievements.filter(a => !a.unlocked)
  const pct = Math.round((unlocked.length / achievements.length) * 100)

  return (
    <div>
      {/* Header stats */}
      <div
        className="rounded-2xl p-5 mb-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(120,53,15,0.3) 0%, rgba(9,9,15,0.8) 100%)',
          border: '1px solid rgba(245,158,11,0.18)',
          boxShadow: '0 4px 24px rgba(245,158,11,0.08)',
        }}
      >
        <div
          className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
          style={{ background: 'radial-gradient(circle at top right, rgba(245,158,11,0.1), transparent 70%)' }}
        />
        <div className="flex items-center justify-between relative">
          <div>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Unlocked</p>
            <p className="text-3xl font-bold text-gradient-gold">{unlocked.length}/{achievements.length}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider mb-1">Completion</p>
            <p className="text-3xl font-bold text-gradient-violet">{pct}%</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.07)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-700 bar-glow-gold"
              style={{
                width: `${(unlocked.length / achievements.length) * 100}%`,
                background: 'linear-gradient(90deg, #d97706, #fbbf24)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Unlocked */}
      {unlocked.length > 0 && (
        <div className="mb-5">
          <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>🏆</span> Unlocked ({unlocked.length})
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {unlocked.map(a => <AchievementCard key={a.id} achievement={a} />)}
          </div>
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <div>
          <h3 className="text-slate-600 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
            <span>🔒</span> Locked ({locked.length})
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {locked.map(a => <AchievementCard key={a.id} achievement={a} />)}
          </div>
        </div>
      )}
    </div>
  )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div
      className="rounded-2xl p-4 text-center transition-all duration-200"
      style={
        achievement.unlocked
          ? {
              background: 'linear-gradient(135deg, rgba(120,53,15,0.25) 0%, rgba(255,255,255,0.04) 100%)',
              border: '1px solid rgba(245,158,11,0.22)',
              boxShadow: '0 2px 12px rgba(245,158,11,0.07)',
            }
          : {
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.05)',
            }
      }
    >
      <div
        className={`text-3xl mb-2 ${achievement.unlocked ? '' : 'grayscale opacity-20'}`}
      >
        {achievement.icon}
      </div>
      <h4
        className="font-bold text-sm mb-1"
        style={{ color: achievement.unlocked ? '#f1f5f9' : '#475569' }}
      >
        {achievement.name}
      </h4>
      <p
        className="text-xs leading-relaxed"
        style={{ color: achievement.unlocked ? '#94a3b8' : '#334155' }}
      >
        {achievement.unlocked ? achievement.description : achievement.hint}
      </p>
      {achievement.unlocked && achievement.unlockedDate && (
        <p
          className="text-xs mt-2 font-medium"
          style={{ color: 'rgba(251,191,36,0.5)' }}
        >
          {achievement.unlockedDate}
        </p>
      )}
    </div>
  )
}
