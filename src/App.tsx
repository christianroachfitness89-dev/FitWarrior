import { useState } from 'react'
import { useGameState } from './hooks/useGameState'
import { TabName } from './types'
import CharacterSetup from './components/CharacterSetup'
import Navigation from './components/Navigation'
import Dashboard from './components/Dashboard'
import HabitList from './components/HabitList'
import QuestBoard from './components/QuestBoard'
import AchievementsPage from './components/AchievementsPage'
import XPToast from './components/XPToast'

export default function App() {
  const {
    state,
    notifications,
    newAchievements,
    setupCharacter,
    completeHabit,
    uncompleteHabit,
    dismissAchievement,
    resetProgress,
  } = useGameState()

  const [tab, setTab] = useState<TabName>('dashboard')

  if (!state.setupComplete) {
    return <CharacterSetup onComplete={setupCharacter} />
  }

  return (
    <div className="min-h-screen text-white" style={{ background: '#09090f' }}>
      {/* Ambient top glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 80% 100% at 50% -20%, rgba(109,40,217,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Global toast notifications */}
      <XPToast
        notifications={notifications}
        newAchievements={newAchievements}
        onDismissAchievement={dismissAchievement}
      />

      {/* Header */}
      <header
        className="sticky top-0 z-30 backdrop-blur-xl"
        style={{
          background: 'rgba(9,9,15,0.80)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="max-w-lg mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{
                background: 'rgba(109,40,217,0.25)',
                border: '1px solid rgba(139,92,246,0.35)',
              }}
            >
              ⚔️
            </div>
            <span className="font-bold text-sm tracking-wide text-gradient-violet">
              FitWarrior
            </span>
          </div>
          <div
            className="text-xs text-slate-400 px-3 py-1 rounded-full font-medium"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {state.character.name}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-lg mx-auto px-4 pt-4 pb-24">
        {tab === 'dashboard' && (
          <Dashboard
            state={state}
            onGoToHabits={() => setTab('habits')}
          />
        )}
        {tab === 'habits' && (
          <HabitList
            habits={state.habits}
            streak={state.character.streak}
            onComplete={completeHabit}
            onUncomplete={uncompleteHabit}
          />
        )}
        {tab === 'quests' && (
          <QuestBoard quests={state.quests} />
        )}
        {tab === 'achievements' && (
          <AchievementsPage achievements={state.achievements} />
        )}

        {/* Dev reset — only shown in dev */}
        {(import.meta as { env?: { DEV?: boolean } }).env?.DEV && tab === 'dashboard' && (
          <div className="mt-8 text-center">
            <button
              onClick={() => { if (confirm('Reset all progress?')) resetProgress() }}
              className="text-xs text-slate-700 hover:text-slate-500 transition-colors"
            >
              [dev: reset data]
            </button>
          </div>
        )}
      </main>

      <Navigation active={tab} onChange={setTab} />
    </div>
  )
}
