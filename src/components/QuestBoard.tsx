import { Quest } from '../types'

interface Props {
  quests: Quest[]
}

export default function QuestBoard({ quests }: Props) {
  const daily = quests.filter(q => q.type === 'daily')
  const weekly = quests.filter(q => q.type === 'weekly')

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <span className="text-yellow-400">⚡</span> Daily Quests
          <span className="text-slate-500 text-sm font-normal ml-auto">Resets at midnight</span>
        </h3>
        <div className="space-y-3">
          {daily.map(q => <QuestCard key={q.id} quest={q} />)}
        </div>
      </div>

      <div>
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <span className="text-purple-400">⚔️</span> Weekly Challenges
          <span className="text-slate-500 text-sm font-normal ml-auto">Resets Sunday</span>
        </h3>
        <div className="space-y-3">
          {weekly.map(q => <QuestCard key={q.id} quest={q} />)}
        </div>
      </div>
    </div>
  )
}

function QuestCard({ quest }: { quest: Quest }) {
  const pct = Math.min((quest.progress / quest.target) * 100, 100)

  return (
    <div className={`bg-slate-800 rounded-2xl border p-4 transition-all ${
      quest.completed ? 'border-green-500/30 opacity-70' : 'border-slate-700'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
          quest.completed ? 'bg-green-500/20' : 'bg-slate-700/50'
        }`}>
          {quest.completed ? '✅' : quest.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={`font-bold ${quest.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
              {quest.name}
            </h4>
            <span className="text-yellow-400 text-sm font-bold whitespace-nowrap">+{quest.xpReward} XP</span>
          </div>
          <p className="text-slate-500 text-xs mt-0.5 mb-2">{quest.description}</p>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>{quest.progress} / {quest.target}</span>
              <span className={quest.completed ? 'text-green-400' : 'text-slate-400'}>
                {quest.completed ? 'Complete!' : `${Math.round(pct)}%`}
              </span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  quest.completed ? 'bg-green-500' : 'bg-gradient-to-r from-purple-600 to-purple-400'
                }`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
