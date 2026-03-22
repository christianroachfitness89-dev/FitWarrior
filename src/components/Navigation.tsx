import { TabName } from '../types'

interface Props {
  active: TabName
  onChange: (tab: TabName) => void
}

const tabs: { id: TabName; label: string; icon: string }[] = [
  { id: 'dashboard',    label: 'Base',     icon: '🏠' },
  { id: 'habits',       label: 'Habits',   icon: '✅' },
  { id: 'quests',       label: 'Quests',   icon: '⚔️' },
  { id: 'achievements', label: 'Trophies', icon: '🏆' },
]

export default function Navigation({ active, onChange }: Props) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-xl"
      style={{
        background: 'rgba(9,9,15,0.88)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-lg mx-auto flex px-2 py-1.5 gap-1">
        {tabs.map(tab => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 rounded-xl transition-all duration-200 relative"
              style={
                isActive
                  ? {
                      background: 'rgba(139,92,246,0.12)',
                      border: '1px solid rgba(139,92,246,0.2)',
                      color: '#c4b5fd',
                    }
                  : {
                      background: 'transparent',
                      border: '1px solid transparent',
                      color: '#64748b',
                    }
              }
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              <span
                className="text-xs font-semibold"
                style={{ letterSpacing: '0.02em' }}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
