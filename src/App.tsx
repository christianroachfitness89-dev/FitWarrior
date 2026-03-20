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
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Global toast notifications */}
      <XPToast
        notifications={notifications}
        newAchievements={newAchievements}
        onDismissAchievement={dismissAchievement}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚔️</span>
            <span className="font-bold text-purple-400">FitWarrior</span>
          </div>
          <div className="text-sm text-slate-400">
            {state.character.name}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-lg mx-auto px-4 pt-4 pb-24">
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
