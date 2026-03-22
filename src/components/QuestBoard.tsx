import { Quest } from '../types'

interface Props {
  quests: Quest[]
}

export default function QuestBoard({ quests }: Props) {
  const daily  = quests.filter(q => q.type === 'daily')
  const weekly = quests.filter(q => q.type === 'weekly')

  return (
    <div className="space-y-6">
      <Section
        icon="⚡"
        iconColor="#fbbf24"
        title="Daily Quests"
        note="Resets at midnight"
        quests={daily}
      />
      <Section
        icon="⚔️"
        iconColor="#a78bfa"
        title="Weekly Challenges"
        note="Resets Sunday"
        quests={weekly}
      />
    </div>
  )
}

function Section({
  icon, iconColor, title, note, quests,
}: {
  icon: string; iconColor: string; title: string; note: string; quests: Quest[]
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: iconColor }}>{icon}</span>
        <h3 className="text-white font-semibold text-sm">{title}</h3>
        <span className="text-slate-600 text-xs font-medium ml-auto">{note}</span>
      </div>
      <div className="space-y-2.5">
        {quests.map(q => <QuestCard key={q.id} quest={q} />)}
      </div>
    </div>
  )
}

function QuestCard({ quest }: { quest: Quest }) {
  const pct = Math.min((quest.progress / quest.target) * 100, 100)

  return (
    <div
      className="rounded-2xl p-4 transition-all duration-200"
      style={{
        background: quest.completed ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${quest.completed ? 'rgba(34,197,94,0.18)' : 'rgba(255,255,255,0.07)'}`,
        opacity: quest.completed ? 0.75 : 1,
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{
            background: quest.completed ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${quest.completed ? 'rgba(34,197,94,0.25)' : 'rgba(255,255,255,0.08)'}`,
          }}
        >
          {quest.completed ? '✅' : quest.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <h4
              className={`font-semibold text-sm ${quest.completed ? 'line-through' : ''}`}
              style={{ color: quest.completed ? '#64748b' : '#f1f5f9' }}
            >
              {quest.name}
            </h4>
            <span
              className="text-xs font-bold whitespace-nowrap px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              +{quest.xpReward} XP
            </span>
          </div>
          <p className="text-slate-500 text-xs mb-2.5 leading-relaxed">{quest.description}</p>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-500 font-medium">{quest.progress} / {quest.target}</span>
              <span
                className="font-semibold"
                style={{ color: quest.completed ? '#34d399' : '#94a3b8' }}
              >
                {quest.completed ? '✓ Complete' : `${Math.round(pct)}%`}
              </span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.07)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${pct}%`,
                  background: quest.completed
                    ? 'linear-gradient(90deg, #059669, #34d399)'
                    : 'linear-gradient(90deg, #7c3aed, #a78bfa)',
                  boxShadow: pct > 10
                    ? quest.completed
                      ? '0 0 6px rgba(52,211,153,0.5)'
                      : '0 0 6px rgba(167,139,250,0.5)'
                    : 'none',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
