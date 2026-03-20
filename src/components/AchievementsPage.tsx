import { Achievement } from '../types'

interface Props {
  achievements: Achievement[]
}

export default function AchievementsPage({ achievements }: Props) {
  const unlocked = achievements.filter(a => a.unlocked)
  const locked = achievements.filter(a => !a.unlocked)

  return (
    <div>
      {/* Header stats */}
      <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 mb-5 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-xs">Unlocked</p>
          <p className="text-2xl font-bold text-yellow-400">{unlocked.length}/{achievements.length}</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-xs">Completion</p>
          <p className="text-2xl font-bold text-purple-400">
            {Math.round((unlocked.length / achievements.length) * 100)}%
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full transition-all duration-700"
            style={{ width: `${(unlocked.length / achievements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Unlocked */}
      {unlocked.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <span>🏆</span> Unlocked
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {unlocked.map(a => <AchievementCard key={a.id} achievement={a} />)}
          </div>
        </div>
      )}

      {/* Locked */}
      {locked.length > 0 && (
        <div>
          <h3 className="text-slate-500 font-bold mb-3 flex items-center gap-2">
            <span>🔒</span> Locked
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {locked.map(a => <AchievementCard key={a.id} achievement={a} />)}
          </div>
        </div>
      )}
    </div>
  )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  return (
    <div className={`rounded-2xl border p-4 text-center transition-all ${
      achievement.unlocked
        ? 'bg-gradient-to-br from-yellow-900/30 to-slate-800 border-yellow-500/30'
        : 'bg-slate-800/50 border-slate-700/50'
    }`}>
      <div className={`text-3xl mb-2 ${achievement.unlocked ? '' : 'grayscale opacity-30'}`}>
        {achievement.icon}
      </div>
      <h4 className={`font-bold text-sm mb-1 ${achievement.unlocked ? 'text-white' : 'text-slate-500'}`}>
        {achievement.name}
      </h4>
      <p className={`text-xs leading-relaxed ${achievement.unlocked ? 'text-slate-400' : 'text-slate-600'}`}>
        {achievement.unlocked ? achievement.description : achievement.hint}
      </p>
      {achievement.unlocked && achievement.unlockedDate && (
        <p className="text-yellow-500/60 text-xs mt-2">{achievement.unlockedDate}</p>
      )}
    </div>
  )
}
