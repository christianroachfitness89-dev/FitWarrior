import { TabName } from '../types'

interface Props {
  active: TabName
  onChange: (tab: TabName) => void
}

const tabs: { id: TabName; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Base', icon: '🏠' },
  { id: 'habits', label: 'Habits', icon: '✅' },
  { id: 'quests', label: 'Quests', icon: '⚔️' },
  { id: 'achievements', label: 'Trophies', icon: '🏆' },
]

export default function Navigation({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-slate-700/60 z-40">
      <div className="max-w-lg mx-auto flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-all ${
              active === tab.id
                ? 'text-purple-400'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
            {active === tab.id && (
              <span className="absolute bottom-0 w-8 h-0.5 bg-purple-400 rounded-t-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  )
}
